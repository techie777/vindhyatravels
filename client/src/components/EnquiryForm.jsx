import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, PhoneCall, Mail, MapPin, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import { translations } from '../utils/translations';

const EnquiryForm = ({ lang, prefilledData }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: 'उज्जैन महाकाल (Ujjain Mahakal)',
    travelDate: ''
  });

  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        destination: prefilledData.destination || prev.destination,
        travelDate: prefilledData.date || prev.travelDate
      }));
    }
  }, [prefilledData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const sanitized = value.replace(/[^A-Za-z\u0900-\u097F\s.-]/g, '').slice(0, 80);
      setFormData((prev) => ({ ...prev, name: sanitized }));
    } else if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    if (!formData.name || !formData.name.trim()) {
      setStatusMsg({
        type: 'error',
        text: isHindi ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name'
      });
      setLoading(false);
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      setStatusMsg({
        type: 'error',
        text: isHindi ? 'कृपया 10 अंकों का पूरा मोबाइल नंबर दर्ज करें' : 'Please enter a 10-digit mobile number'
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Save lead in backend DB
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        destination: formData.destination,
        travelDate: formData.travelDate,
        email: 'directlead@vindhyatravels.com',
        travelersCount: 4,
        travelStyle: 'Standard',
        specialRequests: `Direct 4-field inquiry for ${formData.destination} on ${formData.travelDate || 'flexible'}`
      });

      // 2. Direct WhatsApp Lead Message redirect to Admin (+919685232340)
      const whatsappMsg = `🚩 *बुकिंग पूछताछ - विंध्याचल ट्रेवल्स* 🚩\n\n👤 *नाम:* ${formData.name}\n📞 *मोबाइल:* ${formData.phone}\n📍 *कहाँ जाना है:* ${formData.destination}\n📅 *तारीख:* ${formData.travelDate || 'शीघ्र ही'}\n\n💬 *कृपया मुझे गाड़ी की उपलब्धता व किराया विवरण भेजें।*`;
      const whatsappUrl = `https://wa.me/919685232340?text=${encodeURIComponent(whatsappMsg)}`;
      
      setStatusMsg({
        type: 'success',
        text: isHindi
          ? 'धन्यवाद! आपकी पूछताछ प्राप्त हो गई है। हम 15 मिनट में WhatsApp/कॉल पर संपर्क करेंगे।'
          : 'Thank you! Enquiry received. We will contact you within 15 minutes.'
      });

      window.open(whatsappUrl, '_blank');

      setFormData({
        name: '',
        phone: '',
        destination: 'उज्जैन महाकाल (Ujjain Mahakal)',
        travelDate: ''
      });
    } catch (err) {
      // Still open WhatsApp even if local server has glitch
      const fallbackMsg = `नाम: ${formData.name}\nमोबाइल: ${formData.phone}\nकहाँ जाना है: ${formData.destination}\nतारीख: ${formData.travelDate || 'जल्द ही'}`;
      window.open(`https://wa.me/919685232340?text=${encodeURIComponent(fallbackMsg)}`, '_blank');
      
      setStatusMsg({
        type: 'success',
        text: isHindi ? 'WhatsApp पर भेजा जा रहा है...' : 'Redirecting to WhatsApp...'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-16 sm:py-24 relative z-10 bg-white">
      {/* Invisible anchor for backward compatibility */}
      <span id="enquiry" className="relative -top-24" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Ultra-Clean */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs sm:text-sm font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>{isHindi ? 'सफ़र की शुरुआत' : 'EASY BOOKING'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight leading-tight">
            {isHindi ? 'बुकिंग पूछताछ' : 'Booking Enquiry'}
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            {isHindi 
              ? 'सिर्फ़ 4 जानकारी। बाकी हम WhatsApp पर पूछ लेंगे।' 
              : 'Just 4 quick details. We’ll handle the rest on WhatsApp.'}
          </p>
        </div>

        <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-xl mx-auto text-left">
          
          {statusMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl mb-5 text-xs sm:text-sm font-bold flex items-center gap-2.5 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>{statusMsg.text}</span>
            </motion.div>
          )}

          {/* Clean 4-Field Form (From User Flow) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Name */}
            <div>
              <label className="block text-xs sm:text-sm text-slate-700 font-bold mb-1.5">
                {isHindi ? 'आपका नाम' : 'Your Name'} *
              </label>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                maxLength={80}
                placeholder={isHindi ? 'उदा. राम शर्मा' : 'e.g. Rahul Sharma'}
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-500 shadow-sm"
              />
            </div>

            {/* 2. Mobile Phone */}
            <div>
              <label className="block text-xs sm:text-sm text-slate-700 font-bold mb-1.5">
                {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'} *
              </label>
              <input
                type="tel"
                name="phone"
                required
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                placeholder="9685232340"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-500 shadow-sm"
              />
            </div>

            {/* 3. Destination */}
            <div>
              <label className="block text-xs sm:text-sm text-slate-700 font-bold mb-1.5">
                {isHindi ? 'कहाँ जाना है?' : 'Where do you want to go?'} *
              </label>
              <input
                type="text"
                name="destination"
                required
                placeholder={isHindi ? 'उदा. उज्जैन, ओंकारेश्वर, मांडू...' : 'e.g. Ujjain, Omkareshwar, Mandu...'}
                value={formData.destination}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-500 shadow-sm"
              />
            </div>

            {/* 4. Travel Date */}
            <div>
              <label className="block text-xs sm:text-sm text-slate-700 font-bold mb-1.5">
                {isHindi ? 'तारीख' : 'Travel Date'} *
              </label>
              <input
                type="date"
                name="travelDate"
                required
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-500 shadow-sm cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-shimmer w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{loading ? (isHindi ? 'भेजा जा रहा है...' : 'Sending...') : (isHindi ? 'WhatsApp पर भेजें' : 'Send on WhatsApp')}</span>
              </button>
            </div>

          </form>

          {/* Quick Helpline Strip */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500 font-medium gap-2">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <a href="tel:+919685232340" className="hover:text-orange-600 font-bold text-slate-800">+91 96852 32340</a>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <a href="mailto:booking@vindhyatravels.com" className="hover:text-sky-600 font-semibold">booking@vindhyatravels.com</a>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EnquiryForm;
