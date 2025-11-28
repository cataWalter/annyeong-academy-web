"use client";
import { AlertCircle } from 'lucide-react'

export default function SupabaseConfigWarning() {
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (isConfigured) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-lg text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Missing Configuration</h2>
        <p className="text-gray-600 mb-6">
          The application cannot connect to the database. 
          <br/>Please create a <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">.env.local</code> file in the root directory.
        </p>
        <div className="bg-gray-50 p-4 rounded-xl text-left text-sm font-mono overflow-x-auto">
          <p className="text-gray-500 mb-2"># .env.local</p>
          <p>VITE_SUPABASE_URL=https://your-project.supabase.co</p>
          <p>VITE_SUPABASE_ANON_KEY=your-anon-key</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Retry Connection
        </button>
      </div>
    </div>
  )
}
