import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">La Nostra Missione</h1>
          <p className="text-xl text-gray-600">
            Rendere la lingua coreana accessibile a tutti gli italiani, abbattendo la barriera dell'inglese.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src="https://placehold.co/600x400/6a11cb/ffffff?text=Team+Annyeong" className="rounded-3xl shadow-xl" alt="Team" />
          <div className="space-y-6 text-gray-700">
            <h2 className="text-2xl font-bold text-brand-purple">Chi Siamo</h2>
            <p>
              Annyeong AkadÃ©mia nasce dall'idea di un gruppo di insegnanti madrelingua coreani e studenti italiani. 
              Ci siamo resi conto che la maggior parte dei corsi online richiede di sapere l'inglese per imparare il coreano.
            </p>
            <p>
              Abbiamo deciso di cambiare le cose. Utilizzando tecnologia AI avanzata e materiali didattici proprietari, 
              offriamo un'esperienza di apprendimento diretta Coreano-Italiano.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
