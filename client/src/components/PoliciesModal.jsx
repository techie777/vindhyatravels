import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, RotateCcw, Phone, Mail, Clock } from 'lucide-react';
import { fetchPolicies } from '../services/api';

const DEFAULT_POLICIES = {
  privacyPolicy: `## गोपनीयता नीति (Privacy Policy) - विंध्याचल ट्रेवल्स इंदौर

विंध्याचल ट्रेवल्स (Vindhya Travels, Indore) में हम आपके व्यक्तिगत डेटा और गोपनीयता का पूर्ण सम्मान करते हैं। यह नीति स्पष्ट करती है कि हमारी वेबसाइट (vindhyatravels.com) और बुकिंग सेवाओं के माध्यम से हम आपकी जानकारी कैसे एकत्र, सुरक्षित और उपयोग करते हैं।

### 1. एकत्र की जाने वाली जानकारी (Information We Collect)
* **व्यक्तिगत विवरण:** आपका नाम, मोबाइल / व्हाट्सऐप नंबर, ईमेल पता।
* **यात्रा विवरण:** पिकअप एवं ड्रॉप स्थान, यात्रा की तारीख, समय, चुने गए वाहन का प्रकार तथा सह-यात्रियों की संख्या।
* **तकनीकी डेटा:** आईपी पता, ब्राउज़र प्रकार, एवं वेबसाइट उपयोग से जुड़े सामान्य एनालिटिक्स।

### 2. जानकारी का उपयोग (How We Use Your Data)
* आपकी टैक्सी बुकिंग और यात्रा की पुष्टि करने के लिए।
* वाहन चालक (Driver) के साथ समन्वय तथा लाइव पिकअप अपडेट साझा करने के लिए।
* यात्रा का पारदर्शी बिल, रसीद एवं व्हाट्सऐप पर तुरंत सहायता प्रदान करने के लिए।
* सेवा में सुधार एवं ग्राहक संतुष्टि सर्वेक्षण के लिए।

### 3. डेटा सुरक्षा एवं गोपनीयता गारंटी (Data Protection Guarantee)
* हम आपकी व्यक्तिगत जानकारी को किसी भी तीसरे पक्ष (Third Party) को बेचते, किराए पर देते या व्यावसायिक लाभ हेतु साझा नहीं करते हैं।
* आपका मोबाइल नंबर केवल विंध्याचल ट्रेवल्स की आधिकारिक यात्रा सेवाओं हेतु ही प्रयोग किया जाता है।

### 4. संपर्क विवरण (Grievance & Contact)
यदि आपके पास हमारी गोपनीयता नीति के संबंध में कोई प्रश्न या सुझाव हैं, तो कृपया हमसे संपर्क करें:
* **फोन:** +91 96852 32340
* **ईमेल:** booking@vindhyatravels.com
* **कार्यालय:** विंध्याचल ट्रेवल्स, इंदौर, मध्य प्रदेश।`,

  termsAndConditions: `## नियम एवं शर्तें (Terms & Conditions) - विंध्याचल ट्रेवल्स

विंध्याचल ट्रेवल्स की टैक्सी एवं टूर पैकेज सेवाओं की बुकिंग करके ग्राहक निम्नलिखित नियमों एवं शर्तों से सहमत होते हैं:

### 1. बुकिंग एवं पुष्टि (Booking & Confirmation)
* बुकिंग की पुष्टि वेबसाइट, व्हाट्सऐप या फोन कॉल के माध्यम से की जा सकती है।
* आउटस्टेशन या विशेष टूर पैकेज (जैसे महाकाल उज्जैन, ओंकारेश्वर, पचमढ़ी) हेतु अग्रिम टोकन राशि ली जा सकती है।

### 2. किराया एवं अतिरिक्त शुल्क (Fare & Extra Charges)
* **आधार किराया:** किराया प्रति किलोमीटर की निर्धारित दर (जैसे स्विफ्ट डिजायर ₹12/किमी, अर्टिगा ₹16/किमी, इनोवा क्रिस्टा ₹20/किमी) के आधार पर तय होता है।
* **टोल एवं पार्किंग:** यात्रा के दौरान आने वाले टोल प्लाजा टैक्स, स्टेट बॉर्डर एंट्री टैक्स और पार्किंग शुल्क वास्तविक सरकारी पर्ची अनुसार यात्री द्वारा देय होंगे।
* **ड्राइवर भत्ता (Driver Batta):** रात्रि 10:00 बजे से प्रातः 6:00 बजे तक अथवा निर्धारित आउटस्टेशन नियमों अनुसार लागू होगा।
* **न्यूनतम आउटस्टेशन रन:** आउटस्टेशन राउंड ट्रिप हेतु प्रतिदिन न्यूनतम 250 किमी का औसत चार्ज लागू होता है।

### 3. वाहन उपयोग एवं यात्री आचार संहिता (Vehicle Usage & Safety)
* वाहन में क्षमता से अधिक सवारी बैठाना गैरकानूनी है। तय सीटिंग क्षमता (4+1 या 6+1) का पालन अनिवार्य है।
* गाड़ी के भीतर धूम्रपान, शराब का सेवन या किसी भी गैरकानूनी सामग्री का परिवहन पूर्णतः वर्जित है।
* किसी अप्रत्याशित यांत्रिक खराबी या ट्रैफिक जाम की स्थिति में विंध्याचल ट्रेवल्स यथाशीघ्र वैकल्पिक व्यवस्था उपलब्ध कराने का पूरा प्रयास करेगा।

### 4. कानूनी क्षेत्राधिकार (Jurisdiction)
* सभी कानूनी विवादों का निपटारा इंदौर (मध्य प्रदेश) न्यायालय के अधिकार क्षेत्र के अधीन होगा।`,

  cancellationRefund: `## रद्दीकरण एवं धनवापसी नीति (Cancellation & Refund Policy)

विंध्याचल ट्रेवल्स इंदौर अपने सम्मानित ग्राहकों को सुगम, पारदर्शी और तनावमुक्त रद्दीकरण एवं रिफंड नीति प्रदान करता है:

### 1. रद्दीकरण की समय-सीमा एवं शुल्क (Cancellation Timeline)
* **यात्रा समय से 24 घंटे पूर्व रद्दीकरण:** 100% पूर्ण धनवापसी (Full Refund), कोई रद्दीकरण शुल्क नहीं।
* **यात्रा समय से 12 से 24 घंटे पूर्व रद्दीकरण:** अग्रिम टोकन राशि का 15% प्रशासनिक शुल्क काटा जाएगा, शेष 85% वापस।
* **यात्रा समय से 6 से 12 घंटे पूर्व रद्दीकरण:** अग्रिम टोकन राशि का 30% शुल्क।
* **यात्रा समय से 6 घंटे से कम या नो-शो (No Show):** गाड़ी ड्राइवर के पिकअप स्थल हेतु रवाना हो जाने के बाद रद्दीकरण पर न्यूनतम ईंधन/ड्राइवर चार्ज (₹500 - ₹1000) काटा जाएगा।

### 2. हमारी ओर से रद्दीकरण (Cancellation by Vindhya Travels)
* यदि किसी आकस्मिक कारणवश (जैसे भारी प्राकृतिक आपदा, वाहन दुर्घटना या तकनीकी खराबी) विंध्याचल ट्रेवल्स सेवा प्रदान करने में असमर्थ रहता है, तो ग्राहक को तत्काल 100% पूर्ण रिफंड अथवा तुरंत वैकल्पिक वाहन प्रदान किया जाएगा।

### 3. धनवापसी की प्रक्रिया एवं समय (Refund Process & SLA)
* रिफंड का अनुरोध स्वीकृत होने के **3 से 5 कार्य दिवसों (Working Days)** के भीतर राशि सीधे ग्राहक के मूल बैंक खाते / UPI / कार्ड में वापस जमा कर दी जाती है।
* रद्दीकरण अनुरोध दर्ज कराने हेतु ग्राहक हमारे हेल्पलाइन नंबर **+91 96852 32340** पर कॉल या व्हाट्सऐप कर सकते हैं।`
};

