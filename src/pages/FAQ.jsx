import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function FAQ() {
  const faqs = [
    {
      q: "Come funzionano i corsi Live?",
      a: "I corsi Live si svolgono su Zoom a orari fissi. Riceverai il link via email. Se perdi una lezione, potrai vedere la registrazione nell'area studenti entro 24 ore."
    },
    {
      q: "Posso scaricare i video?",
      a: "Per motivi di copyright, i video sono disponibili solo in streaming sulla nostra piattaforma. I materiali PDF e Audio sono invece scaricabili."
    },
    {
      q: "Rilasciate un certificato?",
      a: "SÃ¬, al completamento di almeno l'80% delle lezioni di un corso, riceverai un certificato di frequenza digitale firmato dall'insegnante."
    },
    {
      q: "Quali metodi di pagamento accettate?",
      a: "Accettiamo tutte le principali carte di credito/debito tramite Stripe. Ãˆ il metodo piÃ¹ sicuro e veloce."
    },
    {
      q: "Serve comprare libri di testo a parte?",
      a: "No. Tutto il materiale didattico (PDF, eserciziari) Ã¨ incluso nel prezzo del corso e creato internamente da Annyeong AkadÃ©mia."
    }
  ]

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC] min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">Domande Frequenti</h1>
          <p className="text-center text-gray-600 mb-12">
            Tutto quello che devi sapere prima di iniziare.
          </p>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <details key={i} className="group bg-white p-6 rounded-2xl shadow-sm cursor-pointer open:ring-2 open:ring-brand-purple/20 transition">
                <summary className="font-bold text-lg text-brand-dark list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-brand-purple group-open:rotate-180 transition text-2xl">â–¼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
