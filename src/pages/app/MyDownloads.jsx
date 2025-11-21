import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Download, FileText, Loader2, ExternalLink } from 'lucide-react'
import { extractTag, cleanDescription } from '../../lib/helpers'

export default function MyDownloads() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
    if (user) fetchDownloads()
  }, [user])

  const fetchDownloads = async () => {
    try {
      const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products').select('*').in('id', ids).eq('type', 'ebook')
        setDownloads(products || [])
      }
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">My Downloads</h1>
      <p className="text-gray-500 mb-8">Access the digital files you purchased.</p>

      {downloads.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
          <p className="text-gray-500 mb-4">You haven't purchased any Ebooks yet.</p>
          <a href="/store" className="text-brand-purple font-bold hover:underline">Go to Store</a>
        </div>
      ) : (
        <div className="grid gap-4">
          {downloads.map(item => {
            const downloadUrl = extractTag(item.description, 'DOWNLOAD_URL');
            
            return (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue flex-shrink-0">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{cleanDescription(item.description)}</p>
                  </div>
                </div>
                
                {downloadUrl ? (
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg">
                    <Download size={18} /> Download File
                  </a>
                ) : (
                  <button disabled className="flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-6 py-3 rounded-xl font-bold cursor-not-allowed">
                    <ExternalLink size={18} /> Link unavailable
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
