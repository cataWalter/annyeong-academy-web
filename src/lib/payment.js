import { supabase } from './supabase'

export const initiateCheckout = async (courseId, courseTitle) => {
  // 1. Controlla se l'utente è loggato
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Devi effettuare il login per acquistare." }

  // 2. SIMULAZIONE PER IL FRONTEND:
  console.log("Avvio checkout Stripe per: " + courseTitle + " (ID: " + courseId + ")")
  
  alert("Simulazione: Reindirizzamento a Stripe per " + courseTitle + "...")
  
  return { success: true }
}