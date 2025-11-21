import Section from '../ui/Section'

export default function Teachers() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          I tuoi Insegnanti Madrelingua
        </h2>
        <p className="text-gray-600">In diretta da Seoul per guidarti.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Teacher 1 */}
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm text-center border-t-4 border-brand-purple hover:-translate-y-2 transition duration-300">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-r from-brand-blue to-brand-purple">
            <img 
              src="https://placehold.co/150x150/6a11cb/ffffff?text=Kim" 
              alt="Kim Teacher" 
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark">Kim Seon-saeng-nim</h3>
          <span className="text-sm font-bold text-brand-purple uppercase tracking-wider block mb-4">Specialista Principianti</span>
          <p className="text-gray-600">
            Kim ama introdurre i principianti alla lingua con energia e pazienza. Fan della cultura dei caffÃ¨ di Seoul.
          </p>
        </div>

        {/* Teacher 2 */}
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm text-center border-t-4 border-brand-blue hover:-translate-y-2 transition duration-300">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-r from-brand-blue to-brand-purple">
            <img 
              src="https://placehold.co/150x150/2575fc/ffffff?text=Lee" 
              alt="Lee Teacher" 
              className="w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark">Lee Seon-saeng-nim</h3>
          <span className="text-sm font-bold text-brand-blue uppercase tracking-wider block mb-4">Pronunciation Coach</span>
          <p className="text-gray-600">
            Si concentra sulla pronuncia pulita e le sfumature culturali. Ãˆ un grande foodie e conosce i migliori ristoranti.
          </p>
        </div>
      </div>
    </Section>
  )
}
