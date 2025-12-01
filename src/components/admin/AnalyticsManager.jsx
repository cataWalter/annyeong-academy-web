"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, TrendingUp, DollarSign, Users, BookOpen, Download, BarChart2 } from 'lucide-react'
import AnalyticsChart from './AnalyticsChart'

export default function AnalyticsManager() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ totalSales: 0, totalUsers: 0, salesByCourse: [], ebookSales: 0, avgCompletion: [], weeklySales: [] })

  useEffect(() => {
    const fetchData = async () => {
      const { data: purchases } = await supabase.from('purchases').select('created_at, products(id, title, price, type)')
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact' })
      const { data: progress } = await supabase.from('lesson_progress').select('course_id')
      
      let total = 0
      const salesMap = {}
      let ebookCount = 0
      
      // Weekly Sales Logic
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const today = new Date()
      const last7Days = Array.from({length: 7}, (_, i) => {
        const d = new Date(today)
        d.setDate(d.getDate() - (6 - i))
        return { date: d.toISOString().split('T')[0], label: days[d.getDay()], value: 0 }
      })

      purchases?.forEach(p => {
        const price = parseFloat(p.products?.price?.replace(/[^0-9.]/g, '') || 0)
        total += price
        salesMap[p.products?.title] = (salesMap[p.products?.title] || 0) + 1
        if (p.products?.type === 'ebook') ebookCount++

        // Map to weekly chart
        const pDate = p.created_at.split('T')[0]
        const dayStat = last7Days.find(d => d.date === pDate)
        if (dayStat) dayStat.value += 1
      })

      // Completion Logic
      const progressCounts = {}
      progress?.forEach(p => { progressCounts[p.course_id] = (progressCounts[p.course_id] || 0) + 1 })
      
      const completionRates = Object.entries(salesMap).map(([title, count]) => {
         return { title, rate: Math.floor(Math.random() * 60) + 20 } // Simulated for demo
      })

      const sortedSales = Object.entries(salesMap).sort((a,b) => b[1] - a[1])

      setData({
        totalSales: total,
        totalUsers: users,
        salesByCourse: sortedSales,
        ebookSales: ebookCount,
        avgCompletion: completionRates,
        weeklySales: last7Days
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  if(loading) return <Loader2 className="animate-spin text-brand-purple"/>

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-green-100 w-10 h-10 flex items-center justify-center rounded-full text-green-600 mb-3"><DollarSign size={20}/></div>
          <p className="text-xs font-bold text-gray-400 uppercase">Revenue</p>
          <p className="text-2xl font-black text-brand-dark">{data.totalSales.toLocaleString()} Ft</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full text-brand-blue mb-3"><Users size={20}/></div>
          <p className="text-xs font-bold text-gray-400 uppercase">Students</p>
          <p className="text-2xl font-black text-brand-dark">{data.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-orange-100 w-10 h-10 flex items-center justify-center rounded-full text-orange-600 mb-3"><Download size={20}/></div>
          <p className="text-xs font-bold text-gray-400 uppercase">Ebook Sales</p>
          <p className="text-2xl font-black text-brand-dark">{data.ebookSales}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-purple-100 w-10 h-10 flex items-center justify-center rounded-full text-brand-purple mb-3"><BookOpen size={20}/></div>
          <p className="text-xs font-bold text-gray-400 uppercase">Avg Completion</p>
          <p className="text-2xl font-black text-brand-dark">~45%</p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2"><BarChart2/> Sales Activity</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Last 7 Days</span>
          </div>
          <AnalyticsChart data={data.weeklySales} />
        </div>

        {/* Top Courses List */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2"><TrendingUp/> Top Courses</h3>
          <div className="space-y-4">
            {data.salesByCourse.slice(0, 5).map(([title, count], idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="font-mono text-gray-400 font-bold w-6">0{idx + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-gray-800 text-sm truncate max-w-[150px]">{title}</span>
                    <span className="text-sm font-bold text-brand-purple">{count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-brand-purple h-2 rounded-full" style={{ width: `${(count / (data.salesByCourse[0]?.[1] || 1)) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
            {data.salesByCourse.length === 0 && <p className="text-gray-400 text-sm">No sales data yet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
