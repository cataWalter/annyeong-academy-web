import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32 text-gray-700">
        <h1 className="text-4xl font-bold text-brand-dark mb-8">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="mb-4">Ultimo aggiornamento: 21 Novembre 2025</p>
          <p className="mb-4">
            La tua privacy Ã¨ importante per Annyeong AkadÃ©mia. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali quando ti iscrivi ai nostri webinar.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">1. Dati raccolti</h3>
          <p className="mb-4">
            Raccogliamo solo i dati necessari per fornirti il servizio: Nome, Indirizzo Email e preferenza di data per il webinar.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">2. FinalitÃ  del trattamento</h3>
          <p className="mb-4">
            I tuoi dati vengono utilizzati esclusivamente per inviarti il link di accesso a Zoom e materiali didattici correlati all'evento.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">3. I tuoi diritti</h3>
          <p className="mb-4">
            Puoi richiedere la cancellazione dei tuoi dati in qualsiasi momento scrivendo a info@annyeong-akademia.com.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
