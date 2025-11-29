"use client";
import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F8F9FC] text-center p-4">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle className="text-red-500" size={48} />
      </div>
      <h2 className="text-3xl font-bold text-brand-dark mb-4">Something went wrong!</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        We encountered an unexpected error. Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-plum-gradient px-8 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition"
      >
        <RotateCcw size={20} /> Try Again
      </button>
    </div>
  )
}
