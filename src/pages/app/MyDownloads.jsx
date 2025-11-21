import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Download, FileText, Loader2 } from 'lucide-react'

export default function MyDownloads() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
    if (user) fetchDownloads()
  }, [user])

  const fetchDownloads = async () => {
    try {
      // 1. Get purchased ebooks
      const { data: purchases } = await supabase.from('purchases')
        .select('product_id').eq('user_id', user.id).eq('status', 'completed')
      
      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products')
          .select('*').in('id', ids).eq('type', 'ebook')
        setDownloads(products || [])
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">I miei Download</h1>
      <p className="text-gray-500 mb-8">Ebook e materiali che hai acquistato.</p>

      {downloads.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center">
          <p className="text-gray-500">Non hai ancora acquistato nessun Ebook.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">{item.title}</h3>
                  <p className="text-sm text-gray-500">PDF Digitale</p>
                </div>
              </div>
              {/* In a real app, you would fetch the file URL from a 'product_files' table. 
                  For this MVP, we assume the admin put the link in description or we use a placeholder */}
              <button className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90">
                <Download size={16} /> Scarica
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
