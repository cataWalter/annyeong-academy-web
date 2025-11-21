import WebinarForm from '../components/WebinarForm'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Navbar semplice */}
      <nav className="p-6 flex justify-center bg-white shadow-sm">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Annyeong AkadÃ©mia
        </span>
      </nav>

      <main className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-brand-purple text-sm font-semibold">
            Unisciti a +500 studenti
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Impara il coreano <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Senza sapere l'inglese!
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Partecipa alla nostra serata culturale online interattiva. 
            Prova la tecnologia di traduzione AI e impara dai madrelingua.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">No UK</div>
              <div className="font-bold text-gray-800">No Inglese</div>
              <div className="text-sm text-gray-500">Traduzione diretta in Italiano</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">KR</div>
              <div className="font-bold text-gray-800">100% Autentico</div>
              <div className="text-sm text-gray-500">In diretta da Seoul</div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="relative mt-8 md:mt-0">
          <WebinarForm />
          <p className="text-center text-xs text-gray-400 mt-4">
            Posti limitati su Zoom per garantire la qualitÃ .
          </p>
        </div>
      </main>
    </div>
  )
}
