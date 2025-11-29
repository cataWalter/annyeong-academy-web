"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import CouponInput from '@/components/ui/CouponInput'
import { Trash2, ShoppingBag, ArrowRight, CreditCard, Lock, Plus, Sparkles } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [upsellItem, setUpsellItem] = useState(null)

  useEffect(() => {
    const fetchUpsell = async () => {
      // Logic: Check if any item in cart has a linked upsell product ID
      const cartIds = cart.map(i => i.id)
      const triggeringItem = cart.find(i => i.upsell_product_id)
      
      let data = null
      
      if (triggeringItem) {
        // Fetch specific linked upsell
        const { data: linked } = await supabase.from('products').select('*').eq('id', triggeringItem.upsell_product_id).single()
        data = linked
      }
      
      // Fallback: Random ebook if specific upsell isn't in cart
      if (!data || cartIds.includes(data.id)) {
         const { data: random } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'ebook')
          .not('id', 'in', `(${cartIds.join(',')})`)
          .limit(1)
          .maybeSingle()
         data = random
      }

      if (data && !cartIds.includes(data.id)) setUpsellItem(data)
      else setUpsellItem(null)
    }
    if (cart.length > 0) fetchUpsell()
    else setUpsellItem(null)
  }, [cart])
  
  const discountAmount = Math.round((cartTotal * discount) / 100)
  const finalTotal = cartTotal - discountAmount

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to checkout")
      router.push('/login')
      return
    }
    setLoading(true)
    
    setTimeout(async () => {
      try {
        const subscriptions = cart.filter(item => item.type === 'subscription')
        const oneTimePurchases = cart.filter(item => item.type !== 'subscription')

        for (const sub of subscriptions) {
          const nextMonth = new Date()
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          await supabase.from('subscriptions').upsert({
            user_id: user.id,
            status: 'active',
            plan_name: sub.title,
            current_period_end: nextMonth
          }, { onConflict: 'user_id' })
        }

        if (oneTimePurchases.length > 0) {
          const purchases = oneTimePurchases.map(item => ({ 
            user_id: user.id, 
            product_id: item.id, 
            status: 'completed' 
          }))
          await supabase.from('purchases').insert(purchases)
        }
        
        alert("Purchase successful! Redirecting...")
        clearCart()
        router.push('/dashboard')
      } catch (err) { alert(err.message) } 
      finally { setLoading(false) }
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-brand-dark mb-8 flex items-center gap-3"><ShoppingBag className="text-brand-purple"/> Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-6">Your cart is empty.</p>
              <a href="/corsi" className="btn btn-plum-gradient px-8 py-3">Browse Courses</a>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={item.image_url || 'https://placehold.co/100'} className="w-full h-full object-cover"/>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                        <p className="text-xs font-bold uppercase text-brand-blue bg-blue-50 px-2 py-1 rounded-md inline-block mt-1">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-brand-dark text-lg">{item.price}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={20}/></button>
                    </div>
                  </div>
                ))}

                {upsellItem && (
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center justify-between mt-4 animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-orange-500"><Sparkles size={24}/></div>
                      <div>
                        <p className="font-bold text-orange-800">Add {upsellItem.title}?</p>
                        <p className="text-xs text-orange-600">Accelerate your learning for just {upsellItem.price}.</p>
                      </div>
                    </div>
                    <button onClick={() => addToCart(upsellItem)} className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition shadow-md"><Plus size={20}/></button>
                  </div>
                )}
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-24">
                <h3 className="font-bold text-xl text-gray-800 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{cartTotal} Ft</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600 font-bold"><span>Discount ({discount}%)</span><span>-{discountAmount} Ft</span></div>}
                  <CouponInput onApply={setDiscount} />
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-2xl font-black text-brand-dark mb-8"><span>Total</span><span>{finalTotal} Ft</span></div>
                <button onClick={handleCheckout} disabled={loading} className="w-full btn btn-plum-gradient py-4 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 mb-4">
                  {loading ? "Processing..." : <>Checkout <ArrowRight size={20}/></>}
                </button>
                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1"><Lock size={12}/> Secure Payment via Stripe</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
