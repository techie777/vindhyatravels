import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Users, 
  Wind, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  Info, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase,
  Send,
  Newspaper,
  Navigation,
  Video
} from 'lucide-react';
import { fetchVehicles, submitEnquiry } from '../services/api';
import { translations } from '../utils/translations';

const VEHICLE_IMAGES_MAP = {
  'Swift Dzire': '/images/cars/dzire.jpg',
  'Hyundai Aura': '/images/cars/aura.jpg',
  'Maruti Ertiga MUV': '/images/cars/ertiga.jpg',
  'Maruti Ertiga': '/images/cars/ertiga.jpg',
  'Toyota Innova Crysta': '/images/cars/innova.jpg',
  'Innova Crysta': '/images/cars/innova.jpg',
  'Force Tempo Traveler': '/images/cars/tempo.jpg',
  'Tempo Traveller': '/images/cars/tempo.jpg',
  'veh_dzire': '/images/cars/dzire.jpg',
  'veh_aura': '/images/cars/aura.jpg',
  'veh_ertiga': '/images/cars/ertiga.jpg',
  'veh_innova': '/images/cars/innova.jpg',
  'veh_traveler': '/images/cars/tempo.jpg'
};

const getVehicleImage = (veh) => {
  if (veh?.image && (veh.image.startsWith('/images/cars') || veh.image.startsWith('http'))) {
    return veh.image;
  }
  return VEHICLE_IMAGES_MAP[veh?.name] || VEHICLE_IMAGES_MAP[veh?._id] || '/images/cars/dzire.jpg';
};

// Clean & concise formatting helper so specs ALWAYS fit on 1 line
const formatVehicleSpecs = (veh, isHindi) => {
  // 1. Seats
  const rawSeats = (veh?.seats || '').trim();
  let seats = '';
  const rangeMatch = rawSeats.match(/(\d+)\s*[-–]\s*(\d+)/);
  const singleMatch = rawSeats.match(/(\d+)/);

  if (rangeMatch) {
    seats = `${rangeMatch[1]}-${rangeMatch[2]} ${isHindi ? 'सीटर' : 'Seats'}`;
  } else if (singleMatch) {
    const num = parseInt(singleMatch[1], 10);
    if (rawSeats.includes('+')) {
      seats = `${num}+1 ${isHindi ? 'सीटर' : 'Seats'}`;
    } else if (/driver/i.test(rawSeats) || num <= 7) {
      seats = `${num}+1 ${isHindi ? 'सीटर' : 'Seats'}`;
    } else {
      seats = `${num} ${isHindi ? 'सीटर' : 'Seats'}`;
    }
  } else {
    seats = isHindi ? '4+1 सीटर' : '4+1 Seats';
  }

  // 2. Luggage
  const rawLuggage = (veh?.luggage || '').trim();
  let luggage = '';
  const lugMatch = rawLuggage.match(/(\d+\s*[-–]\s*\d+|\d+\+|\d+)/);
  if (lugMatch) {
    luggage = `${lugMatch[1]} ${isHindi ? 'बैग' : 'Bags'}`;
  } else {
    luggage = isHindi ? '2 बैग' : '2 Bags';
  }

  return { seats, luggage };
};

const DEFAULT_VEHICLES = [
  { _id: 'veh_dzire', name: 'Swift Dzire', category: 'Sedan', ratePerKm: 12, seats: '4+1 सीटर', luggage: '2 बैग', popular: true, acType: 'Dual AC', image: '/images/cars/dzire.jpg' },
  { _id: 'veh_ertiga', name: 'Maruti Ertiga MUV', category: 'MUV/SUV', ratePerKm: 16, seats: '6+1 सीटर', luggage: '3-4 बैग', popular: true, acType: 'Dual AC', image: '/images/cars/ertiga.jpg' },
  { _id: 'veh_innova', name: 'Toyota Innova Crysta', category: 'MUV/SUV', ratePerKm: 20, seats: '7+1 सीटर', luggage: '4-5 बैग', popular: false, acType: 'Triple AC', image: '/images/cars/innova.jpg' },
  { _id: 'veh_aura', name: 'Hyundai Aura', category: 'Sedan', ratePerKm: 13, seats: '4+1 सीटर', luggage: '2 बैग', popular: false, acType: 'Dual AC', image: '/images/cars/aura.jpg' },
  { _id: 'veh_traveler', name: 'Force Tempo Traveler', category: 'Tempo', ratePerKm: 26, seats: '12–17 सीटर', luggage: '8-10 बैग', popular: false, acType: 'Powerful AC', image: '/images/cars/tempo.jpg' }
];

