import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function Tutors() {
  const tutors = [
    {
      id: 1,
      name: "Kim Seon-saeng-nim",
      role: "Head of Dept & Beginners",
      image: "https://placehold.co/300x300/6a11cb/ffffff?text=Kim",
      bio: "Graduated in linguistics from Seoul National University. Kim developed our 'Direct-Translation' method to allow students to learn without English.",
      specialties: ["Basic Grammar", "Korean Culture", "K-Pop"]
    },
    {
      id: 2,
      name: "Lee Seon-saeng-nim",
      role: "Pronunciation & Conversation",
      image: "https://placehold.co/300x300/2575fc/ffffff?text=Lee",
      bio: "Former theater actor, Lee specializes in teaching perfect intonation and standard Seoul pronunciation. His lessons are always full of energy.",
      specialties: ["Speaking", "Acting", "Slang"]
    },
    {
      id: 3,
      name: "Park Seon-saeng-nim",
      role: "TOPIK Preparation",
      image: "https://placehold.co/300x300/ff9900/ffffff?text=Park",
      bio: "With 10 years of academic teaching experience, Park prepares students for official language certification exams.",
      specialties: ["TOPIK I & II", "Formal Writing", "Business Korean"]
    }
  ]

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Our Teachers</h1>
          <p className="text-xl text-gray-600">
            Certified native professionals, ready to guide you step by step.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {tutors.map(tutor => (
            <div key={tutor.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-1">{tutor.name}</h3>
                <p className="text-brand-purple font-bold text-sm uppercase tracking-wider mb-4">{tutor.role}</p>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {tutor.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
