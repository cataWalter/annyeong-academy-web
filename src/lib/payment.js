import { supabase } from './supabase'

export const initiateCheckout = async (productId, productTitle) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return alert("You must log in to purchase.")

  const confirm = window.confirm(`STRIPE SIMULATION:\n\nDo you want to purchase '${productTitle}'?\n(Clicking OK will unlock the content)`)
  
  if (confirm) {
    const { error } = await supabase.from('purchases').insert([{ user_id: user.id, product_id: productId, status: 'completed' }])
    if (error) {
      console.error(error)
      alert("Error during simulated purchase.")
    } else {
      alert("Purchase successful! The page will refresh.")
      window.location.reload() 
    }
  }
}
