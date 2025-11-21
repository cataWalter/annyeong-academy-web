import { ShoppingBag, Download } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function Store() {
  const products = [
    {
      id: 'eb1',
      title: "Korean Grammar Planner 2025",
      type: "PDF Digitale",
      price: "5.000 Ft",
      image: "https://placehold.co/400x500/6a11cb/ffffff?text=Planner+2025",
      desc: "Organizza il tuo studio giornaliero con questo planner stampabile."
    },
    {
      id: 'eb2',
      title: "1000 Parole Essenziali (Ebook)",
      type: "Ebook PDF",
      price: "3.500 Ft",
      image: "https://placehold.co/400x500/2575fc/ffffff?text=Vocabolario",
      desc: "Le parole piÃ¹ usate nei K-Drama spiegate con esempi."
    },
    {
      id: 'eb3',
      title: "Hangul Writing Sheets",
      type: "Eserciziario",
      price: "2.000 Ft",
      image: "https://placehold.co/400x500/ff9900/ffffff?text=Scrittura",
      desc: "Fogli a quadretti coreani per esercitare la calligrafia."
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Digital Store</h1>
      <p className="text-gray-500 mb-8">Scarica risorse extra per accelerare il tuo apprendimento.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
            <div className="h-64 overflow-hidden relative bg-gray-100 flex items-center justify-center">
              <img src={product.image} alt={product.title} className="h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-purple">
                {product.type}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-brand-dark mb-2">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.desc}</p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xl font-bold text-brand-purple">{product.price}</span>
                <button 
                  onClick={() => initiateCheckout(product.id, product.title)}
                  className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
                >
                  <ShoppingBag size={16} /> Acquista
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
