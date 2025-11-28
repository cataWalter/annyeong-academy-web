import { createContext, useContext, useState } from 'react'
import PaymentModal from '@/components/payment/PaymentModal'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

const PaymentContext = createContext()

export function PaymentProvider({ children }) {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const initiateCheckout = (item) => {
    if (!user) {
      addToast("Please login to purchase", "error")
      return
    }
    setSelectedItem(item)
    setModalOpen(true)
  }

  return (
    <PaymentContext.Provider value={{ initiateCheckout }}>
      {children}
      <PaymentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        item={selectedItem} 
      />
    </PaymentContext.Provider>
  )
}

export const usePayment = () => useContext(PaymentContext)
