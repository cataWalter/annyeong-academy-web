import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">Privacy Policy</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4"><strong>Ultimo aggiornamento:</strong> 21 Novembre 2025</p>
            
            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">1. Titolare del Trattamento</h3>
            <p>Annyeong Akadémia è il titolare del trattamento dei dati personali raccolti attraverso questo sito web.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">2. Dati Raccolti</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Dati forniti volontariamente: Nome, Cognome, Email (tramite form di iscrizione).</li>
              <li>Dati di navigazione: Indirizzo IP, tipo di browser (raccolti automaticamente per fini statistici).</li>
            </ul>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">3. Finalità del Trattamento</h3>
            <p>I dati vengono raccolti per:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Inviare il link di accesso al Webinar su Zoom.</li>
              <li>Fornire accesso alla piattaforma LMS e ai corsi acquistati.</li>
              <li>Inviare comunicazioni di servizio o materiali didattici.</li>
            </ul>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">4. Condivisione dei Dati</h3>
            <p>Non vendiamo né cediamo i tuoi dati a terzi. I dati possono essere trattati da fornitori di servizi tecnici (es. Supabase per il database, Stripe per i pagamenti) che agiscono come responsabili del trattamento.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">5. I Tuoi Diritti</h3>
            <p>Hai il diritto di accedere, rettificare o cancellare i tuoi dati in qualsiasi momento. Per esercitare questi diritti, contattaci a <strong>privacy@annyeong-akademia.com</strong>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
