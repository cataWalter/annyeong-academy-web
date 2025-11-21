import Section from '../ui/Section'
import { Quote } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">{t('testi_title')}</h2>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md flex-1 min-w-[300px]">
          <Quote className="w-8 h-8 text-brand-purple mb-4 opacity-20" />
          <p className="text-gray-600 italic mb-6 text-lg">
            "{t('testi_1_text')}"
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-purple pl-3">
            - {t('testi_1_author')}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md flex-1 min-w-[300px]">
          <Quote className="w-8 h-8 text-brand-blue mb-4 opacity-20" />
          <p className="text-gray-600 italic mb-6 text-lg">
            "{t('testi_2_text')}"
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-blue pl-3">
            - {t('testi_2_author')}
          </div>
        </div>
      </div>
    </Section>
  )
}
