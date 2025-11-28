"use client";
import Section from '../ui/Section'

export default function FAQ() {
  const items = [
    {
      q: "Do I need to install anything on my computer?",
      a: "Not necessarily, the system works from a browser, but we help with everything regarding the connection!"
    },
    {
      q: "Does the translation really work?",
      a: "Yes! Come and test it yourself. That’s exactly why we are holding this trial class, so you can see: you can do this too."
    },
    {
      q: "Am I too old/young for this?",
      a: "The love for Korean culture has no age limit. Our groups are inclusive, and the technology helps everyone."
    }
  ];

  return (
    <Section className="bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">FAQ</h2>
        
        <div className="space-y-4">
          {items.map((item, i) => (
            <details key={i} className="group bg-gray-50 p-6 rounded-2xl shadow-sm cursor-pointer open:ring-2 open:ring-brand-purple/20 transition">
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
    </Section>
  )
}
