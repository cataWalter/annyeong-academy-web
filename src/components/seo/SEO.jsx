"use client";
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SEO({ title, description }) {
  const pathname = usePathname()

  useEffect(() => {
    document.title = title ? `${title} | Annyeong Academy` : 'Annyeong Academy'
    
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description || 'Learn Korean naturally.')
    }
  }, [title, description, location])

  return null
}
