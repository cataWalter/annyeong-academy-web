import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Needs JWT or OAuth token generation logic here
const ZOOM_API_URL = 'https://api.zoom.us/v2/users/me/meetings'

serve(async (req) => {
  try {
    // 1. Authenticate with Zoom (Mocked here, real world needs Access Token management)
    const accessToken = "MOCK_ZOOM_TOKEN" 

    const { topic, start_time } = await req.json()

    // 2. Create Meeting
    // const res = await fetch(ZOOM_API_URL, {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ topic, type: 2, start_time, duration: 60 })
    // })
    // const data = await res.json()

    // Mock Response
    const data = {
        join_url: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
        id: Math.floor(Math.random() * 1000000000)
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
