import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FC] text-center px-4">
      <h1 className="text-9xl font-black text-gray-200 select-none">404</h1>
      <div className="absolute mt-[-2rem]">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('not_found')}</h2>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition shadow-lg"
        >
          <Home size={20} /> {t('back_home')}
        </Link>
      </div>
    </div>
  )
}
