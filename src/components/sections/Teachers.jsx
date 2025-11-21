import Section from '../ui/Section'
import { useLanguage } from '../../context/LanguageContext'

export default function Teachers() {
  const { t } = useLanguage()
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          {t('teacher_title')}
        </h2>
        <p className="text-gray-600">{t('teacher_subtitle')}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm text-center border-t-4 border-brand-purple hover:-translate-y-2 transition duration-300">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-r from-brand-blue to-brand-purple">
            <img 
              src="https://placehold.co/150x150/6a11cb/ffffff?text=Kim" 
              alt="Kim Teacher" 
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark">Kim Seon-saeng-nim</h3>
          <span className="text-sm font-bold text-brand-purple uppercase tracking-wider block mb-4">{t('teacher_kim_role')}</span>
          <p className="text-gray-600">
            {t('teacher_kim_bio')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm text-center border-t-4 border-brand-blue hover:-translate-y-2 transition duration-300">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-r from-brand-blue to-brand-purple">
            <img 
              src="https://placehold.co/150x150/2575fc/ffffff?text=Lee" 
              alt="Lee Teacher" 
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark">Lee Seon-saeng-nim</h3>
          <span className="text-sm font-bold text-brand-blue uppercase tracking-wider block mb-4">{t('teacher_lee_role')}</span>
          <p className="text-gray-600">
            {t('teacher_lee_bio')}
          </p>
        </div>
      </div>
    </Section>
  )
}
