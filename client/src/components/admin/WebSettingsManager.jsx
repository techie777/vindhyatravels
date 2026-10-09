import React, { useState, useEffect } from 'react';
import { Settings, Save, Phone, MessageSquare, MapPin, Bell, Globe, Check } from 'lucide-react';

const WebSettingsManager = () => {
  const [settings, setSettings] = useState({
    siteName: 'Vindhyanchal Travels',
    phone: '+91 96852 32340',
    whatsapp: '+91 96852 32340',
    email: 'booking@vindhyatravels.com',
    address: 'Maihar Road, Rewa / Satna, Vindhyanchal Region, Madhya Pradesh',
    enablePromoBar: true,
    promoText: '✨ Special Maihar Devi & Khajuraho Tour Packages Booking Available! Call Now for Taxi Booking.',
    currency: 'INR'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const localSet = localStorage.getItem('vt_web_settings');
    if (localSet) {
      try {
        setSettings(JSON.parse(localSet));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('vt_web_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-900">Website Settings & Control</h3>
          <p className="text-xs text-slate-500 font-medium">Manage phone numbers, WhatsApp contact, announcement bar, and site preferences.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Website settings updated successfully! Changes saved to browser & session control.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Contact Information Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h4 className="text-sm font-extrabold font-serif text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-orange-500" />
            <span>Contact & Helpline Numbers</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Business / Brand Name</label>
              <input
                type="text"
                required
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Customer Helpline Phone Number</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Direct WhatsApp Booking Number</label>
              <input
                type="text"
                required
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Support Email Address</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 text-xs">Office & Regional Location Address</label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900 resize-none"
            />
          </div>
        </div>

        {/* Promo Top Announcement Banner Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h4 className="text-sm font-extrabold font-serif text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-500" />
            <span>Top Announcement Banner</span>
          </h4>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="promoCheck"
              checked={settings.enablePromoBar}
              onChange={(e) => setSettings({ ...settings, enablePromoBar: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="promoCheck" className="text-xs text-slate-800 font-bold cursor-pointer">
              Display top promo announcement banner on website header
            </label>
          </div>

          {settings.enablePromoBar && (
            <div>
              <label className="block text-slate-700 font-bold mb-1 text-xs">Announcement Text Message</label>
              <input
                type="text"
                value={settings.promoText}
                onChange={(e) => setSettings({ ...settings, promoText: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Website Control Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default WebSettingsManager;
