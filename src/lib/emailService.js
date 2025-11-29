import { supabase } from './supabase'

/**
 * Attempts to send an email via Supabase Edge Function.
 * Fallbacks to console logging if function fails or is not configured.
 */
export const triggerEmail = async ({ to, subject, html, data }) => {
  try {
    // 1. Log the attempt in database (Audit Trail)
    // Note: Assuming 'admin_email_logs' is accessible, or just rely on console for dev.
    console.log(`[Email Service] Attempting to send to ${to}`)

    // 2. Call Edge Function (if configured)
    const { error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html, data }
    })

    if (error) throw error
    
    console.log("[Email Service] Success via Edge Function")
    return { success: true }

  } catch (err) {
    console.warn("[Email Service] Edge Function failed/missing. Falling back to Log.", err)
    
    // 3. Fallback: Log to 'contact_messages' as a system log so Admins see it in CRM
    await supabase.from('contact_messages').insert([{
      name: 'System Outbound',
      email: 'system@annyeong.com',
      message: `[MOCK EMAIL SENT]\nTo: ${to}\nSubject: ${subject}\n\n${html.replace(/<[^>]*>?/gm, '')}` // Strip HTML for text log
    }])
    
    return { success: true, mocked: true }
  }
}
