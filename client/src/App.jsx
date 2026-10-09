import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vehicles from './components/Vehicles';
import Destinations from './components/Destinations';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  // Splash screen state (shows once on initial load)
  const [showSplash, setShowSplash] = useState(true);

  // Bilingual state: default selected on Hindi ('hi')
  const [lang, setLang] = useState('hi');
  const [currency, setCurrency] = useState('INR');
  
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState('user'); // 'user' | 'admin'

  // Pre-filled booking data passed to Enquiry Form
  const [prefilledBooking, setPrefilledBooking] = useState(null);
  
  // Search parameters passed from Hero search
  const [heroSearch, setHeroSearch] = useState({ category: 'MP', query: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }

    // Check URL route slug: /admin or #admin
    const checkAdminRoute = () => {
      const isPathAdmin = window.location.pathname.toLowerCase().startsWith('/admin');
      const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
      
      if (isPathAdmin || isHashAdmin) {
        const tokenExists = !!localStorage.getItem('adminToken');
        if (tokenExists) {
          setViewMode('admin');
          setShowAdminLogin(false);
        } else {
          setShowAdminLogin(true);
          setViewMode('user');
        }
      } else {
        setViewMode('user');
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
    setViewMode('admin');
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdminLoggedIn(false);
    setViewMode('user');
    window.location.hash = '';
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleExitAdmin = () => {
    setViewMode('user');
    window.location.hash = '';
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleSelectBookingDestination = (destination) => {
    setPrefilledBooking({
      destination: destination.destination || destination.title,
      estimatedCost: destination.price || destination.estimatedCost || 0
    });
    const formElem = document.getElementById('book') || document.getElementById('enquiry');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (category, query) => {
    setHeroSearch({ category, query });
  };

  // If visiting /admin or #admin route and logged in
  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        currency={currency}
        onExit={handleExitAdmin}
        onLogout={handleLogoutAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      
      {/* 🌟 Divine Premium Welcome Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* 1. Header Navigation with Top Shree Ganeshay Namah Mantra Bar */}
      <Navbar
        lang={lang}
        setLang={setLang}
      />

      {/* Main Traveler Landing Experience (Clean Flow Merged with Brand Colors & Full Data) */}
      <main className="flex-grow pt-8">
        
        {/* 2. Hero Section - With Instant Fare Finder, Deep Dark Slate + Gold Accents */}
        <Hero
          lang={lang}
          onSearch={handleHeroSearch}
        />

        {/* 3. Destinations Section (लोकप्रिय यात्राएँ - MP & India Packages) */}
        <Destinations
          lang={lang}
          currency={currency}
          onSelectBooking={handleSelectBookingDestination}
          initialCategory={heroSearch.category}
          initialSearch={heroSearch.query}
        />

        {/* 4. Vehicles Fleet Section (हमारी गाड़ियाँ - AC, GPS, Live Cam) */}
        <Vehicles
          lang={lang}
          currency={currency}
          onSelectBooking={handleSelectBookingDestination}
        />

        {/* 5. Why Choose Us (हमें क्यों चुनें - 4 Scannable Core Highlights) */}
        <WhyUs lang={lang} />

        {/* 6. FAQ Section (अक्सर पूछे गए सवाल) */}
        <FAQ lang={lang} />

        {/* 8. Enquiry & Booking Form (बुकिंग पूछताछ - 4 Simple Fields) */}
        <EnquiryForm lang={lang} prefilledData={prefilledBooking} />

      </main>

      {/* 9. Footer */}
      <Footer lang={lang} />

      {/* 10. Mobile Bottom Action Bar (📞 कॉल करें / 💬 WhatsApp) + Desktop Floating CTA */}
      <FloatingCTA lang={lang} />

      {/* 12. Floating Go to Top Button */}
      <ScrollToTop lang={lang} />

      {/* Admin Login Modal for /admin slug or route */}
      {showAdminLogin && (
        <AdminLogin
          onClose={() => {
            setShowAdminLogin(false);
            window.location.hash = '';
            if (window.location.pathname === '/admin') {
              window.history.pushState({}, '', '/');
            }
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}

export default App;
