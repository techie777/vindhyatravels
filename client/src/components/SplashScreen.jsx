import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, MapPin } from 'lucide-react';

// Sparkling 4-point Star Component
const SparkleStar = ({ size = 16, className = 'text-amber-400', delay = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`shrink-0 pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.95)] ${
      delay ? 'animate-sparkle-2' : 'animate-sparkle-1'
    } ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(10);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth progress animation over 1.7 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 500);
          }, 250);
          return 100;
        }
        // Accelerating progress increments
        const increment = prev < 50 ? 12 : prev < 85 ? 10 : 8;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#050C1B] via-[#0B152B] to-[#030712] overflow-hidden select-none px-4"
        >
          {/* 🌌 Ambient Divine Aura Backdrops */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* 🪔 1. Sacred Blessing Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-500/20 border border-amber-400/40 px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-bold tracking-wider"
          >
            <span className="text-amber-300">🚩</span>
            <span>॥ श्री गणेशाय नमः ॥ • शुभ यात्रा, सुखद अनुभूति</span>
            <span className="text-amber-300">🚩</span>
          </motion.div>

          {/* 💎 2. Center Glassmorphic Brand Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col items-center text-center"
          >
            {/* Sparkling Stars around Logo Container */}
            <div className="relative inline-flex items-center justify-center my-2">
              {/* Star 1: Over Sacred Peak */}
              <SparkleStar size={16} className="text-amber-400 absolute -top-2.5 left-[21%] z-20 pointer-events-none" delay />
              {/* Star 2: Left Eyelid */}
              <SparkleStar size={14} className="text-yellow-400 absolute top-1/2 -translate-y-1/2 -left-3.5 z-20 pointer-events-none" />
              {/* Star 3: Top Right above Travels */}
              <SparkleStar size={16} className="text-amber-400 absolute -top-2 -right-2 z-20 pointer-events-none" />
              {/* Star 4: Bottom Right */}
              <SparkleStar size={13} className="text-yellow-400 absolute -bottom-1.5 right-3 z-20 pointer-events-none" delay />

              {/* 🌟 Brand Logo with Continuous Light Sweep */}
              <div className="logo-sharplens relative rounded-2xl px-2 py-1 overflow-hidden">
                <img
                  src="/images/logo.png?v=3"
                  alt="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
                  width="280"
                  height="66"
                  fetchPriority="high"
                  className="h-14 sm:h-16 w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow-[0_2px_12px_rgba(249,115,22,0.2)]"
                />
              </div>
            </div>

            {/* City & Service Tagline */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold text-orange-600 bg-orange-50 border border-orange-200/80 px-3.5 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>इंदौर की विश्वसनीय AC टैक्सी सेवा</span>
            </div>

            {/* 3 Quick Highlights */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-bold text-slate-600">
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">🛕 उज्जैन महाकाल</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">🌊 ओंकारेश्वर</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">🚕 ₹12/किमी शुरू</span>
            </div>

            {/* 📊 3. Modern Sleek Progress Bar */}
            <div className="w-full mt-6 space-y-2">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full shadow-sm"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeInOut' }}
                />
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                  सफर की तैयारी हो रही है...
                </span>
                <span className="text-orange-600 font-extrabold">{progress}%</span>
              </div>
            </div>
          </motion.div>

          {/* ⚡ 4. Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            onClick={handleSkip}
            className="mt-6 text-xs text-slate-400 hover:text-white transition-all underline underline-offset-4 cursor-pointer py-1 px-3"
          >
            सीधे वेबसाइट पर जाएं (Skip) &rarr;
          </motion.button>

          {/* 🔒 Verified Trust Seal */}
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>24x7 सुरक्षित एवं सुगम यात्रा • विंध्याचल ट्रेवल्स</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
