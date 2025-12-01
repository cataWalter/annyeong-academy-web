"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Download, Bell, Send, X, PlusCircle, Trash2 } from 'lucide-react'

export default function StudentManager() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Detail & Action State
  const [viewingUser, setViewingUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [notifModalOpen, setNotifModalOpen] = useState(false)
  const [grantModalOpen, setGrantModalOpen] = useState(false)
  const [notifData, setNotifData] = useState({ title: '', message: '' })
  const [sendingNotif, setSendingNotif] = useState(false)
  
  // Granting
  const [availableProducts, setAvailableProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')

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
    const { data: purchases } = await supabase.from('purchases').select('id, created_at, products(title)').eq('user_id', id)
    
    setUserDetails({ 
        stats, 
        lessonsCompleted: progress?.count || 0, 
        quizzes: quizzes || [],
        purchases: purchases || []
    })
  }

  const handleViewUser = (user) => {
    setViewingUser(user)
    fetchUserDetails(user.id)
  }

  const handleSendNotification = async (e) => {
    e.preventDefault()
    if(!notifData.title || !notifData.message) return
    setSendingNotif(true)
    try {
      await supabase.from('notifications').insert([{
        user_id: viewingUser.id,
        title: notifData.title,
        message: notifData.message,
        is_read: false
      }])
      alert("Notification sent!")
      setNotifModalOpen(false)
      setNotifData({ title: '', message: '' })
    } catch (e) { alert("Error sending notification") } finally { setSendingNotif(false) }
  }

  const openGrantModal = async () => {
    const { data } = await supabase.from('products').select('id, title, type')
    setAvailableProducts(data || [])
    setGrantModalOpen(true)
  }

  const handleGrantAccess = async () => {
    if (!selectedProduct) return
    await supabase.from('purchases').insert([{
        user_id: viewingUser.id,
        product_id: selectedProduct,
        status: 'completed'
    }])
    alert("Access Granted!")
    setGrantModalOpen(false)
    fetchUserDetails(viewingUser.id) // Refresh
  }

  const handleRevokeAccess = async (purchaseId) => {
    if(!confirm("Revoke access to this product?")) return
    await supabase.from('purchases').delete().eq('id', purchaseId)
    fetchUserDetails(viewingUser.id)
  }

  const filteredUsers = users.filter(u => u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
      
      {/* Notification Modal */}
      {notifModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><Bell size={20}/> Notify {viewingUser?.full_name}</h3>
                <button onClick={() => setNotifModalOpen(false)}><X size={20} className="text-gray-400"/></button>
            </div>
            <form onSubmit={handleSendNotification} className="space-y-4">
                <input required placeholder="Title" className="input-field" value={notifData.title} onChange={e => setNotifData({...notifData, title: e.target.value})} />
                <textarea required placeholder="Message" className="input-field h-24" value={notifData.message} onChange={e => setNotifData({...notifData, message: e.target.value})} />
                <button disabled={sendingNotif} className="btn btn-plum-gradient w-full py-2 flex items-center justify-center gap-2">
                    {sendingNotif ? <Loader2 className="animate-spin" size={18}/> : <><Send size={18}/> Send Now</>}
                </button>
            </form>
          </div>
        </div>
      )}

      {/* Grant Modal */}
      {grantModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Grant Product Access</h3>
                <button onClick={() => setGrantModalOpen(false)}><X size={20} className="text-gray-400"/></button>
            </div>
            <div className="space-y-4">
                <p className="text-sm text-gray-500">Manually enroll <strong>{viewingUser?.full_name}</strong> in a course or product.</p>
                <select className="input-field" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
                    <option value="">Select Product...</option>
                    {availableProducts.map(p => <option key={p.id} value={p.id}>{p.type.toUpperCase()}: {p.title}</option>)}
                </select>
                <button onClick={handleGrantAccess} className="btn bg-green-600 w-full py-2 flex items-center justify-center gap-2">
                    Grant Access
                </button>
            </div>
          </div>
        </div>
      )}

      <div className={`lg:col-span-${viewingUser ? '1' : '3'} bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[600px] flex flex-col`}>
        <div className="p-4 border-b border-gray-100 flex gap-2">
          <input placeholder="Search students..." className="w-full p-2 border rounded-lg text-sm outline-none focus:border-brand-purple" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <div className="flex-1 overflow-y-auto">
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
             <div className="ml-auto flex gap-2">
                <button onClick={() => setNotifModalOpen(true)} className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-brand-purple hover:text-white transition" title="Send Notification">
                    <Bell size={20}/>
                </button>
             </div>
           </div>

           {userDetails ? (
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold">XP & Streak</p>
                        <p className="text-xl font-black text-brand-purple">{userDetails.stats?.xp || 0} XP / {userDetails.stats?.streak || 0} Days</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold">Progress</p>
                        <p className="text-xl font-black text-brand-blue">{userDetails.lessonsCompleted} Lessons Done</p>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-800">Enrollments</h3>
                        <button onClick={openGrantModal} className="text-xs font-bold text-brand-purple flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded"><PlusCircle size={14}/> Grant Access</button>
                    </div>
                    <div className="space-y-2">
                        {userDetails.purchases.length === 0 && <p className="text-gray-400 text-sm">No active enrollments.</p>}
                        {userDetails.purchases.map((p, i) => (
                        <div key={i} className="flex justify-between text-sm p-2 bg-blue-50 rounded-lg group">
                            <span className="text-blue-800 font-medium">{p.products?.title}</span>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-blue-500">{new Date(p.created_at).toLocaleDateString()}</span>
                                <button onClick={() => handleRevokeAccess(p.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition" title="Revoke"><Trash2 size={14}/></button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-2">Quiz Activity</h3>
                    <div className="space-y-2">
                        {userDetails.quizzes.slice(0, 5).map((q, i) => (
                        <div key={i} className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">{new Date(q.created_at).toLocaleDateString()}</span>
                            <span className="text-green-600 font-bold">{q.score} pts - {q.passed ? 'Passed' : 'Failed'}</span>
                        </div>
                        ))}
                        {userDetails.quizzes.length === 0 && <p className="text-gray-400 text-sm">No quiz data.</p>}
                    </div>
                </div>
             </div>
           ) : <Loader2 className="animate-spin mx-auto"/>}
        </div>
      )}
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
