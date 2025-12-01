#!/bin/bash

echo "🔄 Switching Payment Provider from Stripe to Barion..."

# ==============================================================================
# 1. CLEANUP STRIPE FILES
# ==============================================================================
echo "🗑️  Removing old Stripe files..."
rm -rf src/app/api/webhooks/stripe
rm -rf supabase/functions/create-checkout

# ==============================================================================
# 2. CREATE BARION WEBHOOK (Next.js API Route)
# ==============================================================================
echo "Hz  Creating Barion Webhook Handler..."
mkdir -p src/app/api/webhooks/barion

cat << 'EOF' > src/app/api/webhooks/barion/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ENV Variables needed:
// BARION_POS_KEY
// BARION_API_URL (e.g. https://api.test.barion.com or https://api.barion.com)
// NEXT_PUBLIC_SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY (Critical for bypassing RLS to record purchase)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const { paymentId } = await req.json()
    const posKey = process.env.BARION_POS_KEY
    const barionUrl = process.env.BARION_API_URL || "https://api.test.barion.com"

    if (!paymentId || !posKey) {
      return NextResponse.json({ error: "Missing PaymentId or POSKey" }, { status: 400 })
    }

    // 1. Verify Payment State with Barion API (Server-to-Server)
    const res = await fetch(`${barionUrl}/v2/Payment/GetPaymentState?POSKey=${posKey}&PaymentId=${paymentId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()

    // 2. Check if Succeeded
    if (data.Status === 'Succeeded') {
      
      // We stored the User ID in the "OrderNumber" field during initialization
      const userId = data.OrderNumber 
      
      // We extracted product ID from the Item SKU or Name (Simplified logic: assumes 1 item per order)
      // In a robust app, you might parse data.Transactions[0].Items[0].SKU
      // For this demo, we will rely on metadata if Barion supports it, or passing product ID in the OrderNumber like "USERID__PRODUCTID"
      
      const [uId, pId] = userId.split('__') // Convention: "uuid__product-slug"

      if (uId && pId) {
        // 3. Record Purchase in Supabase
        const { error } = await supabase.from('purchases').insert([
          {
            user_id: uId,
            product_id: pId,
            status: 'completed',
            transaction_id: paymentId
          }
        ])

        if (error) {
          console.error("Supabase Write Error:", error)
          return NextResponse.json({ error: "DB Error" }, { status: 500 })
        }
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    console.error("Barion Webhook Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
EOF

# ==============================================================================
# 3. CREATE BARION EDGE FUNCTION (Initiate Payment)
# ==============================================================================
echo "⚡ Creating Barion Edge Function..."
mkdir -p supabase/functions/create-barion-payment

cat << 'EOF' > supabase/functions/create-barion-payment/index.ts
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
EOF

# ==============================================================================
# 4. UPDATE FRONTEND CONTEXT (Redirect Logic)
# ==============================================================================
echo "💻 Updating PaymentContext.jsx to use Barion..."

cat << 'EOF' > src/context/PaymentContext.jsx
"use client";
import { createContext, useContext, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'
import { Loader2 } from 'lucide-react'

const PaymentContext = createContext()

export function PaymentProvider({ children }) {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [processing, setProcessing] = useState(false)

  const initiateCheckout = async (product) => {
    if (!user) {
      addToast("Please login to purchase", "error")
      return
    }

    setProcessing(true)
    addToast("Connecting to Barion...", "info")

    try {
      // 1. Call Edge Function to get Barion URL
      const { data, error } = await supabase.functions.invoke('create-barion-payment', {
        body: { product, userId: user.id }
      })

      if (error) throw new Error(error.message)
      if (data?.error) throw new Error(data.error)

      // 2. Redirect to Barion Gateway
      if (data?.GatewayUrl) {
        window.location.href = data.GatewayUrl
      } else {
        throw new Error("No Gateway URL returned from Barion")
      }

    } catch (err) {
      console.error(err)
      addToast(`Payment Error: ${err.message}`, "error")
      setProcessing(false)
    }
  }

  return (
    <PaymentContext.Provider value={{ initiateCheckout }}>
      {processing && (
        <div className="fixed inset-0 bg-white/80 z-[9999] flex flex-col items-center justify-center">
          <Loader2 size={48} className="animate-spin text-brand-purple mb-4"/>
          <p className="text-xl font-bold text-brand-dark">Redirecting to Barion...</p>
          <p className="text-sm text-gray-500">Secure Payment Gateway</p>
        </div>
      )}
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => useContext(PaymentContext)
EOF

# ==============================================================================
# 5. REMOVE STRIPE MODAL
# ==============================================================================
# We no longer need the modal because Barion handles the UI on their site.
# The PaymentContext now redirects immediately.
echo "🗑️  Removing PaymentModal.jsx (replaced by direct redirect)..."
rm -f src/components/payment/PaymentModal.jsx

echo "✅ Codebase updated for Barion!"
echo ""
echo "⚠️  IMPORTANT: FINAL CONFIGURATION STEPS"
echo "----------------------------------------"
echo "1. Go to your Barion Wallet and get your POS Key."
echo "2. Add these to your .env.local file:"
echo "   BARION_POS_KEY=your-pos-key"
echo "   BARION_API_URL=https://api.test.barion.com"
echo "   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
echo ""
echo "3. Add these to your Supabase Dashboard (Edge Functions Secrets):"
echo "   BARION_POS_KEY"
echo "   BARION_API_URL"
echo "   SITE_URL (e.g. https://your-site.com or https://your-ngrok-url.com for testing)"
echo ""
echo "4. Deploy the new function:"
echo "   npx supabase functions deploy create-barion-payment"
echo "----------------------------------------"
EOF