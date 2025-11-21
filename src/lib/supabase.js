import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Evita il crash se le chiavi mancano
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'INSERISCI_QUI_URL_SUPABASE'

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock object per non far esplodere l'app se mancano le chiavi
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ error: { message: "Supabase non configurato! Controlla .env.local" } }),
        upload: () => ({ error: { message: "Supabase non configurato" } }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        eq: () => ({ single: () => ({ data: null, error: null }), order: () => ({ data: [], error: null }) }),
        upsert: () => ({ error: { message: "Supabase non configurato" } })
      }),
      auth: {
        getSession: async () => ({ data: { session: null } }),
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: "Configura Supabase prima!" } }),
        signUp: async () => ({ error: { message: "Configura Supabase prima!" } }),
        signOut: async () => ({})
      },
      storage: {
        from: () => ({
           upload: async () => ({ error: { message: "Configura Supabase" } }),
           getPublicUrl: () => ({ data: { publicUrl: "" } })
        })
      }
    }

if (!isConfigured) {
  console.error("🚨 ATTENZIONE: Chiavi Supabase mancanti o non valide in .env.local!")
}