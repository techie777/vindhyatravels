import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

// Sparkling 4-point Star Component
const SparkleStar = ({ size = 14, className = 'text-yellow-200', delay = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`shrink-0 pointer-events-none drop-shadow-[0_0_6px_rgba(255,255,255,0.95)] ${
      delay ? 'animate-sparkle-2' : 'animate-sparkle-1'
    } ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

const FloatingCTA = ({ lang }) => {
  const isHindi = lang === 'hi';

  return (
    <>
      {/* 📱 1. Mobile Fixed Bottom Action Bar with Sharp Lens Light Effect & Sparkling Stars */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] flex items-center gap-2.5 shadow-2xl">
        {/* Call Now Button */}
        <a
          href="tel:+919685232340"
          className="btn-sharplens relative flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-[#ff5e00] via-[#f97316] to-[#ea580c] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/35 border border-amber-300/40 active:scale-95 transition-all overflow-hidden"
          title="कॉल करें"
        >
          <SparkleStar size={13} className="text-yellow-200" />
          <Phone className="w-4 h-4 stroke-[2.8] text-white shrink-0" />
          <span className="font-black tracking-wide drop-shadow-sm">
            {isHindi ? 'कॉल करें' : 'Call Now'}
          </span>
          <SparkleStar size={11} className="text-amber-200" delay />
        </a>

        {/* WhatsApp Button (Light Sharp Green + Continuous Sharp Lens Sweep + Sparkling Stars) */}
        <a
          href="https://wa.me/919685232340?text=नमस्ते%20विंध्याचल%20ट्रेवल्स,%20मुझे%20इंदौर%20से%20गाड़ी%20बुक%20करनी%20है।"
          target="_blank"
          rel="noreferrer"
          className="btn-sharplens relative flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-[#25D366] via-[#22c55e] to-[#10b981] hover:brightness-105 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/35 border border-green-200/50 active:scale-95 transition-all overflow-hidden"
          title="WhatsApp पर बात करें"
        >
          <SparkleStar size={13} className="text-yellow-200" delay />
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366] shrink-0" />
          <span className="font-black tracking-wide drop-shadow-sm">WHATSAPP</span>
          <SparkleStar size={11} className="text-amber-200" />
        </a>
      </div>

      {/* 💻 2. Desktop Floating Widgets (Screen >= 768px) with Sharp Lens Effect & Sparkling Stars */}
      <div className="hidden md:flex fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/919685232340?text=नमस्ते%20विंध्याचल%20ट्रेवल्स,%20मुझे%20कार%20किराया%20और%20टूर%20पैकेज%20की%20जानकारी%20चाहिए"
          target="_blank"
          rel="noreferrer"
          className="btn-sharplens group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] via-[#22c55e] to-[#10b981] hover:brightness-105 text-white font-extrabold text-sm shadow-2xl shadow-emerald-500/35 hover:scale-105 transition-all duration-300 border-2 border-white/90"
          title="WhatsApp पर बात करें"
        >
          <SparkleStar size={14} className="text-yellow-200" />
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping" />
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          </div>
          <span>{isHindi ? 'WhatsApp पर बात करें' : 'Chat on WhatsApp'}</span>
          <SparkleStar size={12} className="text-amber-200" delay />
        </a>
      </div>

      <div className="hidden md:flex fixed bottom-6 right-6 z-40">
        <a
          href="tel:+919685232340"
          className="btn-sharplens group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#ff5e00] via-[#f97316] to-[#ea580c] text-white font-extrabold text-sm uppercase tracking-wider shadow-2xl shadow-orange-500/40 hover:scale-105 transition-all duration-300 border-2 border-white/90"
          title="कॉल करें"
        >
          <SparkleStar size={14} className="text-yellow-200" />
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
            <Phone className="w-4 h-4 stroke-[3] animate-bounce" />
          </div>
          <span>{isHindi ? 'अभी कॉल करें: 96852 32340' : 'Call Now: 96852 32340'}</span>
          <SparkleStar size={12} className="text-amber-200" delay />
        </a>
      </div>
    </>
  );
};

export default FloatingCTA;
