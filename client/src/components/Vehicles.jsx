import React, { useState, useEffect } from 'react';
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

const Vehicles = ({ lang, currency, onSelectBooking }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
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

                    {/* Key Specs in Clean Compact Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        <Users className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{veh.seats}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        <Wind className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{veh.acType || 'AC'}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{veh.luggage || (isHindi ? 'बूट स्पेस' : 'Luggage Space')}</span>
                      </span>
                    </div>

                    {/* Subtle Amenities Line */}
                    <div className="pt-1.5 text-xs font-medium text-slate-600 flex items-center gap-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-semibold"><Newspaper className="w-3 h-3 text-sky-600 shrink-0" /> अख़बार</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold"><Navigation className="w-3 h-3 text-emerald-600 shrink-0" /> GPS</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold"><Video className="w-3 h-3 text-amber-600 shrink-0" /> कैमरा</span>
                    </div>
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
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </a>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Information Dialogue Modal */}
      <AnimatePresence>
        {selectedVehicleModal && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedVehicleModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVehicleModal(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center shadow-lg border border-white/40 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image Header */}
              <div className="relative h-56 w-full bg-slate-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white mb-1.5 inline-block">
                    {selectedVehicleModal.category}
                  </span>
                  <h3 className="text-2xl font-black font-serif">{selectedVehicleModal.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{selectedVehicleModal.seats} • {selectedVehicleModal.acType}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Pricing & Key Specs Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-black block">दर (Rate)</span>
                    <span className="text-base font-black text-orange-600 font-serif">₹{selectedVehicleModal.ratePerKm} / KM</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-black block">बैठक क्षमता</span>
                    <span className="text-sm font-black text-slate-800">{selectedVehicleModal.seats}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-black block">सामान क्षमता</span>
                    <span className="text-sm font-black text-slate-800">{selectedVehicleModal.luggage || (isHindi ? '2 बड़े बैग' : '2 Large Bags')}</span>
                  </div>
                </div>

                {/* Included Facilities */}
                <div>
                  <h4 className="text-[11px] uppercase font-black text-slate-400 tracking-wider mb-2">शामिल विशेष सुविधाएं</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                      <Newspaper className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-900">समाचार पत्र</div>
                      <div className="text-[9px] text-slate-500">हिंदी व अंग्रेजी</div>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                      <Navigation className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-900">GPS ट्रैकिंग</div>
                      <div className="text-[9px] text-slate-500">लाइव लोकेशन</div>
                    </div>
                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                      <Video className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                      <div className="text-[11px] font-bold text-slate-900">इन-कार कैमरा</div>
                      <div className="text-[9px] text-slate-500">24/7 सुरक्षा</div>
                    </div>
                  </div>
                </div>

                {/* Quick Booking Form */}
                <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-orange-600" />
                    <span>{selectedVehicleModal.name} हेतु त्वरित बुकिंग</span>
                  </h4>

                  {modalSuccess ? (
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                      ✅ धन्यवाद! आपकी बुकिंग पूछताछ प्राप्त हो गई है। हम 15 मिनट में संपर्क करेंगे।
                    </div>
                  ) : (
                    <form onSubmit={handleModalSubmit} className="space-y-2.5 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="आपका नाम"
                          value={modalName}
                          onChange={(e) => setModalName(e.target.value)}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="मोबाइल नंबर (10 अंक)"
                          value={modalPhone}
                          onChange={(e) => setModalPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={modalSubmitting}
                        className="btn-shimmer w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        {modalSubmitting ? <span>भेजा जा रहा है...</span> : <span>बुकिंग अनुरोध भेजें</span>}
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Vehicles;
