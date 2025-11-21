#!/bin/bash

echo "🛠️ Fixing Gamification Crash..."

# 1. Fix useGamification Hook (Add Default Values & Error Handling)
cat << 'EOF' > src/hooks/useGamification.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useGamification() {
  const { user } = useAuth()
  // Initialize with SAFE default values to prevent crashes
  const [stats, setStats] = useState({ xp: 0, streak: 0, last_activity: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchStats()
  }, [user])

  const fetchStats = async () => {
    try {
      let { data, error } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      
      // If row doesn't exist (new user), create it safely
      if (!data && !error) { 
         // This block catches the case where query succeeds but returns no rows (if single() wasn't strict)
         // But .single() usually throws error if no rows. 
      }

      if (error) {
        // If row not found (PGRST116), try to create it
        if (error.code === 'PGRST116') {
           const { data: newData, error: insertError } = await supabase
             .from('user_stats')
             .insert([{ user_id: user.id, xp: 0, streak: 0 }])
             .select()
             .single()
           
           if (!insertError && newData) {
             data = newData
           } else {
             console.error("Failed to init user stats:", insertError)
           }
        } else {
           console.error("Gamification fetch error:", error)
        }
      }
      
      if (data) {
        setStats(data)
        checkStreak(data)
      }
    } catch (e) {
      console.error("Gamification unexpected error:", e)
    } finally {
      setLoading(false)
    }
  }

  const checkStreak = async (currentStats) => {
    if (!currentStats) return

    const today = new Date().toISOString().split('T')[0]
    const last = currentStats.last_activity
    
    // If already logged today, do nothing
    if (last === today) return

    let newStreak = currentStats.streak || 0
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (last === yesterdayStr) {
      newStreak += 1
    } else {
      newStreak = 1
    }

    // Update DB
    const { error } = await supabase.from('user_stats').update({ 
      streak: newStreak, 
      last_activity: today 
    }).eq('user_id', user.id)

    if (!error) setStats(prev => ({ ...prev, streak: newStreak, last_activity: today }))
  }

  const addXP = async (amount) => {
    const newXP = (stats.xp || 0) + amount
    setStats(prev => ({ ...prev, xp: newXP }))
    await supabase.from('user_stats').update({ xp: newXP }).eq('user_id', user.id)
  }

  return { stats, addXP, loading }
}
EOF

