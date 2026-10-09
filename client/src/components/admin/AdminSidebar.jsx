import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ExternalLink, 
  ShieldCheck,
  X
} from 'lucide-react';

const AdminSidebar = ({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed, 
  mobileOpen, 
  setMobileOpen, 
  stats, 
  onExit, 
  onLogout 
}) => {

  const navItems = [
    { 
      id: 'overview', 
      label: 'Dashboard Overview', 
      icon: LayoutDashboard,
      badge: null,
      badgeColor: ''
    },
    { 
      id: 'vehicles', 
      label: 'Vehicle Fleet', 
      icon: Car, 
      badge: stats.vehiclesCount || null,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    { 
      id: 'destinations', 
      label: 'Tour Packages', 
      icon: MapPin, 
      badge: stats.destinationsCount || null,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    { 
      id: 'enquiries', 
      label: 'Customer Leads', 
      icon: Mail, 
      badge: stats.pendingEnquiriesCount ? `${stats.pendingEnquiriesCount} New` : (stats.enquiriesCount || null),
      badgeColor: stats.pendingEnquiriesCount ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-100 text-slate-700'
    },
    { 
      id: 'reviews', 
      label: 'Review Moderation', 
      icon: MessageSquare, 
      badge: stats.pendingReviewsCount ? `${stats.pendingReviewsCount} Action` : (stats.reviewsCount || null),
      badgeColor: stats.pendingReviewsCount ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'
    },
    { 
      id: 'hero', 
      label: 'Hero Banners', 
      icon: ImageIcon, 
      badge: null,
      badgeColor: ''
    },
    { 
      id: 'settings', 
      label: 'Website Settings', 
      icon: Settings, 
      badge: null,
      badgeColor: ''
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-slate-300 select-none">
      
      {/* Sidebar Header / Brand */}
      <div>
        <div className={`p-4 flex items-center justify-between border-b border-slate-800 ${collapsed ? 'px-3' : 'px-5'}`}>
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20 shrink-0 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <h2 className="text-sm font-extrabold font-serif text-white tracking-wide truncate">
                  Vindhyanchal
                </h2>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">
                  Admin Control
                </span>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Group Header */}
        {!collapsed && (
          <div className="px-5 pt-5 pb-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
            Main Management
          </div>
        )}

        {/* Navigation Items */}
        <nav className="px-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'
                } rounded-2xl font-bold text-xs transition-all relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}

                {/* Collapsed dot badge */}
                {collapsed && item.badge && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-slate-900" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* User Card */}
        {!collapsed && (
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 border border-orange-500/30">
                AD
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-slate-200 truncate">Admin Lead</div>
                <div className="text-[10px] text-slate-500 font-mono">Operator JWT</div>
              </div>
            </div>
          </div>
        )}

        {/* View Live Website Button */}
        <button
          onClick={onExit}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center p-2.5' : 'px-3.5 py-2'
          } rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors gap-2`}
          title="View Live Website"
        >
          <ExternalLink className="w-4 h-4 text-slate-400" />
          {!collapsed && <span>Live Website</span>}
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center p-2.5' : 'px-3.5 py-2'
          } rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors gap-2 border border-red-500/20`}
          title="Logout Admin Session"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden md:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-full h-full z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
