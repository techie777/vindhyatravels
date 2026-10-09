import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquarePlus, Quote, X, Send } from 'lucide-react';
import { fetchPublicReviews, submitReview } from '../services/api';
import { translations } from '../utils/translations';

import ImageUpload from './common/ImageUpload';

const Testimonials = ({ lang }) => {
  const t = translations[lang] || translations.hi;
  const isHindi = lang === 'hi';

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    location: '',
    comment: '',
    avatar: ''
  });
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await fetchPublicReviews();
      setReviews(res.data);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      const res = await submitReview(formData);
      setMsg({ type: 'success', text: res.data.message || (isHindi ? 'समीक्षा सफलतापूर्वक सबमिट की गई!' : 'Review submitted successfully!') });
      setFormData({ author: '', rating: 5, location: '', comment: '' });
      setTimeout(() => {
        setOpenModal(false);
        setMsg(null);
      }, 2500);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || (isHindi ? 'समीक्षा सबमिट करने में विफल।' : 'Failed to submit review.') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Emotional & Warm */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-black mb-3">
              <Quote className="w-4 h-4 text-orange-600" />
              <span>{isHindi ? 'सच्चे अनुभव' : 'TRAVELER FEEDBACK'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
              {t.revTitlePrefix} <span className="text-gradient-coral">{t.revTitleHighlight}</span>
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-base font-medium max-w-xl">
              {t.revSubtitle}
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl sm:rounded-2xl bg-orange-50 border border-orange-200 hover:bg-orange-100 text-orange-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4 text-orange-600" />
            <span>{t.revWriteBtn}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-xs font-bold">Loading reviews...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden text-left"
              >
                <Quote className="absolute -top-2 -right-2 w-20 h-20 text-slate-200/60 stroke-1 pointer-events-none" />

                <div>
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Metadata */}
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                  <img
                    src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-sky-400"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-serif">{rev.author}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{rev.location || (isHindi ? 'सत्यापित यात्री' : 'Verified Traveler')}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl text-left">
            
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-1">{isHindi ? 'अपना अनुभव साझा करें' : 'Share Your Experience'}</h3>
            <p className="text-slate-500 text-xs mb-6">{isHindi ? 'आपकी समीक्षा भविष्य के यात्रियों को आत्मविश्वास से यात्रा करने में मदद करती है।' : 'Your review helps future travelers explore MP & India with confidence.'}</p>

            {msg && (
              <div className={`p-3 rounded-xl text-xs font-semibold mb-4 ${
                msg.type === 'success' ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {msg.text}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-700 font-bold mb-1">{isHindi ? 'आपका पूरा नाम *' : 'Your Name *'}</label>
                <input
                  type="text"
                  required
                  placeholder={isHindi ? 'उदा. रमेश चंद्र' : 'e.g. Ramesh Chandra'}
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 font-bold mb-1">{isHindi ? 'शहर / स्थान' : 'Location / City'}</label>
                  <input
                    type="text"
                    placeholder={isHindi ? 'उदा. भोपाल, मध्य प्रदेश' : 'e.g. Bhopal, MP'}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-bold mb-1">{isHindi ? 'रेटिंग (1 से 5 স্টার) *' : 'Rating (1 to 5) *'}</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold cursor-pointer"
                  >
                    <option value={5}>5 Stars - {isHindi ? 'उत्कृष्ट' : 'Exceptional'}</option>
                    <option value={4}>4 Stars - {isHindi ? 'बहुत अच्छा' : 'Very Good'}</option>
                    <option value={3}>3 Stars - {isHindi ? 'अच्छा' : 'Good'}</option>
                    <option value={2}>2 Stars - {isHindi ? 'सामान्य' : 'Average'}</option>
                    <option value={1}>1 Star - {isHindi ? 'खराब' : 'Poor'}</option>
                  </select>
                </div>
              </div>

              <ImageUpload
                label={isHindi ? 'आपकी फोटो / प्रोफाइल पिक्चर (ऐच्छिक)' : 'Your Photo / Profile Picture (Optional)'}
                helpText={isHindi ? 'अपने डिवाइस से फोटो चुनें' : 'Upload your photo directly from your device system'}
                value={formData.avatar}
                onChange={(imgUrl) => setFormData({ ...formData, avatar: imgUrl })}
                aspectRatio="square"
              />

              <div>
                <label className="block text-xs text-slate-700 font-bold mb-1">{isHindi ? 'आपकी समीक्षा *' : 'Your Review *'}</label>
                <textarea
                  rows={3}
                  required
                  placeholder={isHindi ? 'अपनी यात्रा, कार सफाई, ड्राइवर व्यवहार और अनुभव का वर्णन करें...' : 'Describe your experience...'}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-slate-900 resize-none font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? (isHindi ? 'सबमिट हो रहा है...' : 'Submitting...') : (isHindi ? 'रिव्यू सबमिट करें' : 'Submit Review')}</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};

export default Testimonials;