# 2. Fix Dashboard to handle loading cleanly
cat << 'EOF' > src/pages/app/Dashboard.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { useGamification } from '../../hooks/useGamification'
import { useLanguage } from '../../context/LanguageContext'
import { Link } from 'react-router-dom'
import { BookOpen, Loader2, PlayCircle, Calendar, Download, ArrowRight, Award, Zap, Flame } from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const { t } = useLanguage()
  
  // Destructure safely with default fallback
  const { stats = { xp: 0, streak: 0 }, loading: gameLoading } = useGamification()
  
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [liveLessons, setLiveLessons] = useState([])
  const [ebooks, setEbooks] = useState([])
  const [progressMap, setProgressMap] = useState({})

  useEffect(() => { if (user) fetchData() }, [user])

  const fetchData = async () => {
    try {
      const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products').select('*').in('id', ids)
        if (products) {
          const myCourses = products.filter(p => p.type === 'course')
          setCourses(myCourses)
          setLiveLessons(products.filter(p => p.type === 'standalone'))
          setEbooks(products.filter(p => p.type === 'ebook'))

          // Calculate Progress
          const progressData = {}
          const { data: userProgress } = await supabase.from('lesson_progress').select('course_id').eq('user_id', user.id)
          const { data: allLessons } = await supabase.from('lessons').select('course_id').in('course_id', myCourses.map(c => c.id))

          myCourses.forEach(course => {
             const total = allLessons.filter(l => l.course_id === course.id).length
             const completed = userProgress.filter(p => p.course_id === course.id).length
             progressData[course.id] = total > 0 ? Math.round((completed / total) * 100) : 0
          })
          setProgressMap(progressData)
        }
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  // Combine loading states
  if (loading || gameLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  const displayName = profile?.full_name ? profile.full_name.split(' ')[0] : user?.email?.split('@')[0]

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">{t('dash_hello')}, {displayName}! 👋</h1>
          <p className="text-gray-500">{t('dash_ready')}</p>
        </div>
        
        {/* Gamification Stats Header */}
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
              <div className="bg-orange-100 p-1.5 rounded-lg"><Flame size={20} className="text-orange-500 fill-orange-500"/></div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase">{t('dash_streak')}</p>
                 <p className="font-bold text-brand-dark">{stats?.streak || 0} {t('dash_days')}</p>
              </div>
           </div>
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
              <div className="bg-yellow-100 p-1.5 rounded-lg"><Zap size={20} className="text-yellow-500 fill-yellow-500"/></div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase">{t('dash_xp')}</p>
                 <p className="font-bold text-brand-dark">{stats?.xp || 0} XP</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('dash_my_courses')}</p><p className="text-3xl font-bold text-brand-purple mt-1">{courses.length}</p></div>
            <div className="bg-purple-50 p-2 rounded-lg text-brand-purple"><BookOpen size={20}/></div>
          </div>
          <Link to="/corsi" className="text-xs font-bold text-gray-400 hover:text-brand-purple flex items-center gap-1 transition">{t('dash_view_catalog')} <ArrowRight size={12}/></Link>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('dash_live_credits')}</p><p className="text-3xl font-bold text-brand-blue mt-1">{liveLessons.length}</p></div>
            <div className="bg-blue-50 p-2 rounded-lg text-brand-blue"><Calendar size={20}/></div>
          </div>
          <Link to="/lezioni-live" className="text-xs font-bold text-gray-400 hover:text-brand-blue flex items-center gap-1 transition">{t('dash_book_new')} <ArrowRight size={12}/></Link>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{t('dash_files')}</p><p className="text-3xl font-bold text-gray-700 mt-1">{ebooks.length}</p></div>
            <div className="bg-gray-50 p-2 rounded-lg text-gray-600"><Download size={20}/></div>
          </div>
          <Link to="/downloads" className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 transition">{t('dash_go_files')} <ArrowRight size={12}/></Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-brand-dark">{t('dash_my_courses')}</h2>
          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map(course => {
                const progress = progressMap[course.id] || 0
                return (
                  <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                         <img src={course.image_url || 'https://placehold.co/150'} alt={course.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-brand-dark text-lg truncate pr-2">{course.title}</h3>
                           <Link to={`/corsi/${course.id}`} className="bg-brand-purple text-white p-2 rounded-full shadow-md hover:scale-110 transition transform"><PlayCircle size={20} fill="white" className="text-brand-purple" /></Link>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{course.description.replace(/\[\[.*?\]\]/g, '')}</p>
                        <div className="mt-4">
                           <div className="flex justify-between text-xs font-bold mb-1"><span className={progress === 100 ? "text-green-600" : "text-gray-400"}>{progress === 100 ? "Completed! 🏆" : `${progress}% Complete`}</span></div>
                           <div className="w-full bg-gray-100 rounded-full h-2"><div className={`h-2 rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-brand-purple'}`} style={{ width: `${progress}%` }}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">{t('dash_no_courses')}</p>
              <Link to="/corsi" className="inline-block bg-brand-purple text-white px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg transition">{t('dash_start_now')}</Link>
            </div>
          )}
        </div>

        <div className="space-y-8">
           <div className="bg-gradient-to-br from-brand-dark to-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 p-2 rounded-lg"><Award size={20}/></div>
                    <h3 className="font-bold">{t('dash_league')}</h3>
                 </div>
                 <p className="text-gray-300 text-sm mb-4">Silver League. Keep pushing!</p>
                 <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{width: '60%'}}></div></div>
              </div>
              <div className="absolute -bottom-4 -right-4 text-white/5"><Award size={120}/></div>
           </div>

           <div>
             <h2 className="text-xl font-bold text-brand-dark mb-4">{t('dash_upcoming')}</h2>
             {liveLessons.length > 0 ? (
                <div className="space-y-3">
                  {liveLessons.slice(0, 2).map(lesson => (
                    <div key={lesson.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-3 items-center">
                      <div className="bg-orange-50 text-orange-500 p-3 rounded-lg h-fit"><Calendar size={18}/></div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{lesson.title}</h4>
                        <a href="https://zoom.us/join" target="_blank" className="text-xs text-brand-blue font-bold hover:underline mt-1 block">{t('dash_join')}</a>
                      </div>
                    </div>
                  ))}
                </div>
             ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-400 italic mb-2">{t('dash_no_live')}</p>
                    <Link to="/lezioni-live" className="text-xs font-bold text-brand-blue underline">{t('dash_book_new')}</Link>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  )
}
EOF

echo "✅ Gamification crash fixed!"