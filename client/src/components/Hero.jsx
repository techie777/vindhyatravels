import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Car, 
  Calendar, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Star, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  CheckCircle2,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { translations } from '../utils/translations';
import API from '../services/api';

const TRIPS = [
  { id: 'ujjain', name: 'उज्जैन महाकाल (ज्योतिर्लिंग)', nameEn: 'Ujjain Mahakal Jyotirlinga', km: 55, ic: '🔱' },
  { id: 'omkareshwar', name: 'ओंकारेश्वर ज्योतिर्लिंग', nameEn: 'Omkareshwar Jyotirlinga', km: 80, ic: '🕉️' },
  { id: 'maheshwar', name: 'महेश्वर अहिल्या किला व घाट', nameEn: 'Maheshwar Fort & Narmada Ghat', km: 95, ic: '🏯' },
  { id: 'mandu', name: 'मांडू जहाज महल व ऐतिहासिक नगरी', nameEn: 'Mandu Heritage Forts', km: 100, ic: '🏰' },
  { id: 'nalkheda', name: 'माँ बगलामुखी मंदिर (नलखेड़ा)', nameEn: 'Maa Baglamukhi Nalkheda', km: 165, ic: '🛕' },
  { id: 'sanwariya', name: 'साँवरिया सेठ मंदिर (मंडफिया)', nameEn: 'Sanwariya Seth Mandafiya', km: 240, ic: '🦚' },
  { id: 'pachmarhi', name: 'पचमढ़ी हिल स्टेशन (सतपुड़ा)', nameEn: 'Pachmarhi Hill Station', km: 340, ic: '🌲' },
  { id: 'khajuraho', name: 'खजुराहो विश्व धरोहर मंदिर', nameEn: 'Khajuraho UNESCO Temples', km: 385, ic: '🗿' },
  { id: 'kanha', name: 'कान्हा नेशनल पार्क (सफारी)', nameEn: 'Kanha Tiger Reserve Safari', km: 450, ic: '🐅' },
  { id: 'varanasi', name: 'काशी विश्वनाथ मंदिर (वाराणसी)', nameEn: 'Kashi Vishwanath Varanasi', km: 820, ic: '🪔' },
  { id: 'ayodhya', name: 'श्री राम मंदिर (अयोध्या धाम)', nameEn: 'Shree Ram Mandir Ayodhya', km: 780, ic: '🏹' }
];

const CARS = [
  { id: 'dzire', name: 'Swift Dzire', seats: '4 सीट', seatsEn: '4 Seater', rate: 12, ic: '🚗' },
  { id: 'aura', name: 'Hyundai Aura', seats: '4 सीट', seatsEn: '4 Seater', rate: 13, ic: '🚗' },
  { id: 'ertiga', name: 'Maruti Ertiga', seats: '6 सीट', seatsEn: '6 Seater', rate: 16, ic: '🚙' },
  { id: 'innova', name: 'Innova Crysta', seats: '7 सीट', seatsEn: '7 Seater', rate: 20, ic: '🚙' },
  { id: 'tempo', name: 'Tempo Traveller', seats: '12–17 सीट', seatsEn: '12-17 Seater', rate: 26, ic: '🚐' }
];

