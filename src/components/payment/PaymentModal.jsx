import { useState, useEffect } from 'react'
import { X, CreditCard, Lock, CheckCircle, Loader2, ShieldCheck } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'

export default function PaymentModal({ isOpen, onClose, item }) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('form') 

  useEffect(() => { if (isOpen) setStep('form') }, [isOpen])

  if (!isOpen || !item) return null

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(async () => {
      setStep('processing')
      setTimeout(async () => {
        try {
          const { error } = await supabase.from('purchases').insert([{ user_id: user.id, product_id: item.id, status: 'completed' }])
          if (error) throw error
          setStep('success')
          addToast('Purchase successful!', 'success')
          setTimeout(() => window.location.reload(), 2000)
        } catch (error) {
          setLoading(false)
          setStep('form')
          addToast(error.message, 'error')
        }
      }, 1500)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-slide-in">
        <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2 text-brand-dark font-bold"><ShieldCheck className="text-green-500" size={20} /> {t('pay_secure')}</div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
        </div>

        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handlePayment}>
              <div className="flex gap-4 mb-6">
                <img src={item.image_url || 'https://placehold.co/100'} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                <div>
                  <h3 className="font-bold text-gray-800 leading-tight">{item.title}</h3>
                  <p className="text-brand-purple font-bold text-xl">{item.price}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('pay_card')}</label>
                  <div className="relative">
                    <input type="text" placeholder="4242 4242 4242 4242" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-purple font-mono" readOnly value="4242 4242 4242 4242" />
                    <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('pay_expiry')}</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-purple font-mono" readOnly value="12/28" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('pay_cvc')}</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-purple font-mono" readOnly value="123" />
                  </div>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg">
                {loading ? <Loader2 className="animate-spin" /> : <><Lock size={16} /> {t('pay_btn')} {item.price}</>}
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-10 text-center">
              <Loader2 className="w-16 h-16 text-brand-purple animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">{t('pay_processing')}</h3>
            </div>
          )}

          {step === 'success' && (
            <div className="py-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('pay_success')}</h3>
              <p className="text-gray-500">{t('pay_redirect')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
