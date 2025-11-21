// Follow this guide to deploy: https://supabase.com/docs/guides/functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { record } = await req.json() // The new lead data
    
    // 1. Send Email via Resend (example)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Annyeong Academy <info@annyeong-academy.com>',
        to: record.email,
        subject: 'Your Korean Open Day Ticket! 🇰🇷',
        html: `
          <h1>Annyeong, ${record.full_name}!</h1>
          <p>You are registered for the webinar on <strong>${record.webinar_date}</strong>.</p>
          <p>Here is your Zoom Link: <a href="https://zoom.us/j/example">Join Here</a></p>
          <p>See you there!</p>
        `
      })
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
