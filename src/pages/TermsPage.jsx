import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32 text-gray-700">
        <h1 className="text-4xl font-bold text-brand-dark mb-8">Termini e Condizioni</h1>
        <div className="prose prose-lg">
          <p className="mb-4">Benvenuto su Annyeong AkadÃ©mia.</p>
          <p className="mb-4">
            Partecipando al nostro Open Day gratuito, accetti le seguenti condizioni.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">Comportamento</h3>
          <p className="mb-4">
            Ci riserviamo il diritto di rimuovere dal webinar qualsiasi partecipante che mostri comportamenti irrispettosi o molesti verso gli insegnanti o altri studenti.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">ProprietÃ  Intellettuale</h3>
          <p className="mb-4">
            I materiali forniti (PDF, slide) sono per uso personale e non possono essere rivenduti o distribuiti senza permesso.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
