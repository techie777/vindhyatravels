import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Car, 
  Calendar, 
  Compass, 
  Plane, 
  Globe, 
  Users, 
  Building2, 
  PartyPopper, 
  PhoneCall, 
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { translations } from '../utils/translations';

const Services = ({ lang }) => {
  const isHindi = lang === 'hi';
  const t = translations[lang] || translations.hi;

  const servicesList = [
    {
      emoji: '🛕',
      title: isHindi ? 'धार्मिक यात्रा एवं तीर्थ दर्शन' : 'Pilgrimage & Holy Temple Darshan',
      desc: isHindi 
        ? 'उज्जैन महाकालेश्वर, ओंकारेश्वर, चारधाम, अयोध्या, काशी, खाटू श्याम व सभी 12 ज्योतिर्लिंगों के लिए विशेष दर्शन यात्रा।'
        : 'Specialized spiritual tours to Ujjain Mahakal, Omkareshwar, Char Dham, Ayodhya, and 12 sacred Jyotirlingas.',
      badge: isHindi ? 'विशेष दर्शन' : 'Darshan Special'
    },
    {
      emoji: '🌄',
      title: isHindi ? 'MP पर्यटन एवं पिकनिक टूर' : 'MP Tourism & Scenic Picnic Tours',
      desc: isHindi 
        ? 'मांडू, पचमढ़ी, भेड़ाघाट, पातालपानी, हनुवंतिया, कान्हा व पेंच के लिए मनमोहक प्राकृतिक एवं फैमिली पिकनिक ट्रिप।'
        : 'Breathtaking holidays to Mandu, Pachmarhi, Bhedaghat, Patalpani, Hanuwantiya and lush tiger reserves.',
      badge: isHindi ? 'प्राकृतिक सौंदर्य' : 'Eco Tourism'
    },
    {
      emoji: '🚖',
      title: isHindi ? 'आउटस्टेशन टैक्सी सर्विस' : 'Outstation Taxi Service',
      desc: isHindi 
        ? 'इंदौर से किसी भी शहर या राज्य के लिए 24x7 सुरक्षित, समयबद्ध वन-वे एवं राउंड ट्रिप एसी टैक्सी सर्विस।'
        : '24x7 reliable, transparent one-way and round-trip AC cab booking from Indore to anywhere in India.',
      badge: isHindi ? '24x7 उपलब्ध' : '24x7 Available'
    },
    {
      emoji: '👨‍👩‍👧‍👦',
      title: isHindi ? 'फैमिली टूर पैकेज' : 'Customized Family Tour Packages',
      desc: isHindi 
        ? 'वरिष्ठ नागरिकों और बच्चों के अनुकूल आरामदायक सफर, डोरस्टेप पिकअप और संस्कारी, विनम्र सारथी की सुविधा।'
        : 'Comfort-crafted family journeys with verified chauffeurs, doorstep pickup, and elderly-friendly schedules.',
      badge: isHindi ? '100% सुरक्षित' : 'Family First'
    },
    {
      emoji: '✈️',
      title: isHindi ? 'एयरपोर्ट एवं रेलवे स्टेशन पिकअप' : 'Airport & Railway Station Pickup / Drop',
      desc: isHindi 
        ? 'देवी अहिल्याबाई होल्कर एयरपोर्ट (IDR) एवं इंदौर रेलवे स्टेशनों के लिए समय पर 100% ऑन-टाइम कैब सर्विस।'
        : 'Punctual, stress-free transfers to/from Indore Airport (IDR) and railway junctions with luggage assistance.',
      badge: isHindi ? 'ऑन-टाइम गारंटी' : 'On-Time Always'
    },
    {
      emoji: '⏱️',
      title: isHindi ? 'वन-डे एवं मल्टी-डे टूर' : 'One-Day & Multi-Day Tours',
      desc: isHindi 
        ? '1 दिन के लोकल/निकटवर्ती भ्रमण से लेकर 10-12 दिनों की संपूर्ण भारत यात्रा हेतु कस्टमाइज़्ड यात्रा प्लान।'
        : 'Flexible single-day regional getaways to extended 10–12 day trans-India road journeys customized to your pace.',
      badge: isHindi ? 'लचीला समय' : 'Custom Days'
    },
    {
      emoji: '🇮🇳',
      title: isHindi ? 'ऑल इंडिया टूर एवं ट्रैवल' : 'All India Tour & Travel Services',
      desc: isHindi 
        ? 'मध्य प्रदेश से सम्पूर्ण भारत के पवित्र धामों, राजस्थान, उत्तराखंड, गुजरात, दक्षिण भारत की सुगम यात्रा।'
        : 'Seamless pan-India travel connecting Madhya Pradesh to Rajasthan, Uttarakhand, Gujarat, and South India.',
      badge: isHindi ? 'सम्पूर्ण भारत' : 'Pan India'
    }
  ];

  return (
    <section id="services" className="py-14 sm:py-18 relative z-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>{isHindi ? 'विंध्याचल ट्रेवल्स सर्विस' : 'VINDHYA TRAVELS SERVICES'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>हमारी <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">सेवाएँ</span></>
            ) : (
              <>Our Dedicated <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Travel Services</span></>
            )}
          </h2>

          {/* ⭐ Prominent Marketing Message Highlight Banner */}
          <div className="pt-2">
            <div className="inline-block bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-orange-300/80 rounded-2xl px-4 sm:px-7 py-3 shadow-sm">
              <p className="text-base sm:text-lg md:text-xl font-black font-serif text-orange-950 tracking-wide">
                “{isHindi ? 'मध्य प्रदेश से पूरे भारत में आरामदायक और सुविधाजनक यात्रा' : 'Comfortable and convenient journeys from Madhya Pradesh across India'}”
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed pt-1">
            {isHindi 
              ? 'आस्था, पर्यटन और व्यावसायिक यात्राओं के लिए इंदौर की सबसे भरोसेमंद, पारदर्शी एवं पूर्णतः सैनिटाइज्ड एसी टैक्सी सर्विस।'
              : 'Indore’s most trusted, fully-equipped AC fleet for pilgrimage, family holidays, and outstation commutes.'}
          </p>

        </div>

        {/* 7 Compact Service Cards Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 text-left">
          {servicesList.map((srv, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 inline-block">
                    {srv.emoji}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {srv.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
                <a 
                  href="#book"
                  className="flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>{isHindi ? 'गाड़ी बुक करें' : 'Book Cab'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-400 font-mono text-[10px]">#0{idx + 1}</span>
              </div>
            </div>
          ))}

          {/* 🏨 🏢 💍 Special Highlight Card: Hotel, Corporate & Marriage Booking */}
          <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 text-white rounded-2xl p-5 shadow-lg shadow-orange-500/20 flex flex-col justify-between border border-orange-400/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏨</span>
                <span className="text-2xl">🏢</span>
                <span className="text-2xl">💍</span>
              </div>

              <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white mb-2 border border-white/30">
                {isHindi ? 'विशेष आयोजन बुकिंग' : 'Special Events Fleet'}
              </span>

              <h3 className="text-base sm:text-lg font-black font-serif text-white leading-snug">
                {isHindi ? 'होटल, कॉर्पोरेट एवं शादी-विवाह आयोजन' : 'Hotel, Corporate & Marriage Events'}
              </h3>

              <p className="mt-2 text-xs text-orange-50 leading-relaxed font-medium">
                {isHindi 
                  ? 'शादी-विवाह, बारात, पारिवारिक समारोह, बिजनेस मीटिंग्स और होटल पिकअप-ड्रॉप हेतु सेडान, इनोवा व टेम्पो ट्रैवलर का संपूर्ण बेड़ा थोक एवं दैनिक बुकिंग पर उपलब्ध।'
                  : 'Bulk & customized fleet for weddings, corporate executives, VIP delegations, and hotel transfers.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between gap-2">
              <a
                href="tel:+919685232340"
                className="flex-1 py-1.5 px-2 bg-white text-orange-700 hover:bg-orange-50 font-black text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isHindi ? 'कॉल करें' : 'Call'}</span>
              </a>
              <a
                href="https://wa.me/919685232340?text=नमस्ते%20विंध्याचल%20ट्रेवल्स,%20मुझे%20होटल/कॉर्पोरेट/शादी%20इवेंट%20हेतु%20गाड़ी%20बुक%20करनी%20है।"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
