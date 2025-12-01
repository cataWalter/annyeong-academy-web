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
