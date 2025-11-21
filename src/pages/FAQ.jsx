import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function FAQ() {
  const faqs = [
    {
      q: "How do Live courses work?",
      a: "Live courses take place on Zoom at scheduled times. You will receive the link via email. If you miss a lesson, you can watch the recording in the student area within 24 hours."
    },
    {
      q: "Can I download the videos?",
      a: "For copyright reasons, videos are only available for streaming on our platform. PDF and Audio materials are downloadable."
    },
    {
      q: "Do you issue a certificate?",
      a: "Yes, upon completing at least 80% of a course's lessons, you will receive a digital certificate of attendance signed by the teacher."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards via Stripe. It's the safest and fastest method."
    },
    {
      q: "Do I need to buy textbooks separately?",
      a: "No. All teaching material (PDFs, workbooks) is included in the course price and created internally by Annyeong Academy."
    }
  ]

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC] min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to know before starting.
          </p>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <details key={i} className="group bg-white p-6 rounded-2xl shadow-sm cursor-pointer open:ring-2 open:ring-brand-purple/20 transition">
                <summary className="font-bold text-lg text-brand-dark list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-brand-purple group-open:rotate-180 transition text-2xl">▼</span>
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
