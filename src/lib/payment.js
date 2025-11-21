import { supabase } from './supabase'

export const initiateCheckout = async (productId, productTitle) => {
  // 1. Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Devi effettuare il login per acquistare." }

  // 2. SIMULATION: In production, this happens via Stripe Webhook
  // Here we manually insert the purchase to test the Membership System
  
  console.log("Processing mock payment for: " + productTitle)
  
  const confirm = window.confirm("SIMULAZIONE PAGAMENTO STRIPE:\n\nVuoi acquistare '" + productTitle + "'?\n(Cliccando OK verrÃ  sbloccato il contenuto)")
  
  if (confirm) {
    // Insert into 'purchases' table
    const { error } = await supabase
      .from('purchases')
      .insert([
        { 
          user_id: user.id, 
          product_id: productId,
          status: 'completed'
        }
      ])

    if (error) {
      console.error(error)
      alert("Errore durante l'acquisto simulato.")
      return { error: error.message }
    }

    alert("Acquisto effettuato! Il contenuto Ã¨ ora sbloccato.")
    return { success: true }
  }
  
  return { cancelled: true }
}
