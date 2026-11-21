import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sparkling 4-point Star Component
const SparkleStar = ({ size = 14, className = 'text-amber-400', delay = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`shrink-0 pointer-events-none ${
      delay ? 'animate-sparkle-2' : 'animate-sparkle-1'
    } ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
  </svg>
);

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Failsafe timer: Dismisses splash within 1.3s
    const maxTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 300);
    }, 1300);

    // Fast, smooth progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearTimeout(maxTimer);
          setIsExiting(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        return Math.min(100, prev + 25);
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimer);
    };
  }, [onFinish]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white overflow-hidden select-none px-6 cursor-pointer"
        >
          {/* Subtle warm center glow */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-orange-100/60 to-amber-100/40 blur-3xl pointer-events-none" />

          {/* Center Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center max-w-sm sm:max-w-md w-full"
          >
            {/* Top Ganesha Blessing */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs sm:text-sm font-black font-serif shadow-xs">
              <span>॥ श्री गणेशाय नमः ॥</span>
            </div>

            {/* Centered Brand Logo */}
            <div className="relative inline-flex items-center justify-center my-1">
              <SparkleStar size={14} className="text-amber-400 absolute -top-2 left-[26%] z-20 pointer-events-none" delay />
              <SparkleStar size={13} className="text-yellow-400 absolute top-1/2 -translate-y-1/2 -left-3 z-20 pointer-events-none" />
              <SparkleStar size={14} className="text-amber-400 absolute -top-1.5 right-0 z-20 pointer-events-none" />
              <SparkleStar size={11} className="text-yellow-400 absolute -bottom-1 right-3 z-20 pointer-events-none" delay />

              <div className="logo-sharplens relative rounded-2xl px-3 py-1 overflow-hidden">
                <img
                  src="/images/logo.png?v=5"
                  alt="विंध्याचल ट्रेवल्स (Vindhya Travels) इंदौर"
                  width="320"
                  height="76"
                  fetchPriority="high"
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[270px] sm:max-w-[340px] object-contain"
                />
              </div>
            </div>

            {/* Slogan directly below Logo */}
            <div className="mt-4 space-y-1">
              <p className="text-base sm:text-lg font-bold font-serif text-slate-900 tracking-wide">
                सपनों का सफ़र, अपनों के साथ
              </p>
              <p className="text-xs sm:text-sm font-semibold text-orange-600">
                शुभ यात्रा, सुखद अनुभूति • इंदौर
              </p>
            </div>

            {/* Sleek Minimal Progress Line */}
            <div className="mt-7 w-48 sm:w-56 h-1 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeInOut' }}
              />
            </div>

            <p className="mt-2 text-[11px] text-slate-400 font-medium">
              लोड हो रहा है...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
