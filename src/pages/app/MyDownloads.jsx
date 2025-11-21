import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Download, FileText, Loader2, ExternalLink } from 'lucide-react'

export default function MyDownloads() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
    if (user) fetchDownloads()
  }, [user])

  const fetchDownloads = async () => {
    try {
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

  const getDownloadLink = (product) => {
    // Parse the hidden tag from description: [[DOWNLOAD_URL::https://...]]
    const match = product.description?.match(/\[\[DOWNLOAD_URL::(.*?)\]\]/);
    return match ? match[1] : null;
  }

  const getCleanDescription = (desc) => {
    return desc ? desc.split('[[DOWNLOAD_URL::')[0] : '';
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">I miei Download</h1>
      <p className="text-gray-500 mb-8">Accedi ai file digitali che hai acquistato.</p>

      {downloads.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
          <p className="text-gray-500 mb-4">Non hai ancora acquistato nessun Ebook.</p>
          <a href="/store" className="text-brand-purple font-bold hover:underline">Vai allo Store</a>
        </div>
      ) : (
        <div className="grid gap-4">
          {downloads.map(item => {
            const downloadUrl = getDownloadLink(item);
            
            return (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue flex-shrink-0">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{getCleanDescription(item.description)}</p>
                  </div>
                </div>
                
                {downloadUrl ? (
                  <a 
                    href={downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg"
                  >
                    <Download size={18} /> Scarica File
                  </a>
                ) : (
                  <button disabled className="flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-6 py-3 rounded-xl font-bold cursor-not-allowed">
                    <ExternalLink size={18} /> Link non disponibile
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
