import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = ({ lang }) => {
  const [visible, setVisible] = useState(false);
  const isHindi = lang === 'hi';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      if (scrollPos > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    // 1. Primary Smooth Scroll to Hero / Top
    const heroElem = document.getElementById('hero') || document.querySelector('header') || document.body;
    if (heroElem && typeof heroElem.scrollIntoView === 'function') {
      try {
        heroElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (_) {}
    }

    // 2. Window Smooth Scroll
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (_) {
      window.scrollTo(0, 0);
    }

    // 3. Fallback: Ensure top is reached even if browser smooth scrolling gets blocked/stuck
    setTimeout(() => {
      const pos = window.scrollY || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      if (pos > 50) {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }
    }, 280);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          onTouchEnd={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[999] w-12 h-12 rounded-full bg-slate-900/95 hover:bg-orange-600 text-white border-2 border-orange-500 shadow-2xl shadow-orange-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group backdrop-blur-md cursor-pointer select-none pointer-events-auto"
          title={isHindi ? 'ऊपर जाएं (Go to Top)' : 'Scroll to top'}
          aria-label={isHindi ? 'ऊपर जाएं' : 'Scroll to top'}
        >
          <ChevronUp className="w-6 h-6 stroke-[3] text-orange-400 group-hover:text-white group-hover:-translate-y-1 transition-all pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
