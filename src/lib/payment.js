import { supabase } from './supabase'

export const initiateCheckout = async (productId, productTitle) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return alert("Devi effettuare il login per acquistare.")

  const confirm = window.confirm("SIMULAZIONE PAGAMENTO STRIPE:\n\nVuoi acquistare '" + productTitle + "'?\n(Cliccando OK verrà sbloccato il contenuto)")
  
  if (confirm) {
    const { error } = await supabase.from('purchases').insert([{ user_id: user.id, product_id: productId, status: 'completed' }])
    if (error) {
      console.error(error)
      alert("Errore durante l'acquisto simulato.")
    } else {
      alert("Acquisto effettuato con successo! La pagina si aggiornerà.")
      window.location.reload() 
    }
  }
}
