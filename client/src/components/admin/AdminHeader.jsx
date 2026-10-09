import React from 'react';
import { Menu, ExternalLink, LogOut, ChevronRight, Plus } from 'lucide-react';

const TAB_TITLES = {
  overview: { title: 'Dashboard Overview', subtitle: 'Live performance metrics, recent leads & system activity' },
  vehicles: { title: 'Vehicle Fleet Management', subtitle: 'Manage available cars, seat capacity, rates per KM & photos' },
  destinations: { title: 'Tour Packages Management', subtitle: 'Manage MP & All India tour destinations, pricing & details' },
  enquiries: { title: 'Customer Leads & Enquiries', subtitle: 'Review and update lead pipeline, booking dates & contact details' },
  reviews: { title: 'Review Moderation', subtitle: 'Approve or reject testimonials submitted by travelers' },
  hero: { title: 'Hero Banner Settings', subtitle: 'Customize main hero title, subtitle and background images' },
  settings: { title: 'Website Settings & Control', subtitle: 'Manage contact information, WhatsApp numbers & site parameters' }
};

const AdminHeader = ({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setMobileOpen, 
  onExit, 
  onLogout 
}) => {
  const currentTabInfo = TAB_TITLES[activeTab] || { title: 'Admin Portal', subtitle: 'Manage your travel web platform' };

  return (
    <header className={`fixed top-0 right-0 z-30 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200 ${
      collapsed ? 'left-0 md:left-20' : 'left-0 md:left-64'
    }`}>
      <div className="px-3 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
        
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 overflow-hidden">
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb & Section Title */}
          <div className="min-w-0 truncate">
            <div className="flex items-center space-x-1 text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider truncate">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-orange-600 truncate">{currentTabInfo.title}</span>
            </div>
            <h1 className="text-sm sm:text-base md:text-lg font-extrabold font-serif text-slate-900 truncate">
              {currentTabInfo.title}
            </h1>
          </div>
        </div>

        {/* Right Side: Quick Status, Actions & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          
          {/* Live API Badge */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>API Online</span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => setActiveTab('vehicles')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Manage Fleet</span>
          </button>

          {/* View Website Button */}
          <button
            onClick={onExit}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="View Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Site</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Logout Admin Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;
