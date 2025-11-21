import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'INSERISCI_QUI_URL_SUPABASE'

if (isConfigured) {
  console.log("✅ Supabase Client Initialized with URL:", supabaseUrl)
} else {
  console.warn("⚠️ Supabase NOT configured. Using Mock Client.")
}

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ error: null }),
        update: () => ({ error: null }),
        delete: () => ({ error: null }),
        upload: () => ({ error: { message: "Supabase not configured" } }),
        getPublicUrl: () => ({ data: { publicUrl: "https://placehold.co/400" } }),
        eq: function() { return this },
        single: () => ({ data: null, error: null }),
        order: function() { return this },
        limit: function() { return this },
        in: function() { return this },
        upsert: () => ({ error: null })
      }),
      auth: {
        getSession: async () => ({ data: { session: null } }),
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: (callback) => {
          callback('SIGNED_OUT', null) 
          return { data: { subscription: { unsubscribe: () => {} } } }
        },
        signInWithPassword: async () => ({ error: { message: "Configure .env.local first!" } }),
        signUp: async () => ({ error: { message: "Configure .env.local first!" } }),
        signOut: async () => ({}),
        resetPasswordForEmail: async () => ({ error: { message: "Configure .env.local first!" } }),
        updateUser: async () => ({ error: null })
      },
      storage: {
        from: () => ({
           upload: async () => ({ error: { message: "Configure Supabase" } }),
           getPublicUrl: () => ({ data: { publicUrl: "https://placehold.co/400" } })
        })
      }
    }
