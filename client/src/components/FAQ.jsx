import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { translations } from '../utils/translations';

const FAQ = ({ lang }) => {
  const t = translations[lang] || translations.hi;
  const [openIdx, setOpenIdx] = useState(0);
  const isHindi = lang === 'hi';

  const faqs = [
    {
      q: isHindi 
        ? 'मध्य प्रदेश के धार्मिक स्थलों (महाकाल, खजुराहो) एवं राष्ट्रीय उद्यान (कान्हा, पेंच) घूमने का सबसे अच्छा समय क्या है?'
        : 'What is the best time to visit Madhya Pradesh tiger reserves (Kanha, Bandhavgarh, Pench)?',
      a: isHindi
        ? 'मध्य प्रदेश में दर्शन एवं पर्यटन का सबसे अच्छा समय अक्टूबर से जून के बीच है। मानसून के दौरान (जुलाई से सितंबर) जंगल सफारी कोर जोन बंद रहते हैं। उज्जैन महाकाल, ओंकारेश्वर एवं खजुराहो दर्शन हेतु वर्ष भर उत्तम मौसम रहता है।'
        : 'The best season for wildlife safaris in MP is between October and June. Core zones are closed during monsoon (July to September). For high tiger sighting probabilities, March through May is ideal.'
    },
    {
      q: isHindi
        ? 'टैक्सी या टूर पैकेज बुकिंग कैसे काम करती है?'
        : 'How does booking a customized tour package work?',
      a: isHindi
        ? 'बस अपनी पसंद की कार या स्थान चुनें अथवा हमारे किराया कैलकुलेटर का उपयोग करें। बुकिंग फॉर्म भरें, हमारे यात्रा विशेषज्ञ 15 मिनट के भीतर आपसे संपर्क कर होटल, कार एवं यात्रा मार्ग को आपकी पसंद अनुसार फाइनल करेंगे।'
        : 'Simply select your preferred destination or use our interactive Trip Calculator. Submit an enquiry, and our dedicated travel expert will contact you within 2 hours to fine-tune your itinerary, hotels, and vehicle preferences.'
    },
    {
      q: isHindi
        ? 'क्या कार में निःशुल्क समाचार पत्र, जीपीएस एवं इन-कार सुरक्षा कैमरा शामिल हैं?'
        : 'Are free newspapers, GPS tracking, and in-car safety cameras included?',
      a: isHindi
        ? 'हाँ! हमारी सभी गाड़ियों में हिंदी एवं अंग्रेजी दैनिक समाचार पत्र, लाइव जीपीएस लोकेशन ट्रैकिंग, डुअल डैशकैम रिकॉर्डिंग एवं इन-कैबिन सुरक्षा कैमरा निःशुल्क शामिल हैं।'
        : 'Yes! All our vehicles come equipped with complimentary daily Hindi & English newspapers, live GPS tracking, dual dashcams, and in-cabin safety cameras.'
    },
    {
      q: isHindi
        ? 'भुगतान के क्या विकल्प और बुकिंग राशि आवश्यक है?'
        : 'What payment options and booking deposit are required?',
      a: isHindi
        ? 'हम यूपीआई (GPay/PhonePe), नेट बैंकिंग, क्रेडिट/डेबिट कार्ड एवं कैश स्वीकार करते हैं। 25% अग्रिम राशि से बुकिंग पक्की होती है, शेष राशि यात्रा के समय देय है।'
        : 'We accept Credit/Debit cards, Net Banking, UPI (GPay/PhonePe), and Cash. A 25% deposit reserves your tour, with the balance payable upon arrival.'
    },
    {
      q: isHindi
        ? 'क्या वरिष्ठ नागरिकों एवं बच्चों के लिए विशेष सुविधाएं उपलब्ध हैं?'
        : 'Can itineraries be customized for elderly family members or children?',
      a: isHindi
        ? 'बिल्कुल! हमारे सभी पैकेज 100% अनुकूलन योग्य हैं। हम बुजुर्गों के लिए सुलभ वाहन, ग्राउंड फ्लोर होटल कमरे, धीमी गति से दर्शन एवं विशेष भोजन व्यवस्था प्रदान करते हैं।'
        : 'Absolutely! All our packages are 100% tailor-made. We provide accessible vehicles, ground floor hotel accommodations, slow-paced sightseeing, and customized dietary arrangements.'
    }
  ];

  return (
    <section id="faq" className="py-20 relative z-10 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Reassuring & Clean */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-xs sm:text-sm font-bold mb-2.5">
            <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
            <span>{isHindi ? 'सवाल और जवाब' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
            {t.faqTitlePrefix} <span className="text-gradient-coral">{t.faqTitleHighlight}</span>
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4 text-left">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:border-orange-300 transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-4 sm:p-5 sm:p-6 text-left flex items-center justify-between font-bold text-slate-900 hover:text-orange-600 transition-colors text-sm sm:text-base md:text-lg leading-snug cursor-pointer gap-3"
              >
                <span className="pr-2">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-700 leading-relaxed font-normal border-t border-slate-100 pt-3.5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
