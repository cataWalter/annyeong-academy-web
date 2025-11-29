"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import CouponInput from '@/components/ui/CouponInput'
import { Trash2, ShoppingBag, ArrowRight, CreditCard, Lock, Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Hardcoded Upsell for Demo
  const upsellItem = {
    id: 'upsell-wb-1',
    title: 'Beginner Workbook PDF',
    price: 5000,
    type: 'ebook',
    image_url: 'https://placehold.co/100/orange/white?text=Workbook'
  }

  const hasUpsell = cart.some(i => i.id === upsellItem.id)
  
  // Calculate Totals
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
        const purchases = cart.map(item => ({ user_id: user.id, product_id: item.id, status: 'completed' }))
        await supabase.from('purchases').insert(purchases)
        
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

                {/* UPSELL SECTION */}
                {!hasUpsell && (
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <img src={upsellItem.image_url} className="w-12 h-12 rounded-lg" />
                      <div>
                        <p className="font-bold text-orange-800">Add the Workbook?</p>
                        <p className="text-xs text-orange-600">Accelerate your learning for just {upsellItem.price} Ft.</p>
                      </div>
                    </div>
                    <button onClick={() => addToCart(upsellItem)} className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"><Plus size={20}/></button>
                  </div>
                )}
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-24">
                <h3 className="font-bold text-xl text-gray-800 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{cartTotal} Ft</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Discount ({discount}%)</span>
                      <span>-{discountAmount} Ft</span>
                    </div>
                  )}
                  <CouponInput onApply={setDiscount} />
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between text-2xl font-black text-brand-dark mb-8">
                  <span>Total</span>
                  <span>{finalTotal} Ft</span>
                </div>
                
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
