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
    className={`shrink-0 pointer-events-none ${
      delay ? 'animate-sparkle-2' : 'animate-sparkle-1'
    } ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

const Navbar = ({ lang, setLang, onOpenPolicy }) => {
  const isHindi = lang === 'hi';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang] || translations.hi;

  // Lock body scroll when mobile hamburger is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-[11px] sm:text-xs font-black py-1 px-4 text-center tracking-widest shadow-sm flex items-center justify-center gap-2">
        <span className="font-serif uppercase tracking-wider">{t.ganeshaMantra}</span>
      </div>

      {/* Main Clean Header */}
      <header className={`transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-2.5 shadow-md border-b border-slate-100' : 'bg-white py-3 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ======================================================== */}
          {/* 💻 DESKTOP NAVBAR (hidden lg:flex): Left Logo, Right Links */}
          {/* ======================================================== */}
          <div className="hidden lg:flex items-center justify-between w-full">
            
            {/* Left: Brand Logo with Sparkling Stars */}
            <div className="flex items-center">
              <a
                href="#"
                className="relative inline-flex items-center group py-0.5"
                title="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
              >
                {/* ✨ Sparkling 4-point Stars around Logo */}
                <SparkleStar
                  size={13}
                  className="text-amber-400 absolute -top-1.5 left-[26%] z-20 pointer-events-none"
                  delay
                />
                <SparkleStar
                  size={12}
                  className="text-yellow-400 absolute top-1/2 -translate-y-1/2 -left-2.5 z-20 pointer-events-none"
                />
                <SparkleStar
                  size={14}
                  className="text-amber-400 absolute -top-1.5 right-0 z-20 pointer-events-none"
                />
                <SparkleStar
                  size={11}
                  className="text-yellow-400 absolute -bottom-1 right-2 z-20 pointer-events-none"
                  delay
                />

                {/* 🌟 Continuous Sharp Lens Light Sweep Container */}
                <div className="logo-sharplens relative rounded-xl px-1 py-0.5 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/images/logo.png?v=5"
                    alt="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
                    width="220"
                    height="52"
                    fetchPriority="high"
                    decoding="async"
                    className="h-11 xl:h-12 w-auto max-w-[230px] xl:max-w-[270px] object-contain select-none "
                  />
                </div>
              </a>
            </div>

            {/* Right: All Navigation Links + Language Switcher */}
            <nav className="flex items-center space-x-5 xl:space-x-7 text-sm font-bold text-slate-700">
              <a href="#hero" className="hover:text-orange-600 transition-colors">{t.navHome}</a>
              <a href="#services" className="hover:text-orange-600 transition-colors">{isHindi ? 'हमारी सेवाएँ' : 'Services'}</a>
              <a href="#destinations" className="hover:text-orange-600 transition-colors">{t.navDestinations}</a>
              <a href="#vehicles" className="hover:text-orange-600 transition-colors flex items-center gap-1.5">
                <Car className="w-4 h-4 text-orange-500" />
                {t.navVehicles}
              </a>
              <a href="#why" className="hover:text-orange-600 transition-colors">{isHindi ? 'सुविधाएं' : 'Why Us'}</a>
              <a href="#faq" className="hover:text-orange-600 transition-colors">{isHindi ? 'सवाल-जवाब' : 'FAQ'}</a>
              <a href="#book" className="hover:text-orange-600 transition-colors text-orange-600 font-extrabold">{isHindi ? 'बुकिंग पूछताछ' : 'Booking'}</a>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-extrabold ml-1">
                <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    lang === 'hi'
                      ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    lang === 'en'
                      ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
              </div>
            </nav>

          </div>

          {/* ======================================================== */}
          {/* 📱 MOBILE NAVBAR (flex lg:hidden): Exact Same As Before  */}
          {/* ======================================================== */}
          <div className="flex lg:hidden items-center justify-between">
            {/* 1. Mobile Left: Location Pill */}
            <div className="w-12 flex items-center justify-start">
              <span className="text-[11px] font-extrabold text-orange-900 bg-orange-100 border border-orange-300 px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                इंदौर
              </span>
            </div>

            {/* 2. Mobile Center: Brand Logo with Sparkle */}
            <div className="flex-1 flex items-center justify-center px-1">
              <a
                href="#"
                className="relative inline-flex items-center justify-center group py-0.5"
                title="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
              >
                <SparkleStar
                  size={13}
                  className="text-amber-400 absolute -top-1.5 left-[25%] sm:left-[26%] z-20 pointer-events-none"
                  delay
                />
                <SparkleStar
                  size={12}
                  className="text-yellow-400 absolute top-1/2 -translate-y-1/2 -left-2.5 z-20 pointer-events-none"
                />
                <SparkleStar
                  size={14}
                  className="text-amber-400 absolute -top-1.5 right-0 z-20 pointer-events-none"
                />
                <div className="logo-sharplens relative rounded-xl px-1 py-0.5 overflow-hidden">
                  <img
                    src="/images/logo.png?v=5"
                    alt="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
                    width="220"
                    height="52"
                    fetchPriority="high"
                    decoding="async"
                    className="h-10 sm:h-11 w-auto max-w-[195px] sm:max-w-[230px] object-contain select-none "
                  />
                </div>
              </a>
            </div>

            {/* 3. Mobile Right: Menu Toggle Button */}
            <div className="w-12 flex items-center justify-end">
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

        {/* Full Screen Mobile Menu Page */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col justify-between text-left overflow-y-auto">
            {/* Top Bar inside Full Screen Menu */}
            <div>
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-[11px] font-extrabold py-1 px-4 text-center tracking-widest flex items-center justify-center gap-2">
                <span className="font-serif uppercase">{t.ganeshaMantra}</span>
              </div>

              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-orange-900 bg-orange-100 border border-orange-300 px-2 py-0.5 rounded-full shadow-xs">
                  इंदौर
                </span>

                <div className="relative inline-flex items-center">
                  <SparkleStar size={11} className="text-amber-400 absolute -top-1 left-[26%] z-20 pointer-events-none" delay />
                  <SparkleStar size={12} className="text-yellow-400 absolute -top-1.5 -right-1 z-20 pointer-events-none" />
                  <div className="logo-sharplens relative rounded-xl px-1 py-0.5 overflow-hidden">
                    <img
                      src="/images/logo.png?v=5"
                      alt="विंध्याचल ट्रेवल्स (Vindhya Travels)"
                      className="h-11 w-auto max-w-[190px] object-contain"
                      width="170"
                      height="42"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-header with Language Switcher */}
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  {isHindi ? 'मेन्यू नेविगेशन' : 'Menu Navigation'}
                </span>
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 text-xs font-extrabold shadow-sm">
                  <button
                    onClick={() => setLang('hi')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      lang === 'hi' ? 'bg-orange-500 text-white font-extrabold shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      lang === 'en' ? 'bg-orange-500 text-white font-extrabold shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-5 space-y-1.5 text-base font-bold text-slate-800">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{t.navHome}</span>
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{isHindi ? 'हमारी सेवाएँ' : 'Services'}</span>
                </a>
                <a
                  href="#destinations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{t.navDestinations}</span>
                </a>
                <a
                  href="#vehicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 text-orange-600 bg-orange-50/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-orange-500" />
                    {t.navVehicles}
                  </span>
                </a>
                <a
                  href="#why"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{isHindi ? 'सुविधाएं' : 'Why Us'}</span>
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{isHindi ? 'सवाल-जवाब' : 'FAQ'}</span>
                </a>
                <a
                  href="#book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{isHindi ? 'बुकिंग पूछताछ' : 'Booking'}</span>
                </a>
              </nav>

              {/* Policies & Terms in Mobile Menu */}
              <div className="px-5 py-3 mx-4 my-2 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2.5">
                  {isHindi ? 'नीतियां एवं कानूनी शर्तें' : 'Legal & Policies'}
                </p>
                <div className="flex flex-col space-y-2 text-xs font-bold text-slate-700">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPolicy?.('privacy');
                    }}
                    className="flex items-center gap-2 hover:text-orange-600 text-left cursor-pointer py-1"
                  >
                    <span>🔒</span>
                    <span>{isHindi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPolicy?.('terms');
                    }}
                    className="flex items-center gap-2 hover:text-orange-600 text-left cursor-pointer py-1"
                  >
                    <span>📜</span>
                    <span>{isHindi ? 'नियम एवं शर्तें (Terms & Conditions)' : 'Terms & Conditions'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPolicy?.('cancellation');
                    }}
                    className="flex items-center gap-2 hover:text-orange-600 text-left cursor-pointer py-1"
                  >
                    <span>🔄</span>
                    <span>{isHindi ? 'रद्दीकरण व रिफंड नीति' : 'Refund Policy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Full Screen Menu */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3 pb-[calc(20px+env(safe-area-inset-bottom,0px))]">
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 text-sm font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center uppercase tracking-wider cursor-pointer"
              >
                {t.navBookNow}
              </a>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <a
                  href="tel:+919685232340"
                  className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>📞 {isHindi ? 'कॉल करें' : 'Call'}</span>
                </a>
                <a
                  href="https://wa.me/919685232340"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
