export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">La tua Dashboard</h1>
      <p className="text-gray-500 mb-8">Benvenuto! Ecco i tuoi progressi.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl font-bold text-brand-purple mb-1">0</div>
          <div className="text-sm text-gray-500 font-medium uppercase">Corsi Attivi</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl font-bold text-brand-blue mb-1">0%</div>
          <div className="text-sm text-gray-500 font-medium uppercase">Completamento</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl font-bold text-orange-500 mb-1">0</div>
          <div className="text-sm text-gray-500 font-medium uppercase">Certificati</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-brand-dark mb-4">I miei Corsi</h2>
      <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-300">
        <div className="text-4xl mb-4">ðŸ“š</div>
        <h3 className="text-lg font-bold text-gray-700">Non sei ancora iscritto a nessun corso.</h3>
        <p className="text-gray-500 mb-6">Inizia il tuo viaggio nel coreano oggi stesso.</p>
        <a href="/corsi" className="inline-block bg-brand-purple text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition">
          Esplora il Catalogo
        </a>
      </div>
    </div>
  )
}
