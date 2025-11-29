"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, User, CheckCircle, Search } from 'lucide-react'

export default function StudentManager() {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [enrolling, setEnrolling] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: u } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    setUsers(u || [])
    
    const { data: c } = await supabase.from('products').select('id, title').eq('type', 'course')
    setCourses(c || [])
    
    setLoading(false)
  }

  const handleEnroll = async (userId) => {
    if (!selectedCourse) return alert("Select a course first")
    if (!confirm("Grant free access to this user?")) return

    setEnrolling(userId)
    try {
      const { error } = await supabase.from('purchases').insert([
        { user_id: userId, product_id: selectedCourse, status: 'completed' }
      ])
      if (error) throw error
      alert("User enrolled successfully!")
    } catch (err) {
      alert("Error: " + err.message)
    } finally {
      setEnrolling(null)
    }
  }

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.id.includes(searchTerm)
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg outline-none focus:border-brand-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg outline-none text-sm bg-white"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course to Enroll...</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      {user.avatar_url ? <img src={user.avatar_url} className="w-8 h-8 rounded-full object-cover"/> : <User size={16}/>}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user.full_name || 'No Name'}</p>
                      <p className="text-xs text-gray-400 font-mono">{user.id.slice(0,8)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {user.role || 'student'}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{new Date(user.updated_at).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleEnroll(user.id)}
                    disabled={enrolling === user.id}
                    className="text-green-600 bg-green-50 px-3 py-1 rounded-lg font-bold text-xs hover:bg-green-100 transition flex items-center gap-1 ml-auto"
                  >
                    {enrolling === user.id ? <Loader2 size={12} className="animate-spin"/> : <><CheckCircle size={12}/> Enroll</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
