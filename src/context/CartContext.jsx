"use client";
import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from './ToastContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const { addToast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('annyeong_cart')
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)) } catch (e) { console.error(e) }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('annyeong_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        addToast(`${product.title} is already in cart`, 'info')
        return prev
      }
      addToast(`${product.title} added to cart!`, 'success')
      return [...prev, product]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((total, item) => {
    // Parse price strings like "15.000 Ft" or numbers
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
      : item.price
    return total + (isNaN(price) ? 0 : price)
  }, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
