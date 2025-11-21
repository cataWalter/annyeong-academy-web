import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to check if env vars are set properly to avoid crashing immediately
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'INSERISCI_QUI_URL_SUPABASE'

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock implementation to prevent crash if keys are missing
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
        signOut: async () => ({}),
        resetPasswordForEmail: async () => ({ error: { message: "Configure Supabase first!" } })
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
