import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Car } from 'lucide-react';
import { translations } from '../utils/translations';

// Sparkling 4-point Star Component
const SparkleStar = ({ size = 14, className = 'text-yellow-400', delay = false, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className={`shrink-0 pointer-events-none drop-shadow-[0_0_6px_rgba(245,158,11,0.9)] ${
      delay ? 'animate-sparkle-2' : 'animate-sparkle-1'
    } ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

const Navbar = ({ lang, setLang }) => {
  const isHindi = lang === 'hi';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang] || translations.hi;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      
      {/* Top Sanskrit Mantra Bar - Shree Ganeshay Namah */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-[11px] font-extrabold py-1 px-4 text-center tracking-widest shadow-sm flex items-center justify-center gap-2">
        {/* Golden Ganesha Emblem SVG */}
        <svg className="w-4 h-4 text-yellow-200 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className="font-serif uppercase">{t.ganeshaMantra}</span>
        <svg className="w-4 h-4 text-yellow-200 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </div>

      {/* Main Clean Header */}
      <header className={`transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-2.5 shadow-md border-b border-slate-100' : 'bg-white py-3 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* 1. Mobile Left: Subtle Location Pill for Perfect Visual Balance */}
            <div className="lg:hidden w-12 flex items-center justify-start">
              <span className="text-[11px] font-bold text-orange-700 bg-orange-100/80 border border-orange-200/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                इंदौर
              </span>
            </div>

            {/* 2. Desktop Left Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-bold text-slate-700 flex-1 justify-start">
              <a href="#hero" className="hover:text-orange-600 transition-colors">{t.navHome}</a>
              <a href="#destinations" className="hover:text-orange-600 transition-colors">{t.navDestinations}</a>
              <a href="#vehicles" className="hover:text-orange-600 transition-colors flex items-center gap-1.5">
                <Car className="w-4 h-4 text-orange-500" />
                {t.navVehicles}
              </a>
            </nav>

            {/* 3. Center: Brand Logo with Sparkling Stars & Sharp Lens Sweep (Centered on both Mobile & Desktop) */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center px-1 sm:px-2">
              <a
                href="#"
                className="relative inline-flex items-center justify-center group py-0.5"
                title="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
              >
                {/* ✨ Sparkling 4-point Stars around Logo */}
                {/* Star 1: Over the Sacred Temple Shikhara / Peak */}
                <SparkleStar
                  size={13}
                  className="text-amber-400 absolute -top-1.5 left-[19%] sm:left-[21%] z-20 pointer-events-none"
                  delay
                />

                {/* Star 2: Left Flank near Holy Eye Wing */}
                <SparkleStar
                  size={12}
                  className="text-yellow-400 absolute top-1/2 -translate-y-1/2 -left-2.5 sm:-left-3.5 z-20 pointer-events-none"
                />

                {/* Star 3: Top-Right above Vindhya Typography */}
                <SparkleStar
                  size={14}
                  className="text-amber-400 absolute -top-1.5 right-0 sm:-right-1.5 z-20 pointer-events-none"
                />

                {/* Star 4: Bottom-Right under Travels Typography */}
                <SparkleStar
                  size={11}
                  className="text-yellow-400 absolute -bottom-1 right-2 sm:right-3 z-20 pointer-events-none"
                  delay
                />

                {/* Star 5: Lower Left near Eye Base */}
                <SparkleStar
                  size={10}
                  className="text-orange-400 absolute -bottom-1 left-[14%] z-20 pointer-events-none"
                />

                {/* 🌟 Continuous Sharp Lens Light Sweep Container */}
                <div className="logo-sharplens relative rounded-xl px-1 py-0.5 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/images/logo.png?v=3"
                    alt="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
                    width="220"
                    height="52"
                    fetchPriority="high"
                    decoding="async"
                    className="h-10 sm:h-11 md:h-12 lg:h-[52px] w-auto max-w-[190px] sm:max-w-[230px] md:max-w-[270px] object-contain select-none drop-shadow-[0_2px_8px_rgba(249,115,22,0.12)]"
                  />
                </div>
              </a>
            </div>

            {/* 4. Desktop Right Navigation Links + Language Switcher (Call CTA Removed from Header) */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-bold text-slate-700 flex-1 justify-end">
              <a href="#why" className="hover:text-orange-600 transition-colors">{isHindi ? 'सुविधाएं' : 'Why Us'}</a>
              <a href="#faq" className="hover:text-orange-600 transition-colors">{isHindi ? 'सवाल-जवाब' : 'FAQ'}</a>
              <a href="#book" className="hover:text-orange-600 transition-colors text-orange-600 font-extrabold">{isHindi ? 'बुकिंग पूछताछ' : 'Booking'}</a>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-extrabold ml-1">
                <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    lang === 'hi'
                      ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    lang === 'en'
                      ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* 5. Mobile Right: Menu Toggle Button Only (Call Button Removed) */}
            <div className="lg:hidden w-12 flex items-center justify-end">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-700 hover:text-orange-600 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 mt-2 space-y-4 shadow-xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="relative inline-flex items-center">
                <SparkleStar size={11} className="text-amber-400 absolute -top-1 left-[20%] z-20 pointer-events-none" delay />
                <SparkleStar size={12} className="text-yellow-400 absolute -top-1.5 -right-1 z-20 pointer-events-none" />
                <div className="logo-sharplens relative rounded-xl px-1 py-0.5 overflow-hidden">
                  <img
                    src="/images/logo.png?v=3"
                    alt="विंध्याचल ट्रेवल्स (Vindhya Travels)"
                    className="h-10 w-auto max-w-[180px] object-contain"
                    width="180"
                    height="45"
                  />
                </div>
              </div>
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-extrabold">
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    lang === 'hi' ? 'bg-orange-500 text-white font-extrabold shadow-sm' : 'text-slate-600'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    lang === 'en' ? 'bg-orange-500 text-white font-extrabold shadow-sm' : 'text-slate-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <nav className="flex flex-col space-y-3 font-bold text-slate-700">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>{t.navHome}</a>
              <a href="#destinations" onClick={() => setMobileMenuOpen(false)}>{t.navDestinations}</a>
              <a href="#vehicles" onClick={() => setMobileMenuOpen(false)} className="text-sky-700 flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-500" /> {t.navVehicles}
              </a>
              <a href="#why" onClick={() => setMobileMenuOpen(false)}>{isHindi ? 'सुविधाएं' : 'Why Us'}</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>{isHindi ? 'सवाल-जवाब' : 'FAQ'}</a>
              <a href="#book" onClick={() => setMobileMenuOpen(false)}>{isHindi ? 'बुकिंग पूछताछ' : 'Booking'}</a>
            </nav>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1 rounded-lg ${lang === 'hi' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-lg ${lang === 'en' ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
                >
                  English
                </button>
              </div>
              
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-black bg-orange-500 text-white rounded-xl"
              >
                {t.navBookNow}
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
