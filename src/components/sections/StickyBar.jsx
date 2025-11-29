"use client";
import { useState, useEffect } from 'react'

export default function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between animate-slide-up">
      <div className="text-sm font-bold text-brand-dark">
        Free Korean Trial + <br/> AI Translation
      </div>
      <button 
        onClick={scrollToForm}
        className="btn btn-plum-gradient px-6 py-2 text-sm"
      >
        Sign Up
      </button>
    </div>
  )
}
