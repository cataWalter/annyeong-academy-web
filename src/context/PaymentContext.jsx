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
