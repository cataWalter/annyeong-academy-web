import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Our Mission</h1>
          <p className="text-xl text-gray-600">
            Making the Korean language accessible to everyone, breaking down the English barrier.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src="https://placehold.co/600x400/6a11cb/ffffff?text=Team+Annyeong" className="rounded-3xl shadow-xl" alt="Team" />
          <div className="space-y-6 text-gray-700">
            <h2 className="text-2xl font-bold text-brand-purple">Who We Are</h2>
            <p>
              Annyeong Academy was born from the idea of a group of native Korean teachers and passionate students.
              We realized that most online courses require knowing English to learn Korean.
            </p>
            <p>
              We decided to change things. Using advanced AI technology and proprietary teaching materials,
              we offer a direct learning experience from Korean to your native language.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
