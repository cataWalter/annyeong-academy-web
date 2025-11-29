"use client";
import { useState, useEffect } from 'react'
import Section from '../ui/Section'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`December 14, ${currentYear} 11:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-brand-dark text-white py-8 px-4 text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-teal mb-1">Don't miss out!</p>
          <p className="text-xl font-medium">The trial class starts in:</p>
        </div>
        
        <div className="flex gap-4 text-center">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3 min-w-[70px] backdrop-blur-sm">
              <span className="block text-2xl font-bold font-mono">{item.value}</span>
              <span className="text-xs text-gray-400 uppercase">{item.label}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={scrollToForm}
          className="btn btn-plum-gradient"
        >
          Reserve my spot now!
        </button>
      </div>
    </section>
  )
}
