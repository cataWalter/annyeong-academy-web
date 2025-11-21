import { createClient } from '@supabase/supabase-js'

// Usa stringhe vuote come fallback per evitare crash se .env manca
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
