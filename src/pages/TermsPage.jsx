import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">Termini e Condizioni</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4">Benvenuto su Annyeong Akadémia. Utilizzando il nostro sito e i nostri servizi, accetti i seguenti termini.</p>
            
            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">1. Iscrizione e Account</h3>
            <p>Per accedere ai corsi è necessario creare un account. Sei responsabile della riservatezza della tua password e di tutte le attività che avvengono sotto il tuo account.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">2. Proprietà Intellettuale</h3>
            <p>Tutti i contenuti (video, PDF, audio) sono di proprietà esclusiva di Annyeong Akadémia. È vietata la copia, la distribuzione o la condivisione delle credenziali di accesso.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">3. Rimborsi</h3>
            <p>Offriamo una garanzia di rimborso entro 14 giorni dall'acquisto del corso, a condizione che non sia stato visualizzato più del 20% del contenuto.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">4. Comportamento</h3>
            <p>Durante le lezioni live e nei commenti, è richiesto un comportamento rispettoso. Ci riserviamo il diritto di sospendere l'account in caso di molestie o linguaggio inappropriato.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">5. Modifiche</h3>
            <p>Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive dalla pubblicazione sul sito.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
