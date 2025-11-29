"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, ShoppingBag, FileText } from 'lucide-react'

export default function ShopManager() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ 
    title: '', price: '', description: '', image_url: '', type: 'ebook' 
  })

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').in('type', ['ebook', 'merch'])
    setProducts(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const id = editing ? editing.id : `prod-${Date.now()}`
    
    if (editing) {
      await supabase.from('products').update(formData).eq('id', id)
    } else {
      await supabase.from('products').insert([{ ...formData, id }])
    }
    
    setEditing(null)
    setFormData({ title: '', price: '', description: '', image_url: '', type: 'ebook' })
    fetchProducts()
  }

  const handleEdit = (prod) => {
    setEditing(prod)
    setFormData({ 
      title: prod.title, price: prod.price, description: prod.description, 
      image_url: prod.image_url, type: prod.type
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
          <input required placeholder="Price (e.g. 3000 Ft)" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="ebook">Ebook (Digital)</option>
            <option value="merch">Merchandise (Physical)</option>
          </select>
          <input placeholder="Image URL" className="input-field" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          <textarea required placeholder="Desc (include [[DOWNLOAD_URL::link]] for ebooks)" className="input-field h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Product'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', price: '', description: '', image_url: '', type: 'ebook' })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue shrink-0">
               {p.type === 'ebook' ? <FileText size={24}/> : <ShoppingBag size={24}/>}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{p.title}</h4>
              <p className="text-xs text-gray-500">{p.type} • {p.price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
