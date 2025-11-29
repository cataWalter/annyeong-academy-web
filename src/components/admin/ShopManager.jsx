"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, ShoppingBag, FileText, Tag, Star, CreditCard, Clock } from 'lucide-react'
import FileUploader from './FileUploader'

export default function ShopManager() {
  const [products, setProducts] = useState([])
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  
  const [formData, setFormData] = useState({ 
    title: '', price: '', sale_price: '', sale_ends_at: '', description: '', 
    image_url: '', type: 'ebook', is_featured: false,
    tutor_id: '', upsell_product_id: '', instruction_language: 'English'
  })

  useEffect(() => { 
    const init = async () => {
        await fetchProducts() 
        const { data } = await supabase.from('tutors').select('id, name')
        setTutors(data || [])
        setLoading(false)
    }
    init()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const id = editing ? editing.id : `prod-${Date.now()}`
    
    const payload = { ...formData }
    if (payload.sale_price === '') { payload.sale_price = null; payload.sale_ends_at = null; }
    if (payload.sale_ends_at === '') payload.sale_ends_at = null
    if (payload.tutor_id === '') payload.tutor_id = null
    if (payload.upsell_product_id === '') payload.upsell_product_id = null

    if (editing) {
      await supabase.from('products').update(payload).eq('id', id)
    } else {
      await supabase.from('products').insert([{ ...payload, id }])
    }
    
    setEditing(null)
    resetForm()
    fetchProducts()
    setLoading(false)
  }

  const resetForm = () => {
    setFormData({ 
      title: '', price: '', sale_price: '', sale_ends_at: '', description: '', 
      image_url: '', type: 'ebook', is_featured: false, 
      tutor_id: '', upsell_product_id: '', instruction_language: 'English' 
    })
  }

  const handleEdit = (prod) => {
    setEditing(prod)
    setFormData({ 
      title: prod.title, 
      price: prod.price, 
      sale_price: prod.sale_price || '',
      sale_ends_at: prod.sale_ends_at ? new Date(prod.sale_ends_at).toISOString().slice(0,16) : '',
      description: prod.description || '', 
      image_url: prod.image_url || '', 
      type: prod.type,
      is_featured: prod.is_featured || false,
      tutor_id: prod.tutor_id || '',
      upsell_product_id: prod.upsell_product_id || '',
      instruction_language: prod.instruction_language || 'English'
    })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete product?")) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">{editing ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Product Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-2">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                <input required placeholder="5000 Ft" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div>
                <label className="text-xs font-bold text-red-500 uppercase">Sale Price</label>
                <input placeholder="Optional" className="input-field border-red-100 text-red-600" value={formData.sale_price} onChange={e => setFormData({...formData, sale_price: e.target.value})} />
            </div>
          </div>

          {formData.sale_price && (
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Sale Ends At</label>
                <input type="datetime-local" className="input-field" value={formData.sale_ends_at} onChange={e => setFormData({...formData, sale_ends_at: e.target.value})} />
            </div>
          )}

          <div className="flex gap-2 items-center border border-gray-200 p-2 rounded-lg bg-gray-50">
             <input type="checkbox" id="feat" className="w-5 h-5 text-brand-purple" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
             <label htmlFor="feat" className="text-sm font-bold text-gray-700 cursor-pointer flex items-center gap-1"><Star size={14} className="text-yellow-500"/> Feature on Homepage</label>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="ebook">Ebook</option>
                <option value="merch">Merch</option>
                <option value="course">Course</option>
                <option value="subscription">Subscription</option>
                <option value="standalone">Live Event</option>
             </select>
             <select className="input-field" value={formData.instruction_language} onChange={e => setFormData({...formData, instruction_language: e.target.value})}>
                <option value="English">Taught in English</option>
                <option value="Hungarian">Taught in Hungarian</option>
                <option value="Korean">Taught in Korean</option>
             </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <select className="input-field" value={formData.tutor_id} onChange={e => setFormData({...formData, tutor_id: e.target.value})}>
                <option value="">No Tutor</option>
                {tutors.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
             </select>
             <select className="input-field" value={formData.upsell_product_id} onChange={e => setFormData({...formData, upsell_product_id: e.target.value})}>
                <option value="">No Upsell</option>
                {products.filter(p => p.type === 'ebook' && p.id !== editing?.id).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
             </select>
          </div>
          
          <FileUploader 
            bucket="course-materials"
            label="Product Image" 
            value={formData.image_url} 
            onUpload={(url) => setFormData({...formData, image_url: url})} 
          />

          <textarea required placeholder="Description" className="input-field h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Product'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); resetForm()}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {products.map(p => (
          <div key={p.id} className={`bg-white p-4 rounded-xl border flex gap-4 items-center ${p.is_featured ? 'border-yellow-300 shadow-sm' : 'border-gray-100'}`}>
            <img src={p.image_url || 'https://placehold.co/100'} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{p.title}</h4>
              <div className="flex gap-2 text-xs items-center">
                 <span className="uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-500">{p.type}</span>
                 {p.sale_price ? (
                    <span className="text-red-500 font-bold flex items-center gap-1"><Tag size={10}/> {p.sale_price}</span>
                 ) : (
                    <span className="font-bold">{p.price}</span>
                 )}
                 {p.sale_ends_at && new Date(p.sale_ends_at) > new Date() && <span className="text-orange-500 flex items-center gap-1"><Clock size={10}/> Timer Active</span>}
              </div>
            </div>
            <button onClick={() => handleEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
            <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
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
