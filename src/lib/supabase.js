import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'INSERISCI_QUI_URL_SUPABASE'

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ error: { message: "Supabase not configured! Check .env.local" } }),
        upload: () => ({ error: { message: "Supabase not configured" } }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        eq: () => ({ single: () => ({ data: null, error: null }), order: () => ({ data: [], error: null }) }),
        upsert: () => ({ error: { message: "Supabase not configured" } }),
        delete: () => ({ error: { message: "Supabase not configured" } }),
        in: () => ({ eq: () => ({ data: [], error: null }) })
      }),
      auth: {
        getSession: async () => ({ data: { session: null } }),
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: "Configure Supabase first!" } }),
        signUp: async () => ({ error: { message: "Configure Supabase first!" } }),
        signOut: async () => ({})
      },
      storage: {
        from: () => ({
           upload: async () => ({ error: { message: "Configure Supabase" } }),
           getPublicUrl: () => ({ data: { publicUrl: "" } })
        })
      }
    }

if (!isConfigured) {
  console.error("🚨 WARNING: Supabase keys missing or invalid in .env.local!")
}
