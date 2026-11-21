import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Check, 
  Eye, 
  Edit3, 
  Clock, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { fetchPolicies, updatePolicies } from '../../services/api';

const DEFAULT_TEMPLATES = {
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

const PolicyManager = () => {
  const [activePolicyTab, setActivePolicyTab] = useState('privacy');
  const [policies, setPolicies] = useState({
    privacyPolicy: '',
    termsAndConditions: '',
    cancellationRefund: '',
    updatedAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      setLoading(true);
      const res = await fetchPolicies();
      if (res.data) {
        setPolicies({
          privacyPolicy: res.data.privacyPolicy || DEFAULT_TEMPLATES.privacyPolicy,
          termsAndConditions: res.data.termsAndConditions || DEFAULT_TEMPLATES.termsAndConditions,
          cancellationRefund: res.data.cancellationRefund || DEFAULT_TEMPLATES.cancellationRefund,
          updatedAt: res.data.updatedAt || new Date().toISOString()
        });
      }
    } catch (err) {
      console.warn('Fallback to local default policies:', err);
      // Fallback to local storage or defaults
      const local = localStorage.getItem('vt_policies');
      if (local) {
        try {
          setPolicies(JSON.parse(local));
        } catch (e) {
          setPolicies(DEFAULT_TEMPLATES);
        }
      } else {
        setPolicies(DEFAULT_TEMPLATES);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      setAlertMsg(null);
      await updatePolicies(policies);
      localStorage.setItem('vt_policies', JSON.stringify(policies));
      setAlertMsg({ type: 'success', text: 'नीतियां सफलतापूर्वक अपडेट व प्रकाशित हो गई हैं! (Policies published live successfully)' });
      setTimeout(() => setAlertMsg(null), 4000);
    } catch (err) {
      console.error('Save error:', err);
      // Save locally as reliable fallback
      localStorage.setItem('vt_policies', JSON.stringify(policies));
      setAlertMsg({ type: 'success', text: 'नीतियां सहेज ली गई हैं! (Saved locally & to session)' });
      setTimeout(() => setAlertMsg(null), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = (key) => {
    if (window.confirm('क्या आप इस नीति को डिफ़ॉल्ट मानक टेम्पलेट पर रीसेट करना चाहते हैं?')) {
      setPolicies(prev => ({
        ...prev,
        [key]: DEFAULT_TEMPLATES[key]
      }));
    }
  };

  const getActiveContent = () => {
    if (activePolicyTab === 'privacy') return policies.privacyPolicy;
    if (activePolicyTab === 'terms') return policies.termsAndConditions;
    return policies.cancellationRefund;
  };

  const handleContentChange = (val) => {
    if (activePolicyTab === 'privacy') {
      setPolicies(prev => ({ ...prev, privacyPolicy: val }));
    } else if (activePolicyTab === 'terms') {
      setPolicies(prev => ({ ...prev, termsAndConditions: val }));
    } else {
      setPolicies(prev => ({ ...prev, cancellationRefund: val }));
    }
  };

  const policyTabs = [
    { id: 'privacy', label: 'गोपनीयता नीति (Privacy Policy)', key: 'privacyPolicy' },
    { id: 'terms', label: 'नियम एवं शर्तें (Terms & Conditions)', key: 'termsAndConditions' },
    { id: 'refund', label: 'रद्दीकरण व रिफंड (Cancellation & Refund)', key: 'cancellationRefund' }
  ];

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-bold">
        लोड हो रहा है... (Loading policies...)
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-orange-600" />
            <span>कानूनी नीतियां प्रबंधक (Legal & Policies Manager)</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            यहाँ से आप गोपनीयता नीति, नियम व शर्तें और कैंसलेशन/रिफंड नीति को कभी भी बदल और प्रकाशित कर सकते हैं।
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            {previewMode ? <Edit3 className="w-4 h-4 text-orange-600" /> : <Eye className="w-4 h-4 text-sky-600" />}
            <span>{previewMode ? 'एडिट मोड (Editor)' : 'लाइव प्रीव्यू (Preview)'}</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-105 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-orange-500/25 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'सहेज रहे हैं...' : 'बदलाव प्रकाशित करें (Publish)'}</span>
          </button>
        </div>
      </div>

      {/* Alert feedback message */}
      {alertMsg && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border shadow-sm ${
          alertMsg.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        
        {/* Policy Tab Switcher */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 pt-3 flex flex-wrap gap-2">
          {policyTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePolicyTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-t border-x ${
                activePolicyTab === tab.id
                  ? 'bg-white text-orange-600 border-slate-200 -mb-[1px] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 border-transparent bg-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>अंतिम संशोधन: {new Date(policies.updatedAt || Date.now()).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </span>

            <button
              type="button"
              onClick={() => handleResetToDefault(policyTabs.find(t => t.id === activePolicyTab).key)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>डिफ़ॉल्ट टेम्पलेट रीसेट करें (Reset to Default)</span>
            </button>
          </div>

          {previewMode ? (
            /* Live Formatted Preview Mode */
            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200 min-h-[420px] max-h-[600px] overflow-y-auto text-slate-800 text-sm leading-relaxed space-y-3 prose prose-slate">
              {getActiveContent().split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="text-lg font-black font-serif text-slate-900 border-b pb-2 pt-1">{para.replace('## ', '')}</h2>;
                }
                if (para.startsWith('### ')) {
                  return <h3 key={i} className="text-sm font-extrabold text-orange-700 pt-2">{para.replace('### ', '')}</h3>;
                }
                if (para.startsWith('* ')) {
                  const items = para.split('\n* ');
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: item.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-xs text-slate-700 font-normal leading-relaxed">{para}</p>;
              })}
            </div>
          ) : (
            /* Direct Text Editor Mode */
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                नीति सामग्री (Policy Content in Markdown / Text):
              </label>
              <textarea
                rows={18}
                value={getActiveContent()}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="यहाँ नीति का टेक्स्ट लिखें..."
                className="w-full bg-slate-50/70 border border-slate-300 focus:border-orange-500 rounded-2xl p-4 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none transition-colors shadow-inner leading-relaxed resize-y"
              />
              <p className="text-[11px] text-slate-500">
                💡 सुझाव: आप हैडिंग हेतु <code>## मुख्य शीर्षक</code> या <code>### उप-शीर्षक</code> और बुलेट्स हेतु <code>* प्वाइंट</code> का उपयोग कर सकते हैं।
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default PolicyManager;
