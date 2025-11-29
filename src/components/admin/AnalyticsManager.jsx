"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, TrendingUp, DollarSign, Users } from 'lucide-react'

export default function AnalyticsManager() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ totalSales: 0, totalUsers: 0, salesByCourse: [] })

  useEffect(() => {
    const fetchData = async () => {
      const { data: purchases } = await supabase.from('purchases').select('products(title, price)')
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact' })
      
      let total = 0
      const salesMap = {}

      purchases?.forEach(p => {
        const price = parseFloat(p.products?.price?.replace(/[^0-9.]/g, '') || 0)
        total += price
        salesMap[p.products?.title] = (salesMap[p.products?.title] || 0) + 1
      })

      const sortedSales = Object.entries(salesMap).sort((a,b) => b[1] - a[1])

      setData({
        totalSales: total,
        totalUsers: users,
        salesByCourse: sortedSales
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  if(loading) return <Loader2 className="animate-spin text-brand-purple"/>

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-full text-green-600"><DollarSign size={32}/></div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase">Total Revenue</p>
            <p className="text-3xl font-black text-brand-dark">{data.totalSales.toLocaleString()} Ft</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full text-brand-blue"><Users size={32}/></div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase">Total Students</p>
            <p className="text-3xl font-black text-brand-dark">{data.totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2"><TrendingUp/> Top Performing Courses</h3>
        <div className="space-y-4">
          {data.salesByCourse.map(([title, count], idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="font-mono text-gray-400 font-bold w-6">0{idx + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-gray-800">{title}</span>
                  <span className="text-sm font-bold text-brand-purple">{count} Sales</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-brand-purple h-2 rounded-full" style={{ width: `${(count / data.salesByCourse[0][1]) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
          {data.salesByCourse.length === 0 && <p className="text-gray-400">No sales data yet.</p>}
        </div>
      </div>
    </div>
  )
}
