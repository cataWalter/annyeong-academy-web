"use client";

import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { PaymentProvider } from '@/context/PaymentContext'
import { ToastProvider } from '@/context/ToastContext'
import { CartProvider } from '@/context/CartContext'
import SupabaseConfigWarning from '@/components/auth/SupabaseConfigWarning'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Annyeong Academy</title>
        <meta name="description" content="Learn Korean without English" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-gray-800">
        <SupabaseConfigWarning />
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <LanguageProvider>
                <PaymentProvider>
                  {children}
                </PaymentProvider>
              </LanguageProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
