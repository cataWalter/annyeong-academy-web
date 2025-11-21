import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">Terms and Conditions</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4">Welcome to Annyeong Academy. By using our site and services, you agree to the following terms.</p>
            
            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">1. Registration and Account</h3>
            <p>To access courses, you must create an account. You are responsible for the confidentiality of your password and all activities that occur under your account.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">2. Intellectual Property</h3>
            <p>All content (video, PDF, audio) is the exclusive property of Annyeong Academy. Copying, distributing, or sharing access credentials is prohibited.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">3. Refunds</h3>
            <p>We offer a refund guarantee within 14 days of course purchase, provided that no more than 20% of the content has been viewed.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">4. Conduct</h3>
            <p>Respectful behavior is required during live lessons and in comments. We reserve the right to suspend the account in case of harassment or inappropriate language.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">5. Changes</h3>
            <p>We reserve the right to modify these terms at any time. Changes will be effective upon posting on the site.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
