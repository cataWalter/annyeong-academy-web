"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Plus, HelpCircle } from 'lucide-react'

export default function FAQManager() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ question: '', answer: '', order: 0 })

  useEffect(() => { fetchFaqs() }, [])

  const fetchFaqs = async () => {
    const { data } = await supabase.from('faqs').select('*').order('order', { ascending: true })
    setFaqs(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (editing) {
      await supabase.from('faqs').update(formData).eq('id', editing.id)
    } else {
      await supabase.from('faqs').insert([formData])
    }
    setEditing(null)
    setFormData({ question: '', answer: '', order: 0 })
    fetchFaqs()
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({ question: item.question, answer: item.answer, order: item.order })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete FAQ?")) return
    await supabase.from('faqs').delete().eq('id', id)
    fetchFaqs()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">{editing ? 'Edit FAQ' : 'Add FAQ'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Question" className="input-field" value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} />
          <textarea required placeholder="Answer" className="input-field h-32" value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})} />
          <input type="number" placeholder="Sort Order" className="input-field" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
          
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ question: '', answer: '', order: 0 })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-3">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4">
            <div className="bg-gray-50 h-8 w-8 flex items-center justify-center rounded-full text-xs font-bold text-gray-500 shrink-0">{faq.order}</div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{faq.question}</h4>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(faq)} className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Edit size={16}/></button>
              <button onClick={() => handleDelete(faq.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