const Vehicles = ({ lang, currency, onSelectBooking }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [vehicles, setVehicles] = useState(DEFAULT_VEHICLES);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  // Selected vehicle for Information Dialogue Modal
  const [selectedVehicleModal, setSelectedVehicleModal] = useState(null);
  const [modalPhone, setModalPhone] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, [activeTab]);

  // Lock body scroll & handle escape key when vehicle modal is open
  useEffect(() => {
    if (selectedVehicleModal) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedVehicleModal(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedVehicleModal]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetchVehicles(activeTab);
      // Ensure authentic taxi images are mapped
      const mapped = (res.data || []).map(v => ({
        ...v,
        image: VEHICLE_IMAGES_MAP[v.name] || VEHICLE_IMAGES_MAP[v._id] || v.image || '/images/cars/dzire.jpg'
      }));
      setVehicles(mapped);
    } catch (err) {
      console.error('Error loading vehicle fleet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalPhone || modalPhone.length < 10) {
      alert(isHindi ? 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    setModalSubmitting(true);
    try {
      await submitEnquiry({
        name: modalName || (isHindi ? 'वेबसाइट ग्राहक' : 'Fleet Customer'),
        phone: modalPhone,
        email: 'fleetlead@vindhyatravels.com',
        destination: `Car Booking: ${selectedVehicleModal.name}`,
        travelersCount: 4,
        travelStyle: selectedVehicleModal.category,
        specialRequests: `Direct Fleet Booking Request for ${selectedVehicleModal.name} @ ₹${selectedVehicleModal.ratePerKm}/KM`,
        status: 'Pending'
      });
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
        setSelectedVehicleModal(null);
        setModalName('');
        setModalPhone('');
      }, 2500);
    } catch (err) {
      console.error(err);
      setModalSuccess(true);
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleQuickBook = (veh) => {
    if (onSelectBooking) {
      onSelectBooking({
        destination: `${veh.name} (${veh.category})`,
        price: veh.ratePerKm * 100 // baseline estimate or per-km reference
      });
    } else {
      setSelectedVehicleModal(veh);
    }
  };

  return (
    <section id="vehicles" className="py-14 sm:py-18 relative z-10 bg-slate-50">
      <span id="cars" className="relative -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Emotional & Clean */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs sm:text-sm font-bold mb-2.5">
            <Car className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>{isHindi ? 'हमारा बेड़ा' : 'OUR FLEET'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
            {t.vehTitlePrefix} <span className="text-gradient-coral">{t.vehTitleHighlight}</span>
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            {t.vehSubtitle}
          </p>
        </div>

        {/* Clean Category Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'All', label: t.vehTabAll },
            { id: 'Sedan', label: t.vehTabSedan },
            { id: 'MUV/SUV', label: t.vehTabMuv },
            { id: 'Van/Bus', label: t.vehTabVan }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fleet Cards Grid: Compact, Organized & Clean (Zero Clutter) */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-3 text-slate-500 text-xs font-bold">गाड़ियां लोड हो रही हैं...</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {vehicles.map((veh, idx) => (
              <motion.div
                key={veh._id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Compact Photo Container */}
                  <div 
                    onClick={() => setSelectedVehicleModal(veh)}
                    className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={getVehicleImage(veh)}
                      alt={`${veh.name} - इंदौर AC टैक्सी रेंटल | विंध्याचल ट्रेवल्स`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/cars/dzire.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md bg-slate-900/80 text-white backdrop-blur-md">
                        {veh.category}
                      </span>
                    </div>

                    {/* Rate Pill directly on Image */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 text-xs sm:text-sm font-bold rounded-lg bg-orange-500 text-white shadow-sm">
                      ₹{veh.ratePerKm}/किमी
                    </div>

                    {/* Popular Badge */}
                    {veh.popular && (
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 text-xs font-bold uppercase rounded-md bg-amber-400 text-slate-900 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> {t.vehPopularBadge}
                      </div>
                    )}
                  </div>

                  {/* Body Content: Compact & Clean */}
                  <div className="p-3.5 sm:p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 
                        onClick={() => setSelectedVehicleModal(veh)}
                        className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer truncate"
                      >
                        {veh.name}
                      </h3>
                    </div>

                    {/* Clean 1-Line Specs (Zero Clutter) */}
                    {(() => {
                      const specs = formatVehicleSpecs(veh, isHindi);
                      return (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap overflow-x-auto no-scrollbar py-0.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                            <Users className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>{specs.seats}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                            <Wind className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>AC</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                            <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{specs.luggage}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                            <Navigation className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>GPS</span>
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Compact Actions */}
                <div className="p-3.5 sm:p-4 pt-0 grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => handleQuickBook(veh)}
                    className="col-span-3 btn-shimmer py-2 px-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{isHindi ? 'गाड़ी बुक करें' : 'Book Vehicle'}</span>
                    <ArrowRight className="w-3 h-3 stroke-[3]" />
                  </button>

                  <a
                    href={`https://wa.me/919685232340?text=नमस्ते%20विंध्याचल%20ट्रेवल्स,%20मुझे%20${encodeURIComponent(veh.name)}%20कार%20का%20किराया%20जानना%20है`}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-1 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors"
                    title="WhatsApp"
                    aria-label={isHindi ? `${veh.name} WhatsApp पर किराया पूछताछ` : `Inquire about ${veh.name} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </a>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Information Dialogue Modal (Full Screen on Mobile, Centered on Desktop with 1 Single Cross Button) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedVehicleModal && (
            <div 
              className="fixed inset-0 z-[100000] flex items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden"
              onClick={() => setSelectedVehicleModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-xl bg-white sm:rounded-3xl rounded-none sm:border sm:border-slate-200 shadow-2xl flex flex-col text-left overflow-hidden"
              >
                {/* ONLY ONE Single Cross Button on Top Right */}
                <button
                  onClick={() => setSelectedVehicleModal(null)}
                  type="button"
                  aria-label="Close"
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center shadow-xl border border-white/40 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Modal Image Header (Fixed at top of modal card) */}
                <div className="relative h-44 sm:h-56 w-full shrink-0 bg-slate-900 overflow-hidden">
                  <img
                    src={getVehicleImage(selectedVehicleModal)}
                    alt={`${selectedVehicleModal.name} - विंध्याचल ट्रेवल्स इंदौर`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/cars/dzire.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-14 sm:bottom-4 sm:left-6 sm:right-16 text-white">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white mb-1.5 inline-block">
                      {selectedVehicleModal.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-serif text-white">{selectedVehicleModal.name}</h3>
                    <p className="text-xs text-slate-200 font-medium">{selectedVehicleModal.seats} • {selectedVehicleModal.acType}</p>
                  </div>
                </div>

                {/* Modal Body (Scrollable with plenty of padding at the bottom) */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-slate-700 flex-1 overscroll-contain pb-8 sm:pb-6">
                  
                  {/* Pricing & Key Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 sm:p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] uppercase text-slate-700 font-bold block">दर (Rate)</span>
                      <span className="text-sm sm:text-base font-black text-orange-600 font-serif">₹{selectedVehicleModal.ratePerKm} / KM</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-700 font-bold block">बैठक क्षमता</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800">{selectedVehicleModal.seats}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-700 font-bold block">सामान क्षमता</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800">{selectedVehicleModal.luggage || (isHindi ? '2 बड़े बैग' : '2 Large Bags')}</span>
                    </div>
                  </div>

                  {/* Included Facilities */}
                  <div>
                    <h4 className="text-[11px] uppercase font-black text-slate-700 tracking-wider mb-2">शामिल विशेष सुविधाएं</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 sm:p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                        <Newspaper className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                        <div className="text-[10px] sm:text-[11px] font-bold text-slate-900">समाचार पत्र</div>
                        <div className="text-[9px] text-slate-500">हिंदी व अंग्रेजी</div>
                      </div>
                      <div className="p-2 sm:p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                        <Navigation className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <div className="text-[10px] sm:text-[11px] font-bold text-slate-900">GPS ट्रैकिंग</div>
                        <div className="text-[9px] text-slate-500">लाइव लोकेशन</div>
                      </div>
                      <div className="p-2 sm:p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                        <Video className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                        <div className="text-[10px] sm:text-[11px] font-bold text-slate-900">इन-कार कैमरा</div>
                        <div className="text-[9px] text-slate-500">24/7 सुरक्षा</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Booking Form */}
                  <div className="bg-orange-50/80 p-3.5 sm:p-4 rounded-2xl border border-orange-200 space-y-3">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-orange-600" />
                      <span>{selectedVehicleModal.name} {isHindi ? 'हेतु त्वरित बुकिंग' : 'Instant Booking'}</span>
                    </h4>

                    {modalSuccess ? (
                      <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                        ✅ {isHindi ? 'धन्यवाद! आपकी बुकिंग पूछताछ प्राप्त हो गई है। हम 15 मिनट में संपर्क करेंगे।' : 'Thank you! Your booking request has been received. We will contact you within 15 minutes.'}
                      </div>
                    ) : (
                      <form onSubmit={handleModalSubmit} className="space-y-2.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            id="vehicle-modal-name"
                            type="text"
                            aria-label={isHindi ? 'आपका नाम' : 'Your Name'}
                            placeholder={isHindi ? 'आपका नाम' : 'Your Name'}
                            value={modalName}
                            onChange={(e) => setModalName(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-orange-500 w-full"
                          />
                          <input
                            id="vehicle-modal-phone"
                            type="tel"
                            required
                            maxLength={10}
                            aria-label={isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
                            placeholder={isHindi ? 'मोबाइल नंबर (10 अंक)' : 'Mobile (10 digits)'}
                            value={modalPhone}
                            onChange={(e) => setModalPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-orange-500 w-full"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={modalSubmitting}
                          className="btn-shimmer w-full py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {modalSubmitting ? (
                            <span>{isHindi ? 'भेजा जा रहा है...' : 'Sending...'}</span>
                          ) : (
                            <span>{isHindi ? 'बुकिंग अनुरोध भेजें' : 'Send Booking Request'}</span>
                          )}
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
};

export default Vehicles;
