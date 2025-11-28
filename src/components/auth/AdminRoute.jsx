"use client";
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function AdminRoute() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-purple" size={40} />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate href="/dashboard" replace />
  }

  return <Outlet />
}
