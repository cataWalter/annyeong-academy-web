"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export default function Impressum() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">Impressum</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p><strong>Company Name:</strong> Annyeong Academy Ltd.</p>
            <p><strong>Address:</strong> 123 Seoul Street, District 1, Budapest, Hungary</p>
            <p><strong>Tax Number:</strong> HU12345678</p>
            <p><strong>Email:</strong> info@annyeong-academy.com</p>
            <p><strong>Managing Director:</strong> Kim Min-su</p>
            <p className="mt-8 text-sm">
              Online Dispute Resolution website managed by the European Commission: 
              <a href="https://ec.europa.eu/consumers/odr" className="text-brand-purple ml-1">www.ec.europa.eu/consumers/odr</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
