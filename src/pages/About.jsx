import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">{t('about_title')}</h1>
          <p className="text-xl text-gray-600">
            {t('about_subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src="https://placehold.co/600x400/6a11cb/ffffff?text=Team+Annyeong" className="rounded-3xl shadow-xl" alt="Team" />
          <div className="space-y-6 text-gray-700">
            <h2 className="text-2xl font-bold text-brand-purple">{t('about_who_title')}</h2>
            <p>{t('about_who_p1')}</p>
            <p>{t('about_who_p2')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
