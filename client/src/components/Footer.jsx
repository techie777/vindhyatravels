import React from 'react';
import { Compass, Send, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';
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

const Footer = ({ lang }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 relative z-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="relative inline-block group bg-white px-3.5 py-2 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300" title="विंध्याचल ट्रेवल्स (Vindhya Travels)">
              <SparkleStar size={12} className="text-amber-400 absolute -top-1.5 left-[22%] z-20 pointer-events-none" delay />
              <SparkleStar size={13} className="text-yellow-400 absolute -top-1.5 right-1 z-20 pointer-events-none" />
              <div className="logo-sharplens relative rounded-xl overflow-hidden">
                <img
                  src="/images/logo.png?v=3"
                  alt="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
                  width="190"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  className="h-10 sm:h-11 w-auto max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-sm">
              {t.footAbout}
            </p>

            {/* Direct Contact Details in Footer */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{isHindi ? 'रोबोट चौराहा, इंदौर, मध्य प्रदेश 452010' : 'Robot square, Indore, MP 452010'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+919685232340" className="hover:text-orange-400 transition-colors font-bold">+91 96852 32340</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:booking@vindhyatravels.com" className="hover:text-orange-400 transition-colors">booking@vindhyatravels.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4 font-serif">{t.footNav}</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-400">
              <li><a href="#hero" className="hover:text-orange-400 transition-colors">{t.navHome}</a></li>
              <li><a href="#destinations" className="hover:text-orange-400 transition-colors">{t.navDestinations}</a></li>
              <li><a href="#vehicles" className="hover:text-orange-400 transition-colors">{t.navVehicles}</a></li>
              <li><a href="#why" className="hover:text-orange-400 transition-colors">{isHindi ? 'सुविधाएं' : 'Why Us'}</a></li>
              <li><a href="#faq" className="hover:text-orange-400 transition-colors">{isHindi ? 'सवाल-जवाब' : 'FAQ'}</a></li>
              <li><a href="#book" className="hover:text-orange-400 transition-colors">{isHindi ? 'बुकिंग पूछताछ' : 'Booking'}</a></li>
            </ul>
          </div>

          {/* Top MP Destinations */}
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4 font-serif">{t.footDest}</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-400">
              <li>{t.footKanha}</li>
              <li>{t.footKhajuraho}</li>
              <li>{t.footPachmarhi}</li>
              <li>{t.footUjjain}</li>
              <li>{t.footGwalior}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white mb-4 font-serif">{t.footNewsletter}</h4>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="email@domain.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 pr-9 focus:outline-none focus:border-orange-500"
                />
                <button type="submit" className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium">
          <p className="flex items-center gap-2">
            <span>{t.footCopy}</span>
            <span className="mx-1">•</span>
            {/* Separate /admin slug route link */}
            <a href="/admin" className="hover:text-orange-400 transition-colors flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal (/admin)
            </a>
          </p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for travelers worldwide.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
