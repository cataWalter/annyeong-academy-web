"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export default function GiveawayRules() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">Giveaway Rules</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed space-y-4">
            <h3 className="text-xl font-bold text-gray-800">1. Eligibility</h3>
            <p>The giveaway is open to residents of Hungary aged 18 years or over.</p>
            
            <h3 className="text-xl font-bold text-gray-800">2. How to Enter</h3>
            <p>Attend the live webinar on December 14th and complete the post-event feedback form.</p>
            
            <h3 className="text-xl font-bold text-gray-800">3. The Prize</h3>
            <p>One winner will receive a 1-month Premium Subscription to Annyeong Academy.</p>
            
            <h3 className="text-xl font-bold text-gray-800">4. Winner Selection</h3>
            <p>The winner will be chosen at random from all eligible entries within 48 hours of the event.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