const PoliciesModal = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [policies, setPolicies] = useState(DEFAULT_POLICIES);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    fetchPolicies()
      .then(res => {
        if (res.data) {
          setPolicies({
            privacyPolicy: res.data.privacyPolicy || DEFAULT_POLICIES.privacyPolicy,
            termsAndConditions: res.data.termsAndConditions || DEFAULT_POLICIES.termsAndConditions,
            cancellationRefund: res.data.cancellationRefund || DEFAULT_POLICIES.cancellationRefund,
            updatedAt: res.data.updatedAt
          });
        }
      })
      .catch(() => {
        const local = localStorage.getItem('vt_policies');
        if (local) {
          try {
            setPolicies(JSON.parse(local));
          } catch (e) {}
        }
      });
  }, [isOpen]);

  // Lock scroll when open, restore on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label: '🔒 गोपनीयता नीति (Privacy)', content: policies.privacyPolicy },
    { id: 'terms', label: '📜 नियम एवं शर्तें (Terms)', content: policies.termsAndConditions },
    { id: 'refund', label: '🔄 रद्दीकरण व रिफंड (Refund)', content: policies.cancellationRefund }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];

  const modalNode = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden">
        
        {/* Backdrop click */}
        <div 
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black font-serif leading-tight">
                  नीतियां एवं शर्तें (Policies & Terms)
                </h3>
                <span className="text-[11px] text-slate-300">
                  विंध्याचल ट्रेवल्स इंदौर • आधिकारिक नियम
                </span>
              </div>
            </div>

            {/* Single Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 pt-2 flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-t border-x ${
                  activeTab === tab.id
                    ? 'bg-white text-orange-600 border-slate-200 -mb-[1px] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-transparent bg-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Policy Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-3.5 text-slate-800 text-sm leading-relaxed">
            {currentTabObj.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-lg sm:text-xl font-black font-serif text-slate-900 border-b border-slate-200 pb-2 pt-1">
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              if (para.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-sm sm:text-base font-extrabold text-orange-600 pt-3 flex items-center gap-1.5">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('* ')) {
                const items = para.split('\n* ');
                return (
                  <ul key={i} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Footer inside Modal */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <Phone className="w-3.5 h-3.5 text-orange-500" /> +91 96852 32340
              </span>
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <Mail className="w-3.5 h-3.5 text-orange-500" /> booking@vindhyatravels.com
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              समझ गए एवं बंद करें (Close)
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
};

export default PoliciesModal;
