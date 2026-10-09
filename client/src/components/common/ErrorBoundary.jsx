import React from 'react';
import { AlertTriangle, RefreshCw, PhoneCall, MessageCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] w-full p-6 flex items-center justify-center bg-slate-50 text-slate-900 rounded-3xl border border-slate-200 my-4 shadow-sm text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-xl font-black font-serif text-slate-900">
                सॉफ़्टवेयर अपडेट जारी है
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                पेज को एक बार रीफ़्रेश करें या सीधी बुकिंग के लिए हमें कॉल अथवा WhatsApp करें।
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>पेज रीफ़्रेश करें</span>
              </button>

              <a
                href="tel:+919685232340"
                className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>📞 96852 32340</span>
              </a>

              <a
                href="https://wa.me/919685232340?text=नमस्ते%20विंध्याचल%20ट्रेवल्स,%20मुझे%20टैक्सी%20बुकिंग%20करनी%20है।"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
