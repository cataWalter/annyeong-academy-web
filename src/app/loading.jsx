import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F8F9FC]">
      <Loader2 className="animate-spin text-brand-purple" size={48} />
    </div>
  )
}