// 🚩 Top Tour Destination Slides for Desktop Left Slider (MP & India Packages)
const DESTINATION_SLIDES = [
  {
    id: 'ujjain',
    tripIdx: 0,
    title: 'उज्जैन महाकालेश्वर ज्योतिर्लिंग दर्शन',
    titleEn: 'Ujjain Mahakaleshwar Jyotirlinga Tour',
    shortTitle: 'उज्जैन महाकाल',
    image: '/images/destinations/ujjain.jpg',
    km: 55,
    duration: '1-2 दिन',
    rating: 4.95,
    reviews: 128,
    badge: '🔱 पवित्र ज्योतिर्लिंग',
    desc: 'विश्व प्रसिद्ध भस्म आरती, भव्य महाकाल लोक कॉरिडोर, काल भैरव एवं क्षिप्रा नदी घाट दर्शन।'
  },
  {
    id: 'omkareshwar',
    tripIdx: 1,
    title: 'ओंकारेश्वर ज्योतिर्लिंग दर्शन',
    titleEn: 'Omkareshwar Jyotirlinga Tour',
    shortTitle: 'ओंकारेश्वर',
    image: '/images/destinations/omkareshwar.jpg',
    km: 80,
    duration: '1-2 दिन',
    rating: 4.90,
    reviews: 94,
    badge: '🕉️ नर्मदा द्वीप धाम',
    desc: 'पवित्र नर्मदा के ॐ आकार द्वीप पर ओंकारेश्वर व ममलेश्वर ज्योतिर्लिंग एवं नौका विहार।'
  },
  {
    id: 'maheshwar',
    tripIdx: 2,
    title: 'महेश्वर अहिल्या किला व सहस्त्रधारा घाट',
    titleEn: 'Maheshwar Fort & Narmada Ghats Tour',
    shortTitle: 'महेश्वर घाट',
    image: '/images/destinations/maheshwar_waterfall.jpg',
    km: 95,
    duration: '1 दिन',
    rating: 4.85,
    reviews: 76,
    badge: '🏯 ऐतिहासिक धरोहर',
    desc: 'रानी अहिल्याबाई होलकर का भव्य किला, पावन सहस्त्रधारा नर्मदा घाट एवं महेश्वरी साड़ी बुनाई केंद्र।'
  },
  {
    id: 'mandu',
    tripIdx: 3,
    title: 'मांडू ऐतिहासिक जहाज महल व नगरी',
    titleEn: 'Mandu Heritage Forts Tour',
    shortTitle: 'मांडू महल',
    image: '/images/destinations/mandu.jpg',
    km: 100,
    duration: '1-2 दिन',
    rating: 4.90,
    reviews: 82,
    badge: '🏰 आनंद नगरी मांडू',
    desc: 'जहाज महल, हिंडोला महल, जामी मस्जिद एवं रानी रूपमती मंडप की अद्वितीय स्थापत्य कला।'
  },
  {
    id: 'varanasi',
    tripIdx: 9,
    title: 'श्री काशी विश्वनाथ मंदिर (वाराणसी)',
    titleEn: 'Shree Kashi Vishwanath Varanasi Tour',
    shortTitle: 'काशी धाम',
    image: '/images/destinations/varanasi.jpg',
    km: 820,
    duration: '3-4 दिन',
    rating: 4.98,
    reviews: 210,
    badge: '🪔 अखिल भारतीय तीर्थ',
    desc: 'काशी विश्वनाथ ज्योतिर्लिंग कॉरिडोर, दशाश्वमेध घाट की भव्य संध्या गंगा आरती एवं सारनाथ।'
  },
  {
    id: 'ayodhya',
    tripIdx: 10,
    title: 'श्री राम मंदिर (अयोध्या धाम दर्शन)',
    titleEn: 'Shree Ram Mandir Ayodhya Dham Tour',
    shortTitle: 'अयोध्या धाम',
    image: '/images/destinations/ayodhya.jpg',
    km: 780,
    duration: '3-4 दिन',
    rating: 4.99,
    reviews: 240,
    badge: '🏹 राम लला दर्शन',
    desc: 'भव्य नवनिर्मित श्री राम जन्मभूमि मंदिर दर्शन, हनुमान गढ़ी एवं पावन सरयू तट संध्या आरती।'
  }
];

