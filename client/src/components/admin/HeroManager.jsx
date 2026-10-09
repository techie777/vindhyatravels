import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Save, CheckCircle2, Sparkles } from 'lucide-react';
import { fetchHeroSettings, updateHeroSettings } from '../../services/api';

import ImageUpload from '../common/ImageUpload';

const HeroManager = () => {
  const [heroSettings, setHeroSettings] = useState({
    heroImage: '',
    titlePrefix: '',
    titleHighlight: '',
    subtitle: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetchHeroSettings();
      if (res.data) setHeroSettings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      await updateHeroSettings(heroSettings);
      setMsg({ type: 'success', text: 'Hero background image & titles updated successfully!' });
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      console.error('Error updating hero settings:', err);
      const serverMsg = err.response?.data?.message || err.message;
      setMsg({ type: 'error', text: serverMsg ? `Failed: ${serverMsg}` : 'Failed to update hero settings.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-xl font-bold font-serif text-slate-900">Hero Section Background & Image Control</h3>
        <p className="text-xs text-slate-500 font-medium">Control the Hero section visual backdrop image, headline text, and subtitle dynamically.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 text-xs font-bold">Loading Hero settings...</div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
          
          {msg && (
            <div className={`p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-2 ${
              msg.type === 'success' ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            
            {/* System File Image Upload Control */}
            <ImageUpload
              label="Hero Background Image (Car Scene Photo)"
              helpText="Upload a vehicle or scenery image directly from your system or enter a web link."
              value={heroSettings.heroImage}
              onChange={(imgUrl) => setHeroSettings({ ...heroSettings, heroImage: imgUrl })}
              required
              aspectRatio="banner"
            />

            {/* Title Prefix & Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Title Prefix (e.g. विंध्याचल ट्रेवल्स के साथ करें)</label>
                <input
                  type="text"
                  value={heroSettings.titlePrefix}
                  onChange={(e) => setHeroSettings({ ...heroSettings, titlePrefix: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Title Highlight (e.g. सुरक्षित एवं आरामदायक यात्रा)</label>
                <input
                  type="text"
                  value={heroSettings.titleHighlight}
                  onChange={(e) => setHeroSettings({ ...heroSettings, titleHighlight: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Hero Subtitle (SEO Keywords Description)</label>
              <textarea
                rows={3}
                value={heroSettings.subtitle}
                onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-slate-900 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md shadow-orange-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving Changes...' : 'Save Hero Settings'}</span>
            </button>

          </form>

        </div>
      )}

    </div>
  );
};

export default HeroManager;
