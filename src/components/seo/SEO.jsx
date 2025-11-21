import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function SEO({ title, description }) {
  const location = useLocation()

  useEffect(() => {
    document.title = title ? `${title} | Annyeong Academy` : 'Annyeong Academy'
    
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description || 'Learn Korean naturally.')
    }
  }, [title, description, location])

  return null
}
