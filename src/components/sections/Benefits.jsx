import Section from '../ui/Section'
import { Globe, MessageCircle, Utensils } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Benefits() {
  const { t } = useLanguage()
  return (
    <Section className="bg-white">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          {t('ben_title')}
        </h2>
        <p className="text-gray-600 text-lg">
          {t('ben_subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Globe className="w-8 h-8 text-brand-blue" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">{t('ben_1_title')}</h3>
          <p className="text-gray-600">{t('ben_1_desc')}</p>
        </div>

        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <MessageCircle className="w-8 h-8 text-brand-purple" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">{t('ben_2_title')}</h3>
          <p className="text-gray-600">{t('ben_2_desc')}</p>
        </div>

        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Utensils className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">{t('ben_3_title')}</h3>
          <p className="text-gray-600">{t('ben_3_desc')}</p>
        </div>
      </div>
    </Section>
  )
}