// Helper to get local present day in YYYY-MM-DD
const getTodayDateStr = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Hero = ({ lang, onSearch }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';
  const todayStr = getTodayDateStr();

  const [selectedTripIdx, setSelectedTripIdx] = useState(0);
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);
  const [isManualTrip, setIsManualTrip] = useState(false);
  const [manualDestination, setManualDestination] = useState('');
  const [manualKm, setManualKm] = useState(100);
  const [travelDate, setTravelDate] = useState(todayStr);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');
  const [estimateResult, setEstimateResult] = useState(null);

  // Desktop Left Slider States
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const thumbnailContainerRef = useRef(null);

  // Hero static data initialized

  // Desktop slider is manual/click-driven for best UX and zero unnecessary background re-renders

  // Keep active thumbnail visible in scroll track (only scrolls horizontal thumbnail container, NEVER window)
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeEl = container.children[currentSlideIdx];
      if (activeEl) {
        const targetScrollLeft = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
      }
    }
  }, [currentSlideIdx]);

  const handlePrevSlide = () => {
    setCurrentSlideIdx(prev => (prev === 0 ? DESTINATION_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIdx(prev => (prev === DESTINATION_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (slide, index) => {
    const idx = typeof index === 'number' ? index : DESTINATION_SLIDES.findIndex(s => s.id === slide.id);
    if (idx !== -1) setCurrentSlideIdx(idx);

    if (typeof slide.tripIdx === 'number') {
      setSelectedTripIdx(slide.tripIdx);
      setIsManualTrip(false);
      setEstimateResult(null);
    }
  };

  const handleCalculateFare = (e) => {
    if (e) e.preventDefault();

    const cleanPhone = userPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setPhoneError(isHindi ? 'कृपया 10 अंकों का सही मोबाइल / व्हाट्सऐप नंबर दर्ज करें' : 'Please enter valid 10-digit mobile/WhatsApp number');
      return;
    }
    setPhoneError('');

    if (travelDate && travelDate < todayStr) {
      setDateError(isHindi ? 'कृपया आज या भविष्य की तारीख चुनें (पुरानी तारीख अमान्य है)' : 'Please select today or a future date');
      return;
    }
    setDateError('');
    
    let tripName = '';
    let oneWayKm = 50;
    let tripIcon = '📍';

    if (isManualTrip) {
      tripName = manualDestination.trim() || (isHindi ? 'मनचाहा गंतव्य' : 'Custom Destination');
      oneWayKm = Number(manualKm) > 0 ? Number(manualKm) : 100;
      tripIcon = '📍';
    } else {
      const trip = TRIPS[selectedTripIdx];
      tripName = isHindi ? trip.name : trip.nameEn;
      oneWayKm = trip.km;
      tripIcon = trip.ic;
    }

    const car = CARS[selectedCarIdx];
    const totalKm = oneWayKm * 2; // Round trip
    const fare = Math.round(totalKm * car.rate);

    setEstimateResult({
      userName: userName.trim(),
      userPhone: cleanPhone,
      trip: { name: tripName, km: oneWayKm, ic: tripIcon },
      car,
      totalKm,
      fare,
      date: travelDate,
      isManual: isManualTrip
    });

    // Auto-save lead to backend enquiries
    API.post('/enquiries', {
      name: userName.trim() || 'यात्री (ऑनलाइन किराया सर्च)',
      phone: cleanPhone,
      destination: tripName,
      vehicle: `${car.name} (${car.seats})`,
      pickupDate: travelDate || new Date().toISOString().split('T')[0],
      estimatedFare: fare,
      totalKm,
      source: 'Hero Fare Calculator',
      status: 'Pending'
    }).catch(() => {});

    if (onSearch && !isManualTrip) {
      onSearch('', tripName.split(' ')[0]);
    }
  };

  const getWhatsAppBookingUrl = () => {
    if (!estimateResult) return `https://wa.me/919685232340`;
    const { trip, car, fare, date, userName: clientName, userPhone: clientPhone } = estimateResult;
    const msg = `🚩 *नई यात्रा बुकिंग - विंध्याचल ट्रेवल्स* 🚩\n\n👤 *नाम:* ${clientName || 'यात्री'}\n📱 *मोबाइल / व्हाट्सऐप:* ${clientPhone || userPhone}\n📍 *गंतव्य:* ${trip.name} (${trip.km} किमी)\n🚗 *गाड़ी:* ${car.name} (${car.seats} @ ₹${car.rate}/किमी)\n📅 *यात्रा तारीख:* ${date || 'जल्द ही'}\n💰 *अनुमानित राउंड ट्रिप किराया:* ₹${fare.toLocaleString('en-IN')}\n\n💬 *कृपया मुझे इस यात्रा की बुकिंग पुष्टि व विवरण भेजें।*`;
    return `https://wa.me/919685232340?text=${encodeURIComponent(msg)}`;
  };

  const scrollToBookForm = () => {
    const bookElem = document.getElementById('book');
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = DESTINATION_SLIDES[currentSlideIdx] || DESTINATION_SLIDES[0];

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-slate-900 text-white overflow-hidden">
      
      {/* High-Performance Divine Night Background with Zero Network Latency for Instant Sub-Second LCP */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-950 via-[#070e1e] to-slate-950 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(249,115,22,0.18),transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,88,12,0.1),transparent_50%)]" />
      </div>

      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (block lg:hidden) - Exact Existing Layout */}
      {/* ======================================================== */}
      <div className="block lg:hidden relative z-10 max-w-xl mx-auto px-4 sm:px-6 w-full text-center space-y-4">
        
        {/* Emotional Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{isHindi ? 'सपनों का सफ़र, अपनों के साथ' : 'Journeys That Touch The Soul'}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white leading-tight">
          {isHindi ? (
            <>
              इंदौर से कहीं भी, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">AC टैक्सी</span> में
            </>
          ) : (
            <>
              Travel Anywhere From Indore in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">AC Cabs</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
          {isHindi 
            ? 'चुनिए कहाँ जाना है और पारदर्शी किराया तुरंत देखिए — बिना किसी छिपे खर्च के।'
            : 'Select where you want to go and get an instant round-trip fare estimate.'}
        </p>

        {/* 🚗 Clean Instant Fare Finder with Name & WhatsApp Lead Form (Mobile) */}
        <div className="mt-6 bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-left">
          <form onSubmit={handleCalculateFare}>

            {/* Row 1: Trip Destination, Vehicle, and Travel Date (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              
              {/* 1. Destination Select / Manual Entry */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={isManualTrip ? "mobile-manual-destination" : "mobile-trip-select"} className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span>{isHindi ? 'कहाँ जाना है?' : 'Where to go?'}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualTrip(!isManualTrip);
                      setEstimateResult(null);
                    }}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-0.5 transition-colors cursor-pointer"
                    aria-label={isManualTrip ? "सूची से गंतव्य चुनें" : "खुद गंतव्य दर्ज करें"}
                  >
                    {isManualTrip 
                      ? (isHindi ? '📋 सूची से चुनें' : '📋 List view') 
                      : (isHindi ? '✍️ खुद लिखें (Manual)' : '✍️ Enter manually')}
                  </button>
                </div>

                {isManualTrip ? (
                  <div className="space-y-1.5">
                    <input
                      id="mobile-manual-destination"
                      type="text"
                      aria-label={isHindi ? "गंतव्य शहर का नाम" : "Destination city name"}
                      placeholder={isHindi ? "शहर/स्थान का नाम (उदा. भोपाल, जबलपुर...)" : "City/Place name (e.g. Bhopal, Gwalior...)"}
                      value={manualDestination}
                      onChange={(e) => {
                        setManualDestination(e.target.value);
                        setEstimateResult(null);
                      }}
                      className="w-full bg-slate-50 border border-orange-300 focus:border-orange-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none shadow-sm"
                      autoFocus
                    />
                    <div className="flex items-center justify-between bg-orange-50/80 px-2.5 py-1 rounded-lg border border-orange-200 text-[11px]">
                      <label htmlFor="mobile-manual-km" className="font-bold text-slate-700">{isHindi ? 'एक तरफ दूरी (किमी):' : 'One-way KM:'}</label>
                      <div className="flex items-center gap-1">
                        <input
                          id="mobile-manual-km"
                          type="number"
                          min="10"
                          max="3000"
                          aria-label={isHindi ? "एक तरफ दूरी किलोमीटर में" : "One-way distance in kilometers"}
                          value={manualKm}
                          onChange={(e) => {
                            setManualKm(Math.max(1, Number(e.target.value) || 0));
                            setEstimateResult(null);
                          }}
                          className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs font-black text-center text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <span className="text-slate-700 font-bold text-[10px]">{isHindi ? 'किमी' : 'KM'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <select
                    id="mobile-trip-select"
                    aria-label={isHindi ? "कहाँ जाना है (गंतव्य चुनें)" : "Where to go (Select destination)"}
                    value={selectedTripIdx}
                    onChange={(e) => {
                      if (e.target.value === 'manual') {
                        setIsManualTrip(true);
                      } else {
                        setSelectedTripIdx(Number(e.target.value));
                      }
                      setEstimateResult(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {TRIPS.map((t, idx) => (
                      <option key={t.id} value={idx}>
                        {t.ic} {isHindi ? t.name : t.nameEn} ({t.km} किमी)
                      </option>
                    ))}
                    <option value="manual">✍️ {isHindi ? 'अन्य कोई शहर / स्थान (खुद लिखें)...' : 'Other City / Place (Enter manually)...'}</option>
                  </select>
                )}
              </div>

              {/* 2. Vehicle Select */}
              <div>
                <label htmlFor="mobile-vehicle-select" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{isHindi ? 'गाड़ी का प्रकार' : 'Vehicle'}</span>
                </label>
                <select
                  id="mobile-vehicle-select"
                  aria-label={isHindi ? "गाड़ी का प्रकार चुनें" : "Select Vehicle Type"}
                  value={selectedCarIdx}
                  onChange={(e) => {
                    setSelectedCarIdx(Number(e.target.value));
                    setEstimateResult(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  {CARS.map((c, idx) => (
                    <option key={c.id} value={idx}>
                      {c.ic} {c.name} ({isHindi ? c.seats : c.seatsEn} – ₹{c.rate}/किमी)
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Travel Date */}
              <div>
                <label htmlFor="mobile-travel-date" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'यात्रा की तारीख' : 'Travel Date'}</span>
                </label>
                <input
                  id="mobile-travel-date"
                  type="date"
                  aria-label={isHindi ? "यात्रा की तारीख चुनें" : "Select Travel Date"}
                  min={todayStr}
                  value={travelDate}
                  onChange={(e) => {
                    setTravelDate(e.target.value);
                    if (dateError) setDateError('');
                  }}
                  className={`w-full bg-slate-50 border ${dateError ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'} rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer`}
                />
                {dateError && (
                  <p className="text-[11px] text-red-600 font-bold mt-1">
                    ⚠️ {dateError}
                  </p>
                )}
              </div>

            </div>

            {/* Row 2: यात्रा तारीख के नीचे - Name, WhatsApp Number & किराया देखें बटन */}
            <div className="mt-3 pt-3 border-t border-slate-100 p-3 sm:p-3.5 bg-gradient-to-r from-orange-50/90 to-amber-50/80 rounded-2xl border border-orange-200 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                
                {/* 1. Name Field (sm:col-span-5) */}
                <div className="sm:col-span-5">
                  <label htmlFor="mobile-user-name" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{isHindi ? 'आपका नाम (वैकल्पिक)' : 'Your Name (Optional)'}</span>
                  </label>
                  <input
                    id="mobile-user-name"
                    type="text"
                    aria-label={isHindi ? "आपका नाम दर्ज करें" : "Enter your name"}
                    placeholder={isHindi ? "उदा. राहुल शर्मा" : "e.g. Rahul Sharma"}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white border border-slate-300 focus:border-orange-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* 2. WhatsApp Number Field (sm:col-span-4) */}
                <div className="sm:col-span-4">
                  <label htmlFor="mobile-user-phone" className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{isHindi ? 'मोबाइल / व्हाट्सऐप नंबर *' : 'Mobile / WhatsApp Number *'}</span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      {isHindi ? 'आवश्यक' : 'Required'}
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-700">
                      +91
                    </span>
                    <input
                      id="mobile-user-phone"
                      type="tel"
                      required
                      maxLength={10}
                      aria-label={isHindi ? "10 अंकों का व्हाट्सऐप मोबाइल नंबर" : "10-digit WhatsApp mobile number"}
                      placeholder={isHindi ? "10 अंकों का व्हाट्सऐप नंबर दर्ज करें" : "10-digit WhatsApp number"}
                      value={userPhone}
                      onChange={(e) => {
                        setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                        if (phoneError) setPhoneError('');
                      }}
                      className={`w-full bg-white border ${phoneError ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-300 focus:border-orange-500'} rounded-xl pl-12 pr-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none transition-colors shadow-sm`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      ⚠️ {phoneError}
                    </p>
                  )}
                </div>

                {/* 3. Action Button (sm:col-span-3) */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    aria-label={isHindi ? "किराया देखें (Calculate Fare)" : "Calculate Fare"}
                    className="btn-sharplens w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 h-[40px] cursor-pointer"
                  >
                    <span>{isHindi ? 'किराया देखें' : 'View Fare'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

              </div>
            </div>

          </form>

          {/* Instant Estimate Result Box (Mobile) */}
          <AnimatePresence>
            {estimateResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-slate-100 bg-orange-50/70 p-4 rounded-2xl border border-orange-200 text-center space-y-2"
              >
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  {estimateResult.userName && <span className="text-orange-700">श्री {estimateResult.userName}, </span>}
                  {estimateResult.trip.ic} {isHindi ? estimateResult.trip.name : estimateResult.trip.nameEn} · {estimateResult.car.name} ({estimateResult.car.seats})
                </div>

                <div className="text-3xl sm:text-4xl font-black text-orange-600 font-serif">
                  लगभग ₹{estimateResult.fare.toLocaleString('en-IN')}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {isHindi 
                    ? `इंदौर से आने-जाने का कुल अनुमान (~${estimateResult.totalKm} किमी) · टोल व पार्किंग वास्तविक पर्ची अनुसार`
                    : `Round-trip estimate (~${estimateResult.totalKm} KM) · Toll & parking as per actual receipt`}
                </p>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isHindi ? 'WhatsApp पर बुक करें' : 'Book on WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={scrollToBookForm}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span>{isHindi ? 'फ़ॉर्म में भरें' : 'Fill in Form'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Clean Trust Strip (Mobile) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> <b>4.9</b> रेटिंग
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-orange-400" /> <b>15,000+</b> खुश यात्री
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" /> <b>24×7</b> सहायता
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> <b>100%</b> AC व सुरक्षित
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW (hidden lg:block) - 2 Parts 50% / 50% (Slider + Inquiry) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Section for Desktop */}
        <div className="text-center space-y-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isHindi ? 'सपनों का सफ़र, अपनों के साथ' : 'Journeys That Touch The Soul'}</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-black font-serif tracking-tight text-white leading-tight">
            {isHindi ? (
              <>
                इंदौर से कहीं भी, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">AC टैक्सी</span> में
              </>
            ) : (
              <>
                Travel Anywhere From Indore in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">AC Cabs</span>
              </>
            )}
          </h1>

          <p className="text-sm text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            {isHindi 
              ? 'चुनिए कहाँ जाना है और पारदर्शी किराया तुरंत देखिए — बिना किसी छिपे खर्च के।'
              : 'Select where you want to go and get an instant round-trip fare estimate.'}
          </p>
        </div>

        {/* 2-Part Grid: 50% Left (Destination Slider) + 50% Right (Inquiry Dialogue) */}
        <div className="grid grid-cols-2 gap-7 items-start">
          
          {/* ============================================================ */}
          {/* LEFT 50%: Destination Slider with Images, Back/Next & Reel   */}
          {/* ============================================================ */}
          <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700/80 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden backdrop-blur-md">
            
            {/* Slider Top Bar: Header & Controls */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/30 text-orange-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white flex items-center gap-2 leading-tight">
                    <span>{isHindi ? 'लोकप्रिय तीर्थ एवं पर्यटन स्थल' : 'Popular Tour Destinations'}</span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      MP व भारत दर्शन
                    </span>
                  </h2>
                  <span className="text-[11px] text-slate-300 font-normal">
                    {isHindi ? 'पैकेज पर क्लिक करके सीधे किराया देखें' : 'Click site to check instant taxi fare'}
                  </span>
                </div>
              </div>

              {/* Back (<) and Next (>) Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  title="पिछला स्थल (Previous)"
                  aria-label="Previous Destination"
                  className="w-8 h-8 rounded-xl bg-slate-700/90 hover:bg-orange-600 text-white flex items-center justify-center transition-all cursor-pointer border border-slate-600 hover:border-orange-500 shadow-sm active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-300 px-1 select-none">
                  {currentSlideIdx + 1}/{DESTINATION_SLIDES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  title="अगला स्थल (Next)"
                  aria-label="Next Destination"
                  className="w-8 h-8 rounded-xl bg-slate-700/90 hover:bg-orange-600 text-white flex items-center justify-center transition-all cursor-pointer border border-slate-600 hover:border-orange-500 shadow-sm active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Showcase Card (Main Slide) */}
            <div 
              className="relative rounded-2xl overflow-hidden h-[245px] border border-slate-700/80 shadow-inner group select-none"
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={() => setIsSliderPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white bg-orange-600/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-orange-400/40">
                      {currentSlide.badge}
                    </span>
                    <span className="text-[11px] font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-amber-400/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{currentSlide.rating}</span>
                      <span className="text-slate-400 text-[10px]">({currentSlide.reviews}+)</span>
                    </span>
                  </div>

                  {/* Bottom Information */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 space-y-1.5 text-left">
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-300">
                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        <span>इंदौर से ~{currentSlide.km} किमी</span>
                      </span>
                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md text-slate-300 border border-white/10">
                        <Clock className="w-3 h-3 text-sky-400" />
                        <span>{currentSlide.duration}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white font-serif leading-tight drop-shadow-md">
                      {isHindi ? currentSlide.title : currentSlide.titleEn}
                    </h3>

                    <p className="text-[11px] text-slate-200 line-clamp-1 leading-snug drop-shadow-sm font-normal">
                      {currentSlide.desc}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSlide(currentSlide)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                          selectedTripIdx === currentSlide.tripIdx && !isManualTrip
                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                            : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white'
                        }`}
                      >
                        {selectedTripIdx === currentSlide.tripIdx && !isManualTrip ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isHindi ? 'यह पैकेज चुना गया ✓' : 'Selected ✓'}</span>
                          </>
                        ) : (
                          <>
                            <span>{isHindi ? 'यह पैकेज चुनें' : 'Select This Package'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <span className="text-[11px] text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700/60">
                        किराया: <b className="text-orange-400">₹12/किमी</b> से शुरू
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* In-Image Left & Right Navigation Controls */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-orange-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-orange-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4-5 Sites Visible Scrolling Reel (Thumbnail Carousel) */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1.5 px-0.5">
                <span>{isHindi ? 'दर्शनीय स्थल (स्क्रॉल व क्लिक करें):' : 'Destination Sites (Scroll & Click):'}</span>
                <span className="text-[10px] text-orange-400 font-medium">
                  {isHindi ? '4-5 स्थल सीधे दृश्यमान' : 'Visible Scrolling'}
                </span>
              </div>

              <div
                ref={thumbnailContainerRef}
                className="flex items-center gap-2 overflow-x-auto pb-1 select-none scrollbar-thin scrollbar-thumb-slate-700"
              >
                {DESTINATION_SLIDES.map((slide, idx) => {
                  const isActive = currentSlideIdx === idx;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`${slide.title} (${slide.km} किमी)`}
                      onClick={() => handleSelectSlide(slide, idx)}
                      className={`relative flex-shrink-0 w-[104px] h-[72px] rounded-xl overflow-hidden border text-left transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'ring-2 ring-orange-500 border-orange-400 scale-[1.03] shadow-lg shadow-orange-500/20'
                          : 'border-slate-700/80 hover:border-slate-500 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.shortTitle}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 ${isActive ? 'bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent' : 'bg-slate-950/60'}`} />

                      <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-sm px-1 py-0.2 rounded text-[9px] font-extrabold text-orange-300 border border-white/10">
                        {slide.km} KM
                      </div>

                      <div className="absolute bottom-1 left-1 right-1">
                        <span className="block text-[10px] font-bold text-white leading-tight truncate">
                          {slide.shortTitle}
                        </span>
                      </div>

                      {isActive && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-400 ring-2 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT 50%: Inquiry Dialogue (Fare Calculator Box)            */}
          {/* ============================================================ */}
          <div className="bg-white text-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col justify-between text-left">
            
            {/* Inquiry Box Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center font-bold">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {isHindi ? 'त्वरित किराया पूछताछ एवं बुकिंग' : 'Instant Fare Inquiry & Booking'}
                  </h2>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {isHindi ? 'पारदर्शी राउंड ट्रिप दरें • कोई छिपा शुल्क नहीं' : 'Transparent round-trip rates'}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                ⚡ {isHindi ? '24×7 सेवा' : '24x7 Active'}
              </span>
            </div>

            <form onSubmit={handleCalculateFare} className="space-y-3">
              
              {/* 1. Destination Field (Full width) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={isManualTrip ? "desktop-manual-destination" : "desktop-hero-trip"} className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span>{isHindi ? 'कहाँ जाना है?' : 'Where to go?'}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualTrip(!isManualTrip);
                      setEstimateResult(null);
                    }}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-0.5 transition-colors cursor-pointer"
                    aria-label={isManualTrip ? "सूची से गंतव्य चुनें" : "खुद गंतव्य दर्ज करें"}
                  >
                    {isManualTrip 
                      ? (isHindi ? '📋 सूची से चुनें' : '📋 List view') 
                      : (isHindi ? '✍️ खुद लिखें (Manual)' : '✍️ Enter manually')}
                  </button>
                </div>

                {isManualTrip ? (
                  <div className="space-y-1.5">
                    <input
                      id="desktop-manual-destination"
                      type="text"
                      aria-label={isHindi ? "गंतव्य शहर का नाम" : "Destination city name"}
                      placeholder={isHindi ? "शहर/स्थान का नाम (उदा. भोपाल, जबलपुर...)" : "City/Place name (e.g. Bhopal, Gwalior...)"}
                      value={manualDestination}
                      onChange={(e) => {
                        setManualDestination(e.target.value);
                        setEstimateResult(null);
                      }}
                      className="w-full bg-slate-50 border border-orange-300 focus:border-orange-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none shadow-sm"
                      autoFocus
                    />
                    <div className="flex items-center justify-between bg-orange-50/80 px-2.5 py-1 rounded-lg border border-orange-200 text-[11px]">
                      <label htmlFor="desktop-manual-km" className="font-bold text-slate-700">{isHindi ? 'एक तरफ दूरी (किमी):' : 'One-way KM:'}</label>
                      <div className="flex items-center gap-1">
                        <input
                          id="desktop-manual-km"
                          type="number"
                          min="10"
                          max="3000"
                          aria-label={isHindi ? "एक तरफ दूरी किलोमीटर में" : "One-way distance in kilometers"}
                          value={manualKm}
                          onChange={(e) => {
                            setManualKm(Math.max(1, Number(e.target.value) || 0));
                            setEstimateResult(null);
                          }}
                          className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs font-black text-center text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <span className="text-slate-700 font-bold text-[10px]">{isHindi ? 'किमी' : 'KM'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <select
                    id="desktop-hero-trip"
                    aria-label={isHindi ? "कहाँ जाना है (गंतव्य चुनें)" : "Where to go (Select destination)"}
                    value={selectedTripIdx}
                    onChange={(e) => {
                      if (e.target.value === 'manual') {
                        setIsManualTrip(true);
                      } else {
                        const tripIdx = Number(e.target.value);
                        setSelectedTripIdx(tripIdx);
                        const matchIdx = DESTINATION_SLIDES.findIndex(s => s.tripIdx === tripIdx);
                        if (matchIdx !== -1) setCurrentSlideIdx(matchIdx);
                      }
                      setEstimateResult(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {TRIPS.map((t, idx) => (
                      <option key={t.id} value={idx}>
                        {t.ic} {isHindi ? t.name : t.nameEn} ({t.km} किमी)
                      </option>
                    ))}
                    <option value="manual">✍️ {isHindi ? 'अन्य कोई शहर / स्थान (खुद लिखें)...' : 'Other City / Place (Enter manually)...'}</option>
                  </select>
                )}
              </div>

              {/* 2. Vehicle Select & Travel Date (2 Columns) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="desktop-hero-car" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{isHindi ? 'गाड़ी का प्रकार' : 'Vehicle'}</span>
                  </label>
                  <select
                    id="desktop-hero-car"
                    aria-label={isHindi ? "गाड़ी का प्रकार चुनें" : "Select Vehicle Type"}
                    value={selectedCarIdx}
                    onChange={(e) => {
                      setSelectedCarIdx(Number(e.target.value));
                      setEstimateResult(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {CARS.map((c, idx) => (
                      <option key={c.id} value={idx}>
                        {c.ic} {c.name} ({isHindi ? c.seats : c.seatsEn} – ₹{c.rate}/किमी)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="desktop-hero-date" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'यात्रा की तारीख' : 'Travel Date'}</span>
                  </label>
                  <input
                    id="desktop-hero-date"
                    type="date"
                    aria-label={isHindi ? "यात्रा की तारीख चुनें" : "Select Travel Date"}
                    min={todayStr}
                    value={travelDate}
                    onChange={(e) => {
                      setTravelDate(e.target.value);
                      if (dateError) setDateError('');
                    }}
                    className={`w-full bg-slate-50 border ${dateError ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'} rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer`}
                  />
                  {dateError && (
                    <p className="text-[11px] text-red-600 font-bold mt-1">
                      ⚠️ {dateError}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Name & WhatsApp Number inside highlighted container */}
              <div className="p-3 bg-gradient-to-r from-orange-50/90 to-amber-50/80 rounded-2xl border border-orange-200 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="desktop-hero-name" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{isHindi ? 'आपका नाम (वैकल्पिक)' : 'Name (Optional)'}</span>
                    </label>
                    <input
                      id="desktop-hero-name"
                      type="text"
                      aria-label={isHindi ? "आपका नाम दर्ज करें" : "Enter your name"}
                      placeholder={isHindi ? "उदा. राहुल शर्मा" : "Rahul Sharma"}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-white border border-slate-300 focus:border-orange-500 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="desktop-hero-phone" className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{isHindi ? 'व्हाट्सऐप नंबर *' : 'WhatsApp *'}</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        {isHindi ? 'जरूरी' : 'Required'}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-700">
                        +91
                      </span>
                      <input
                        id="desktop-hero-phone"
                        type="tel"
                        required
                        maxLength={10}
                        aria-label={isHindi ? "10 अंकों का व्हाट्सऐप मोबाइल नंबर" : "10-digit WhatsApp mobile number"}
                        placeholder={isHindi ? "10 अंक" : "10 digits"}
                        value={userPhone}
                        onChange={(e) => {
                          setUserPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                          if (phoneError) setPhoneError('');
                        }}
                        className={`w-full bg-white border ${phoneError ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-300 focus:border-orange-500'} rounded-xl pl-9 pr-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none shadow-sm`}
                      />
                    </div>
                  </div>
                </div>

                {phoneError && (
                  <p className="text-[11px] text-red-600 font-bold flex items-center gap-1">
                    ⚠️ {phoneError}
                  </p>
                )}

                <button
                  type="submit"
                  aria-label={isHindi ? "किराया देखें (Calculate Fare)" : "Calculate Fare"}
                  className="btn-sharplens w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 h-[42px] cursor-pointer"
                >
                  <span>{isHindi ? 'किराया देखें (View Fare)' : 'View Fare Estimate'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </form>

            {/* Instant Estimate Result Box (Desktop) */}
            <AnimatePresence>
              {estimateResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-slate-100 bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 text-center space-y-1.5"
                >
                  <div className="text-xs font-bold text-slate-800">
                    {estimateResult.userName && <span className="text-orange-700">श्री {estimateResult.userName}, </span>}
                    {estimateResult.trip.ic} {isHindi ? estimateResult.trip.name : estimateResult.trip.nameEn} · {estimateResult.car.name} ({estimateResult.car.seats})
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-orange-600 font-serif">
                    लगभग ₹{estimateResult.fare.toLocaleString('en-IN')}
                  </div>

                  <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
                    {isHindi 
                      ? `इंदौर से राउंड ट्रिप (~${estimateResult.totalKm} किमी) · टोल व पार्किंग वास्तविक पर्ची अनुसार`
                      : `Round-trip estimate (~${estimateResult.totalKm} KM) · Toll & parking as per actual receipt`}
                  </p>

                  <div className="pt-1.5 flex items-center justify-center gap-2 max-w-sm mx-auto">
                    <a
                      href={getWhatsAppBookingUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp बुकिंग</span>
                    </a>

                    <button
                      type="button"
                      onClick={scrollToBookForm}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span>फ़ॉर्म में भरें</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Clean Trust Strip (Desktop) */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-200">
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> <b>4.9</b> रेटिंग
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-orange-400" /> <b>15,000+</b> खुश यात्री
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" /> <b>24×7</b> सहायता
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> <b>100%</b> AC व सुरक्षित
          </span>
        </div>

      </div>

    </section>
  );
};

export default Hero;
