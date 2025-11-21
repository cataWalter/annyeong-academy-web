import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">Privacy Policy</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4"><strong>Last updated:</strong> November 21, 2025</p>
            
            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">1. Data Controller</h3>
            <p>Annyeong Academy is the controller of personal data collected through this website.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">2. Collected Data</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Voluntarily provided data: Name, Surname, Email (via registration forms).</li>
              <li>Navigation data: IP address, browser type (collected automatically for statistical purposes).</li>
            </ul>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">3. Purpose of Processing</h3>
            <p>Data is collected to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Send the Zoom access link for the Webinar.</li>
              <li>Provide access to the LMS platform and purchased courses.</li>
              <li>Send service communications or teaching materials.</li>
            </ul>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">4. Data Sharing</h3>
            <p>We do not sell or transfer your data to third parties. Data may be processed by technical service providers (e.g., Supabase for database, Stripe for payments) acting as data processors.</p>

            <h3 className="text-xl font-bold text-brand-dark mt-6 mb-2">5. Your Rights</h3>
            <p>You have the right to access, rectify, or delete your data at any time. To exercise these rights, contact us at <strong>privacy@annyeong-academy.com</strong>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
