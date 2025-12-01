import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const BARION_API_URL = Deno.env.get("BARION_API_URL") || "https://api.test.barion.com"
const POS_KEY = Deno.env.get("BARION_POS_KEY")
const SITE_URL = Deno.env.get("SITE_URL") || "http://localhost:3000"

serve(async (req) => {
  // CORS Header
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  try {
    const { product, userId } = await req.json()

    // Clean price string (e.g. "5000 Ft" -> 5000)
    const numericPrice = parseFloat(product.price.toString().replace(/[^0-9.]/g, ''))

    if (!POS_KEY) throw new Error("Missing BARION_POS_KEY")

    // 1. Construct Barion Payload
    const payload = {
      POSKey: POS_KEY,
      PaymentType: "Immediate",
      GuestCheckOut: true,
      FundingSources: ["All"],
      PaymentRequestId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      RedirectUrl: `${SITE_URL}/dashboard?payment=success`,
      CallbackUrl: `${SITE_URL}/api/webhooks/barion`, // Points to Next.js API Route
      
      // TRICK: We store UserID and ProductID in OrderNumber with a separator
      // allowing us to recover it in the webhook without complex metadata
      OrderNumber: `${userId}__${product.id}`,
      
      Transactions: [
        {
          POSTransactionId: `TRANS-${Date.now()}`,
          Payee: "info@annyeong-academy.com", // This is decorative in API, strictly mapped to POSKey owner
          Total: numericPrice,
          Items: [
            {
              Name: product.title,
              Description: product.description ? product.description.substring(0, 90) : "Digital Course",
              Quantity: 1,
              UnitPrice: numericPrice,
              ItemTotal: numericPrice,
              SKU: product.id
            }
          ]
        }
      ],
      Locale: "hu-HU",
      Currency: "HUF"
    }

    // 2. Call Barion Start API
    const res = await fetch(`${BARION_API_URL}/v2/Payment/Start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    // 3. Handle Barion Response
    if (data.Errors && data.Errors.length > 0) {
      throw new Error(data.Errors[0].Description || "Barion Error")
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
})
