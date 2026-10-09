import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Users, Calendar, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../services/api';
import { translations } from '../utils/translations';

const TripCalculator = ({ lang, currency, onApplyEstimate }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [selectedRegion, setSelectedRegion] = useState('MP');
  const [destinationName, setDestinationName] = useState(
    isHindi ? 'उज्जैन महाकालेश्वर ज्योतिर्लिंग दर्शन' : 'Kanha Tiger Reserve Safari'
  );
  const [durationDays, setDurationDays] = useState(3);
  const [travelers, setTravelers] = useState(4);
  const [travelStyle, setTravelStyle] = useState('Standard');

  const availableDestinations = {
    MP: [
      { name: isHindi ? 'उज्जैन महाकालेश्वर ज्योतिर्लिंग दर्शन' : 'Ujjain Mahakaleshwar Temple Tour', basePerDay: 3500 },
      { name: isHindi ? 'ओंकारेश्वर ज्योतिर्लिंग दर्शन' : 'Omkareshwar Jyotirlinga Tour', basePerDay: 3200 },
      { name: isHindi ? 'महेश्वर सहस्त्रधारा एवं अहिल्या किला' : 'Maheshwar Fort & Narmada Ghats', basePerDay: 3000 },
      { name: isHindi ? 'मांडू ऐतिहासिक महल एवं जहाज महल' : 'Mandu Heritage Forts Tour', basePerDay: 3200 },
      { name: isHindi ? 'माँ बगलामुखी नलखेड़ा तंत्र पीठ' : 'Baglamukhi Nalkheda Shaktipeeth', basePerDay: 3400 },
      { name: isHindi ? 'साँवरिया सेठ मंडफिया दर्शन' : 'Sanwariya Seth Mandafiya Tour', basePerDay: 3800 },
      { name: isHindi ? 'खजुराहो यूनेस्को विश्व धरोहर मंदिर' : 'Khajuraho UNESCO Temples Tour', basePerDay: 4000 },
      { name: isHindi ? 'कान्हा टाइगर रिजर्व जंगल सफारी' : 'Kanha Tiger Reserve Safari', basePerDay: 4200 }
    ],
    India: [
      { name: isHindi ? 'श्री काशी विश्वनाथ मंदिर (वाराणसी)' : 'Shree Kashi Vishwanath & Varanasi', basePerDay: 4000 },
      { name: isHindi ? 'केदारनाथ मंदिर चार धाम (उत्तराखंड)' : 'Kedarnath Temple Pilgrimage', basePerDay: 5200 },
      { name: isHindi ? 'श्री राम जन्मभूमि मंदिर (अयोध्या)' : 'Shree Ram Janmabhoomi Ayodhya', basePerDay: 3800 },
      { name: isHindi ? 'शिरडी साई बाबा एवं शनि शिंगणापुर' : 'Shirdi Sai Baba & Shani Shingnapur', basePerDay: 3600 },
      { name: isHindi ? 'तिरुपति बालाजी (आंध्र प्रदेश)' : 'Tirupati Balaji Temple Tour', basePerDay: 4200 },
      { name: isHindi ? 'माँ वैष्णो देवी मंदिर (कटरा)' : 'Vaishno Devi Temple Katra', basePerDay: 3800 },
      { name: isHindi ? 'स्वर्ण मंदिर एवं वाघा बॉर्डर (अमृतसर)' : 'Golden Temple & Wagah Border', basePerDay: 3600 },
      { name: isHindi ? 'खाटू श्याम जी एवं सालासर बालाजी' : 'Khatu Shyam Ji & Salasar Balaji', basePerDay: 3500 }
    ]
  };

  const estimatedTotalINR = useMemo(() => {
    const regionList = availableDestinations[selectedRegion] || availableDestinations.MP;
    const destObj = regionList.find((d) => d.name === destinationName) || regionList[0];
    
    let baseRate = destObj.basePerDay * durationDays * (travelers > 4 ? 1.25 : 1.0);

    let styleMultiplier = 1.0;
    if (travelStyle === 'Budget') styleMultiplier = 0.85;
    if (travelStyle === 'Luxury') styleMultiplier = 1.45;

    return Math.round(baseRate * styleMultiplier);
  }, [selectedRegion, destinationName, durationDays, travelers, travelStyle]);

  const handleApply = () => {
    if (onApplyEstimate) {
      onApplyEstimate({
        destination: destinationName,
        travelersCount: travelers,
        travelStyle: travelStyle,
        estimatedCost: estimatedTotalINR,
        specialRequests: `Calculated Package: ${durationDays} Days for ${travelers} travelers (${travelStyle} style).`
      });
    }
    const enquiryElem = document.getElementById('enquiry');
    if (enquiryElem) {
      enquiryElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-20 sm:py-24 relative z-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Emotional & Clean */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-black mb-3">
            <Calculator className="w-4 h-4 text-orange-600" />
            <span>{isHindi ? 'पारदर्शी किराया' : 'FARE ESTIMATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
            {t.calcTitlePrefix} <span className="text-gradient-coral">{t.calcTitleHighlight}</span>
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            {t.calcSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Controls Form Panel: Clean & Less Clutter */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-lg space-y-5 text-left">
            
            {/* Step 1: Region & Destination Selection */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-black mb-2">
                {t.calcStep1}
              </label>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {['MP', 'India'].map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(reg);
                      setDestinationName(availableDestinations[reg][0].name);
                    }}
                    className={`py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                      selectedRegion === reg
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {reg === 'MP' ? (isHindi ? 'मध्य प्रदेश (MP)' : 'Madhya Pradesh') : (isHindi ? 'पवित्र भारत (India)' : 'Incredible India')}
                  </button>
                ))}
              </div>

              <select
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 cursor-pointer focus:outline-none focus:border-orange-500"
              >
                {availableDestinations[selectedRegion].map((dest) => (
                  <option key={dest.name} value={dest.name}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Duration Slider & Group Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Duration Slider */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sky-600" /> {t.calcDurationLabel}</span>
                  <span className="text-orange-600 font-black text-sm">{durationDays} {t.calcDays}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              {/* Group Size Selector */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-sky-600" /> {t.calcTravelersLabel}</span>
                  <span className="text-orange-600 font-black text-sm">{travelers} {t.calcGuests}</span>
                </div>
                <div className="flex items-center justify-between bg-white p-1 rounded-xl border border-slate-200">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelers(num)}
                      className={`w-8 h-7 rounded-lg text-xs font-black transition-all ${
                        travelers === num
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {num}{num === 8 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Step 3: Travel Comfort Style */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-black mb-2">
                {t.calcStep3}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Budget', label: t.calcTierBudget, desc: 'सेडान (Dzire) कार' },
                  { id: 'Standard', label: t.calcTierStandard, desc: 'फैमिली (Ertiga) कार' },
                  { id: 'Luxury', label: t.calcTierLuxury, desc: 'प्रीमियम (Innova) कार' }
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setTravelStyle(style.id)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      travelStyle === style.id
                        ? 'bg-orange-50 border-orange-500 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="font-black text-xs mb-1 flex items-center justify-between">
                      <span className="truncate">{style.label}</span>
                      {travelStyle === style.id && <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Included Amenities Highlights: Clean & Balanced */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> दैनिक समाचार पत्र
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> GPS व लाइव कैमरा
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ड्राइवर भत्ता शामिल
              </span>
            </div>

          </div>

          {/* Estimation Result Summary Card */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-3xl border border-orange-200 shadow-xl relative overflow-hidden text-left">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-orange-600 font-black flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'किराया विवरण' : 'Fare Summary'}</span>
                </span>
                <h3 className="text-base font-bold font-serif text-slate-900 mt-0.5">{isHindi ? 'अनुमानित पैकेज' : 'Cost Breakdown'}</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                {travelStyle}
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs text-slate-700 mb-5 font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">{isHindi ? 'गंतव्य:' : 'Destination:'}</span>
                <span className="text-slate-900 text-right font-bold truncate max-w-[200px]">{destinationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">{isHindi ? 'अवधि व लोग:' : 'Duration:'}</span>
                <span className="text-slate-900 font-bold">{durationDays} {t.calcDays} / {travelers} {t.calcGuests}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100">
                <span className="text-slate-500 font-medium">{t.calcPerPersonShare}</span>
                <span className="text-slate-900 font-black">
                  {formatPrice(Math.round(estimatedTotalINR / travelers), currency)}
                </span>
              </div>
            </div>

            {/* Total Highlight Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center mb-5">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-black block mb-1">
                {t.calcEstTotal}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-orange-600 font-serif tracking-tight">
                {formatPrice(estimatedTotalINR, currency)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium block mt-1">
                {isHindi ? 'टैक्स, एसी कार व ड्राइवर भत्ता शामिल।' : 'Taxes, fuel & chauffeur allowance included.'}
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleApply}
              className="btn-shimmer w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.calcApplyBtn}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{t.calcZeroFee}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TripCalculator;
