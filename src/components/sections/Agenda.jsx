import Section from '../ui/Section'
import { useLanguage } from '../../context/LanguageContext'

export default function Agenda() {
  const { t } = useLanguage()
  const timeline = [
    { time: '18:00', title: t('agenda_1_title'), desc: t('agenda_1_desc') },
    { time: '18:15', title: t('agenda_2_title'), desc: t('agenda_2_desc') },
    { time: '18:45', title: t('agenda_3_title'), desc: t('agenda_3_desc') }
  ]

  return (
    <Section className="bg-white">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-8">{t('agenda_title')}</h2>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-brand-purple rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
                </div>
                <span className="text-brand-purple font-bold text-sm">{item.time}</span>
                <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-8">{t('agenda_faq_title')}</h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer open:bg-purple-50 transition">
              <summary className="font-bold text-brand-dark list-none flex justify-between items-center">
                {t('agenda_faq_1_q')}
                <span className="text-brand-purple group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">{t('agenda_faq_1_a')}</p>
            </details>
            <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer open:bg-purple-50 transition">
              <summary className="font-bold text-brand-dark list-none flex justify-between items-center">
                {t('agenda_faq_2_q')}
                <span className="text-brand-purple group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">{t('agenda_faq_2_a')}</p>
            </details>
            <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer open:bg-purple-50 transition">
              <summary className="font-bold text-brand-dark list-none flex justify-between items-center">
                {t('agenda_faq_3_q')}
                <span className="text-brand-purple group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">{t('agenda_faq_3_a')}</p>
            </details>
          </div>
        </div>
      </div>
    </Section>
  )
}
