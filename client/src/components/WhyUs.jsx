import React from 'react';
import { Newspaper, Navigation, Compass, PhoneCall, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';

const WhyUs = ({ lang }) => {
  const isHindi = lang === 'hi';
  const t = translations[lang] || translations.hi;

  const features = [
    {
      emoji: '📰',
      title: isHindi ? 'मुफ़्त अख़बार' : 'Free Daily Newspaper',
      subtitle: isHindi ? 'दैनिक राष्ट्रीय हिंदी व अंग्रेज़ी' : 'National Hindi & English',
      desc: isHindi ? 'हर यात्रा में ताज़ा समाचार पत्र उपलब्ध।' : 'Complimentary daily papers in every cab.'
    },
    {
      emoji: '🛰️',
      title: isHindi ? 'GPS, डैशकैम व लाइव कैमरा' : 'GPS + Dashcam + Live Cam',
      subtitle: isHindi ? 'प्रत्येक गाड़ी में 100% सुरक्षा' : '100% Safety in Every Car',
      desc: isHindi ? 'लाइव ट्रैकिंग व महिलाओं/परिवारों की सुरक्षा।' : 'Real-time monitoring for total peace of mind.'
    },
    {
      emoji: '🧑‍✈️',
      title: isHindi ? 'सच्चा सारथी' : 'Respectful Chauffeurs',
      subtitle: isHindi ? 'स्थानीय जानकार व संस्कारी' : 'Polite Local Experts',
      desc: isHindi ? 'मंदिरों, शॉर्टकट रास्तों व नियमों के अनुभवी ड्राइवर।' : 'Deep local knowledge of sacred shrines & highways.'
    },
    {
      emoji: '☎️',
      title: isHindi ? '24 घंटे मदद' : '24/7 Dedicated Support',
      subtitle: isHindi ? 'कॉल या WhatsApp पर तुरंत' : 'Instant on Call or WhatsApp',
      desc: isHindi ? 'पूरी यात्रा के दौरान आपका समर्पित हेल्पलाइन।' : 'Available round the clock throughout your trip.'
    }
  ];

  return (
    <section id="why" className="py-16 sm:py-20 relative z-10 bg-slate-50 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs sm:text-sm font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>{isHindi ? 'हमें क्यों चुनें' : 'WHY CHOOSE US'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
            {t.whyTitlePrefix} <span className="text-gradient-coral">{t.whyTitleHighlight}</span>
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* 4 Clean Scannable Feature Cards (Zero Clutter) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-left">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-4xl block mb-2">{item.emoji}</span>
                <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-orange-600 mt-1">
                  {item.subtitle}
                </div>
              </div>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
