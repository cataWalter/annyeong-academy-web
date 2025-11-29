"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Download } from 'lucide-react'

export default function StudentManager() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Detail View State
  const [viewingUser, setViewingUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const { data: u } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    setUsers(u || [])
    setLoading(false)
  }

  const fetchUserDetails = async (id) => {
    const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', id).single()
    const { data: progress } = await supabase.from('lesson_progress').select('count', { count: 'exact' }).eq('user_id', id)
    const { data: quizzes } = await supabase.from('quiz_results').select('score, passed, created_at').eq('user_id', id)
    const { data: downloads } = await supabase.from('downloads_log').select('downloaded_at, products(title)').eq('user_id', id).order('downloaded_at', { ascending: false })
    
    setUserDetails({ 
        stats, 
        lessonsCompleted: progress?.count || 0, 
        quizzes: quizzes || [],
        downloads: downloads || []
    })
  }

  const handleViewUser = (user) => {
    setViewingUser(user)
    fetchUserDetails(user.id)
  }

  const filteredUsers = users.filter(u => u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className={`lg:col-span-${viewingUser ? '1' : '3'} bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
        <div className="p-4 border-b border-gray-100 flex gap-2">
          <input placeholder="Search students..." className="w-full p-2 border rounded-lg text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {filteredUsers.map(user => (
            <div key={user.id} onClick={() => handleViewUser(user)} className={`p-4 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3 ${viewingUser?.id === user.id ? 'bg-purple-50' : ''}`}>
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden"><img src={user.avatar_url || 'https://placehold.co/50'} className="w-full h-full object-cover"/></div>
              <div className="flex-1">
                 <p className="font-bold text-sm text-gray-800">{user.full_name}</p>
                 <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewingUser && (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative max-h-[600px] overflow-y-auto">
           <button onClick={() => setViewingUser(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
           
           <div className="flex items-center gap-4 mb-8">
             <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"><img src={viewingUser.avatar_url || 'https://placehold.co/100'} className="w-full h-full object-cover"/></div>
             <div>
               <h2 className="text-2xl font-bold text-brand-dark">{viewingUser.full_name}</h2>
               <p className="text-gray-500">{viewingUser.email}</p>
               <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-1 inline-block capitalize">{viewingUser.role}</span>
             </div>
           </div>

           {userDetails ? (
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase font-bold">XP & Streak</p>
                        <p className="text-xl font-black text-brand-purple">{userDetails.stats?.xp || 0} XP / {userDetails.stats?.streak || 0} Days</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase font-bold">Progress</p>
                        <p className="text-xl font-black text-brand-blue">{userDetails.lessonsCompleted} Lessons Done</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-2">Quiz Activity</h3>
                    <div className="space-y-2">
                        {userDetails.quizzes.slice(0, 5).map((q, i) => (
                        <div key={i} className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">{new Date(q.created_at).toLocaleDateString()}</span>
                            <span className={q.passed ? 'text-green-600 font-bold' : 'text-red-500'}>{q.score} pts - {q.passed ? 'Passed' : 'Failed'}</span>
                        </div>
                        ))}
                        {userDetails.quizzes.length === 0 && <p className="text-gray-400 text-sm">No quiz data.</p>}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-2">Download History</h3>
                    <div className="space-y-2">
                        {userDetails.downloads.slice(0, 5).map((d, i) => (
                        <div key={i} className="flex justify-between text-sm p-2 bg-blue-50 rounded-lg">
                            <span className="text-blue-800 font-medium flex items-center gap-2"><Download size={14}/> {d.products?.title}</span>
                            <span className="text-xs text-blue-500">{new Date(d.downloaded_at).toLocaleDateString()}</span>
                        </div>
                        ))}
                        {userDetails.downloads.length === 0 && <p className="text-gray-400 text-sm">No downloads yet.</p>}
                    </div>
                </div>
             </div>
           ) : <Loader2 className="animate-spin mx-auto"/>}
        </div>
      )}
    </div>
  )
}
