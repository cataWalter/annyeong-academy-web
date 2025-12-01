"use client";
import { supabase } from '@/lib/supabase'

export function useEdgeFunction() {
  const invoke = async (functionName, body) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Not authenticated')

      // Try calling the real Edge Function
      const { data, error } = await supabase.functions.invoke(functionName, {
        body,
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      })

      if (error) {
        console.warn(`Edge Function '${functionName}' failed/missing. Using local fallback logic.`, error)
        return { data: null, error, fallback: true }
      }

      return { data, error: null, fallback: false }
    } catch (err) {
      console.error(err)
      return { data: null, error: err, fallback: true }
    }
  }

  return { invoke }
}
