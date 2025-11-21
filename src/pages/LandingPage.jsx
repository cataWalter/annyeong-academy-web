import Navbar from '../components/sections/Navbar'
import Benefits from '../components/sections/Benefits'
import Teachers from '../components/sections/Teachers'
import Agenda from '../components/sections/Agenda'
import Offer from '../components/sections/Offer'
import Testimonials from '../components/sections/Testimonials'
import Footer from '../components/sections/Footer'
import WebinarForm from '../components/WebinarForm'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-gray-800">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Hero Content */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white shadow-sm text-brand-purple text-sm font-bold border border-purple-100">
              <span>â­â­â­â­â­</span> Unisciti a +500 studenti
            </span>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
              Impara il Coreano <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                Senza l'Inglese!
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Partecipa alla serata culturale interattiva. Prova la traduzione AI dal vivo e impara dai madrelingua direttamente da Seoul.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Posti in esaurimento
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <span>ðŸ“¹</span> Live su Zoom
              </div>
            </div>
          </div>

          {/* Hero Form Container */}
          <div className="relative" id="registration">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue to-brand-purple rounded-[2rem] opacity-30 blur-2xl"></div>
            <WebinarForm />
          </div>
        </div>

        {/* Background Blob */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-purple-200 to-blue-200 opacity-20 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      </section>

      {/* Tech Bar */}
      <div className="py-8 border-y border-gray-200 bg-white/50 backdrop-blur text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Powered by Technology</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 font-bold text-sm">
          <span>ðŸ“¹ ZOOM HD</span>
          <span>ðŸ¤– AI LIVE TRANSLATE</span>
          <span>ðŸŽ§ STUDIO AUDIO</span>
          <span>ðŸ’¬ INTERACTIVE CHAT</span>
        </div>
      </div>

      <Benefits />
      <Teachers />
      <Agenda />
      <Offer />
      <Testimonials />
      
      {/* CTA Finale */}
      <section className="py-20 bg-brand-dark text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Non perdere questa esperienza unica</h2>
          <p className="text-gray-300 mb-8 text-lg">I posti su Zoom sono limitati per garantire l'interattivitÃ .</p>
          <button 
            onClick={() => document.getElementById('registration').scrollIntoView({ behavior: 'smooth' })}
            className="inline-block bg-gradient-to-r from-brand-blue to-brand-purple px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 transition transform"
          >
            Registrati Gratis Ora
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
