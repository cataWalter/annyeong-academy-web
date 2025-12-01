"use client";
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useGamification } from '@/hooks/useGamification'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { BookOpen, Loader2, PlayCircle, Calendar, Download, ArrowRight, Award, Zap, Flame, Clock, StickyNote, ExternalLink } from 'lucide-react'
import ReferralCard from '@/components/dashboard/ReferralCard'
import LevelUpModal from '@/components/ui/LevelUpModal'
import { extractTag } from '@/lib/helpers'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const { t } = useLanguage()
  const { points, streak, level, loading: gameLoading } = useGamification(user?.id)
  
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [ebooks, setEbooks] = useState([])
  const [progressMap, setProgressMap] = useState({})
  const [lastAccessed, setLastAccessed] = useState({})
  
  // Level Up State
  const [showLevelUp, setShowLevelUp] = useState(false)
  const prevLevelRef = useRef(1)

  useEffect(() => { 
    if (user) fetchData() 
  }, [user])

  // Track Level Changes
  useEffect(() => {
    if (!gameLoading && level > 1 && level > prevLevelRef.current) {
        setShowLevelUp(true)
    }
    prevLevelRef.current = level
  }, [level, gameLoading])

  const fetchData = async () => {
    try {
      const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
      
      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products').select('*').in('id', ids)

        if (products) {
          const myCourses = products.filter(p => p.type === 'course')
          setCourses(myCourses)
          
          const live = products.filter(p => p.type === 'standalone' && new Date(p.event_date) > new Date())
          setUpcomingEvents(live.sort((a,b) => new Date(a.event_date) - new Date(b.event_date)))
          
          setEbooks(products.filter(p => p.type === 'ebook'))

          const progressData = {}
          const lastAccessData = {}
          
          const { data: userProgress } = await supabase.from('lesson_progress').select('*').eq('user_id', user.id).order('last_accessed', { ascending: false })
          const { data: allLessons } = await supabase.from('lessons').select('id, course_id, title').in('course_id', myCourses.map(c => c.id))

          myCourses.forEach(course => {
             const courseLessons = allLessons.filter(l => l.course_id === course.id)
             const total = courseLessons.length
             const completed = userProgress.filter(p => p.course_id === course.id).length
             progressData[course.id] = total > 0 ? Math.round((completed / total) * 100) : 0
             
             const last = userProgress.find(p => p.course_id === course.id)
             if (last) {
               const lTitle = courseLessons.find(cl => cl.id === last.lesson_id)?.title
               lastAccessData[course.id] = { title: lTitle, id: last.lesson_id }
             }
          })
          setProgressMap(progressData)
          setLastAccessed(lastAccessData)
        }
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  if (loading || gameLoading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>

  const displayName = profile?.full_name ? profile.full_name.split(' ')[0] : user?.email?.split('@')[0]

  return (
    <div className="pb-10 animate-fade-in">
      {showLevelUp && <LevelUpModal level={level} onClose={() => setShowLevelUp(false)} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">{t('dash_hello')}, {displayName}! 👋</h1>
          <p className="text-gray-500">{t('dash_ready')}</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg"><Flame size={20} className="text-orange-500 fill-orange-500"/></div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('dash_streak')}</p>
                 <p className="font-bold text-brand-dark text-lg">{streak} <span className="text-sm font-normal text-gray-500">{t('dash_days')}</span></p>
              </div>
           </div>
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg"><Zap size={20} className="text-yellow-500 fill-yellow-500"/></div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('dash_xp')}</p>
                 <p className="font-bold text-brand-dark text-lg">{points} <span className="text-sm font-normal text-gray-500">XP</span></p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-brand-dark">{t('dash_my_courses')}</h2>
              {courses.length > 0 && <Link href="/notebook" className="text-sm font-bold text-brand-purple flex items-center gap-1 hover:underline"><StickyNote size={16}/> {t('nb_title')}</Link>}
            </div>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map(course => {
                  const progress = progressMap[course.id] || 0
                  const last = lastAccessed[course.id]
                  return (
                    <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                         <div className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-brand-purple'}`} style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative shadow-inner">
                           <img src={course.image_url || 'https://placehold.co/150'} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex-1 min-w-0 py-1 flex flex-col justify-between h-24">
                          <div>
                             <h3 className="font-bold text-brand-dark text-lg truncate">{course.title}</h3>
                             <p className="text-xs text-gray-500 mt-1">{last ? `Resume: ${last.title}` : 'Start your journey'}</p>
                          </div>
                          <div className="flex items-end justify-between">
                             <span className={`text-xs font-bold ${progress === 100 ? "text-green-600" : "text-gray-400"}`}>
                                {progress === 100 ? "Completed! 🏆" : `${progress}% Complete`}
                             </span>
                             <Link href={`/corsi/${course.id}`} className="bg-brand-dark text-white pl-3 pr-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-brand-purple transition flex items-center gap-2 transform hover:-translate-y-0.5">
                                <PlayCircle size={16} /> {progress === 0 ? "Start" : "Resume"}
                             </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
                <BookOpen size={32} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4 font-medium">{t('dash_no_courses')}</p>
                <Link href="/corsi" className="inline-block bg-brand-purple text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition">
                  {t('dash_start_now')}
                </Link>
              </div>
            )}
          </section>

          <section>
             <h2 className="text-xl font-bold text-brand-dark mb-4">{t('dash_files')}</h2>
             <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="bg-blue-50 p-3 rounded-xl text-brand-blue"><Download size={24}/></div>
                   <div>
                      <p className="font-bold text-gray-800">{ebooks.length} Resources</p>
                      <p className="text-xs text-gray-500">Ebooks & Workbooks available</p>
                   </div>
                </div>
                <Link href="/downloads" className="text-sm font-bold text-brand-purple hover:underline">View All</Link>
             </div>
          </section>
        </div>

        <div className="space-y-8">
           <ReferralCard />
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-brand-purple"/> My Calendar</h3>
              {upcomingEvents.length > 0 ? (
                 <div className="space-y-4">
                    {upcomingEvents.map(evt => {
                       const zoomLink = extractTag(evt.description, 'ZOOM')
                       return (
                         <div key={evt.id} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <div className="bg-gray-100 rounded-lg p-2 text-center min-w-[50px]">
                               <span className="block text-[10px] font-bold text-gray-500 uppercase">{new Date(evt.event_date).toLocaleString('default', {month:'short'})}</span>
                               <span className="block text-xl font-black text-brand-dark leading-none">{new Date(evt.event_date).getDate()}</span>
                            </div>
                            <div className="flex-1">
                               <p className="text-sm font-bold text-gray-800 line-clamp-1">{evt.title}</p>
                               <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={10}/> {new Date(evt.event_date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                               {zoomLink ? (
                                 <a href={zoomLink} target="_blank" className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded mt-2 inline-flex items-center gap-1 font-bold hover:bg-green-100 transition">
                                   <ExternalLink size={10}/> Join Zoom
                                 </a>
                               ) : (
                                 <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded mt-2 inline-block">Link TBA</span>
                               )}
                            </div>
                         </div>
                       )
                    })}
                 </div>
              ) : (
                 <div className="text-center py-6">
                    <p className="text-sm text-gray-400 mb-3">{t('dash_no_live')}</p>
                    <Link href="/lezioni-live" className="text-xs btn btn-plum-gradient px-4 py-2 rounded-lg">Book Class</Link>
                 </div>
              )}
           </div>
           <div className="bg-gradient-to-br from-brand-dark to-[#2a3b55] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><Award size={20}/></div>
                        <h3 className="font-bold">{t('dash_league')}</h3>
                    </div>
                    <Link href="/leaderboard" className="text-xs font-bold bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">View</Link>
                 </div>
                 <p className="text-gray-300 text-sm mb-1 font-medium">Level {level} • Silver League</p>
                 <div className="w-full bg-black/30 rounded-full h-2 mb-4 overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{width: `${(points % 1000) / 10}%`}}></div>
                 </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-white/5 rotate-12"><Award size={140}/></div>
           </div>
        </div>
      </div>
    </div>
  )
}
