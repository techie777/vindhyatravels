import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, MapPin, CheckCircle, ArrowRight, Sparkles, Phone, MessageCircle, ShieldCheck, Newspaper, Navigation, Video } from 'lucide-react';

const DestinationModal = ({ destination, onClose, onSelectBooking, currency, lang }) => {
  if (!destination) return null;
  const isHindi = lang === 'hi';

  // Handle escape key & lock body scroll so page doesn't scroll behind modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Floating prominent close button on top-right (Always visible on top of everything) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialogue"
          className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[100000] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl border-2 border-white/40 backdrop-blur-md transition-all active:scale-95 group cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[88vh] sm:max-h-[90vh] flex flex-col text-left"
        >
          {/* Card Top Right Inner Cross Button */}
          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center shadow-lg border border-white/40 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-44 sm:h-60 w-full overflow-hidden shrink-0 bg-slate-900">
            <img
              src={destination.image}
              alt={`${destination.title} यात्रा दर्शन - विंध्याचल ट्रेवल्स`}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/destinations/varanasi.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-3 left-4 right-14 sm:bottom-4 sm:left-6 sm:right-16 text-white">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-sky-600 text-white shadow-sm">
                  {destination.category === 'MP' ? (isHindi ? 'मध्य प्रदेश दर्शनीय स्थल' : 'Madhya Pradesh Circuit') : (isHindi ? 'भारत का पवित्र धाम' : 'India Pilgrimage')}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-white/95 text-amber-600 border border-amber-200 shadow-sm backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {destination.rating} ({destination.reviewsCount} {isHindi ? 'समीक्षाएं' : 'reviews'})
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-white drop-shadow-md leading-snug">
                {isHindi ? destination.title : (destination.titleEn || destination.title)}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-slate-200 text-xs sm:text-sm mt-1.5 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" /> {destination.location || 'India'}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" /> {isHindi ? destination.duration : (destination.durationEn || destination.duration)}</span>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-slate-700 text-sm sm:text-base">
            
            {/* About Package */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>{isHindi ? 'इस पैकेज के बारे में (About Package)' : 'About Package'}</span>
              </h3>
              <p className="leading-relaxed text-slate-600 font-normal text-sm sm:text-base">
                {isHindi ? destination.description : (destination.descriptionEn || destination.description)}
              </p>
            </div>

            {/* Highlights Grid */}
            {destination.highlights && destination.highlights.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isHindi ? 'मुख्य दर्शन एवं आकर्षण स्थल' : 'Key Itinerary Highlights'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destination.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-sky-50/70 p-2.5 rounded-xl border border-sky-100">
                      <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-xs sm:text-sm font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicle Facilities Included */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                {isHindi ? 'शामिल वाहन सुरक्षा एवं सुविधाएं' : 'Included Vehicle Facilities'}
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center sm:text-left">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <Newspaper className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{isHindi ? 'मुफ्त समाचार पत्र' : 'Free Newspaper'}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <Navigation className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{isHindi ? 'GPS ट्रैकिंग' : 'GPS Tracking'}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <Video className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{isHindi ? 'डैशकैम कैमरा' : 'Dashcam Safety'}</span>
                </div>
              </div>
            </div>

            {/* Inclusions */}
            {destination.inclusions && destination.inclusions.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isHindi ? 'पैकेज में शामिल सुविधाएं' : 'Package Inclusions'}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {destination.inclusions.map((inc, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      ✓ {inc}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Action Buttons */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isHindi ? 'बंद करें' : 'Close'}</span>
              </button>

              <a
                href="tel:+919685232340"
                className="px-3.5 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-950 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{isHindi ? 'कॉल करें' : 'Call'}</span>
              </a>

              <a
                href={`https://wa.me/919685232340?text=Hi,%20I%20want%20information%20about%20${encodeURIComponent(destination.title)}%20package`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isHindi ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectBooking(destination);
              }}
              className="btn-shimmer flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isHindi ? 'अभी बुक / पूछताछ करें' : 'Book / Enquire'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};

export default DestinationModal;
