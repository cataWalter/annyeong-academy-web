"use client";
import Section from '../ui/Section'
import { Check } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Offer() {
  const { t } = useLanguage()
  return (
    <Section className="bg-brand-dark text-white text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('offer_title')}</h2>
        <p className="text-gray-300 mb-12">{t('offer_subtitle')}</p>

        <div className="bg-white text-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-lg mx-auto relative transform hover:-translate-y-2 transition duration-300">
          <div className="absolute top-6 right-0 bg-gradient-to-r from-brand-teal to-brand-purple text-white text-xs font-bold px-8 py-2 transform rotate-45 translate-x-8 shadow-md">
            {t('offer_free')}
          </div>

          <h3 className="text-2xl font-bold mb-6 text-brand-dark">{t('offer_pass')}</h3>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="text-gray-400 line-through text-xl">15.000 Ft</span>
            {/* GRADIENT TEXT PRICE */}
            <span className="text-5xl font-extrabold text-gradient-brand">
              0 Ft
            </span>
          </div>

          <ul className="text-left space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
              <span>{t('offer_feat_1')}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
              <span>{t('offer_feat_2')}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
              <span>{t('offer_feat_3')}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-plum-100 p-1 rounded-full"><Check className="w-4 h-4 text-plum-500" /></div>
              <span className="font-bold">{t('offer_feat_4')}</span>
            </li>
          </ul>

          <button 
            onClick={() => document.getElementById('registration').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-plum-gradient w-full py-4"
          >
            {t('offer_btn')}
          </button>
          <p className="text-xs text-gray-400 mt-4">{t('offer_no_cc')}</p>
        </div>
      </div>
    </Section>
  )
}
