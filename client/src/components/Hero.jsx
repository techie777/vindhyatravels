import React, { useState, useEffect } from 'react';
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
  User
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

const Hero = ({ lang, onSearch }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [selectedTripIdx, setSelectedTripIdx] = useState(0);
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);
  const [isManualTrip, setIsManualTrip] = useState(false);
  const [manualDestination, setManualDestination] = useState('');
  const [manualKm, setManualKm] = useState(100);
  const [travelDate, setTravelDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [estimateResult, setEstimateResult] = useState(null);

  const [heroSettings, setHeroSettings] = useState({
    heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920',
    titlePrefix: '',
    titleHighlight: '',
    subtitle: ''
  });

  useEffect(() => {
    API.get('/vehicles/hero/settings')
      .then(res => {
        if (res.data) setHeroSettings(res.data);
      })
      .catch(() => {});
  }, []);

  const handleCalculateFare = (e) => {
    if (e) e.preventDefault();

    const cleanPhone = userPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setPhoneError(isHindi ? 'कृपया 10 अंकों का सही मोबाइल / व्हाट्सऐप नंबर दर्ज करें' : 'Please enter valid 10-digit mobile/WhatsApp number');
      return;
    }
    setPhoneError('');
    
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

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-slate-900 text-white overflow-hidden">
      
      {/* Background with subtle photo & dark overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroSettings.heroImage || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920'}
          alt="विंध्याचल ट्रेवल्स इंदौर - Best AC Taxi Service Indore"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center opacity-30"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/85 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full text-center space-y-4">
        
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

        {/* 🚗 Clean Instant Fare Finder with Name & WhatsApp Lead Form */}
        <div className="mt-6 bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-left">
          <form onSubmit={handleCalculateFare}>

            {/* Row 1: Trip Destination, Vehicle, and Travel Date (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              
              {/* 1. Destination Select / Manual Entry */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
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
                  >
                    {isManualTrip 
                      ? (isHindi ? '📋 सूची से चुनें' : '📋 List view') 
                      : (isHindi ? '✍️ खुद लिखें (Manual)' : '✍️ Enter manually')}
                  </button>
                </div>

                {isManualTrip ? (
                  <div className="space-y-1.5">
                    <input
                      type="text"
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
                      <span className="font-bold text-slate-700">{isHindi ? 'एक तरफ दूरी (किमी):' : 'One-way KM:'}</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="10"
                          max="3000"
                          value={manualKm}
                          onChange={(e) => {
                            setManualKm(Math.max(1, Number(e.target.value) || 0));
                            setEstimateResult(null);
                          }}
                          className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs font-black text-center text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <span className="text-slate-500 text-[10px]">{isHindi ? 'किमी' : 'KM'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <select
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
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{isHindi ? 'गाड़ी का प्रकार' : 'Vehicle'}</span>
                </label>
                <select
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
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'यात्रा की तारीख' : 'Travel Date'}</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Row 2: यात्रा तारीख के नीचे - Name, WhatsApp Number & किराया देखें बटन */}
            <div className="mt-3 pt-3 border-t border-slate-100 p-3 sm:p-3.5 bg-gradient-to-r from-orange-50/90 to-amber-50/80 rounded-2xl border border-orange-200 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                
                {/* 1. Name Field (sm:col-span-5) */}
                <div className="sm:col-span-5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{isHindi ? 'आपका नाम (वैकल्पिक)' : 'Your Name (Optional)'}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={isHindi ? "उदा. राहुल शर्मा" : "e.g. Rahul Sharma"}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white border border-slate-300 focus:border-orange-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* 2. WhatsApp Number Field (sm:col-span-4) */}
                <div className="sm:col-span-4">
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{isHindi ? 'मोबाइल / व्हाट्सऐप नंबर *' : 'Mobile / WhatsApp Number *'}</span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      {isHindi ? 'आवश्यक' : 'Required'}
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
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
                    className="btn-sharplens w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 h-[40px] cursor-pointer"
                  >
                    <span>{isHindi ? 'किराया देखें' : 'View Fare'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

              </div>
            </div>

          </form>

          {/* Instant Estimate Result Box (Zero Clutter, Super Clear) */}
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

        {/* Clean Trust Strip */}
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

    </section>
  );
};

export default Hero;
