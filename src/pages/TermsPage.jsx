import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function TermsPage() {
  const { t } = useLanguage()
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">{t('terms_title')}</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4">Welcome to Annyeong Academy.</p>
            <p>Use of this site constitutes acceptance of our terms.</p>
            {/* Placeholder for full legal text which usually isn't fully translated in MVPs */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
