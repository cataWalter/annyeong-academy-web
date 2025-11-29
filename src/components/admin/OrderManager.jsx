"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Search, DollarSign, RefreshCcw, XCircle, CheckCircle } from 'lucide-react'

export default function OrderManager() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('purchases')
      .select('*, profiles(full_name, email), products(title, price, type)')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  const handleRefund = async (id) => {
    if (!confirm("Are you sure you want to refund and revoke access?")) return
    // In real Stripe app, call API here.
    await supabase.from('purchases').update({ status: 'refunded' }).eq('id', id)
    fetchOrders()
  }

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.products?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><DollarSign size={20}/> Transaction History</h3>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search order ID, email..." 
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg outline-none focus:border-brand-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-mono text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <p className="font-bold text-gray-800">{order.profiles?.full_name || 'Guest'}</p>
                  <p className="text-xs text-gray-500">{order.profiles?.email}</p>
                </td>
                <td className="p-4">
                  <span className="font-medium text-brand-purple">{order.products?.title}</span>
                  <span className="block text-xs text-gray-400 uppercase">{order.products?.type}</span>
                </td>
                <td className="p-4 font-bold">{order.products?.price}</td>
                <td className="p-4">
                  {order.status === 'completed' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      <CheckCircle size={12}/> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      <XCircle size={12}/> Refunded
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {order.status === 'completed' && (
                    <button 
                      onClick={() => handleRefund(order.id)}
                      className="text-gray-400 hover:text-red-500 flex items-center gap-1 ml-auto text-xs font-bold"
                      title="Refund & Revoke"
                    >
                      <RefreshCcw size={14}/> Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && <div className="p-8 text-center text-gray-400">No transactions found.</div>}
      </div>
    </div>
  )
}
