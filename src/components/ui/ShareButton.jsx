"use client";
import { Share2, Check } from 'lucide-react'
import { useState } from 'react'

export default function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: title || 'Annyeong Academy',
      text: text || 'Check this out!',
      url: url || window.location.href
    }

    if (navigator.share) {
      try { await navigator.share(shareData) } catch (e) {}
    } else {
      navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button onClick={handleShare} className="p-2 rounded-full bg-white text-gray-400 hover:text-brand-purple transition shadow-sm hover:shadow-md border border-gray-100">
      {copied ? <Check size={18}/> : <Share2 size={18}/>}
    </button>
  )
}
