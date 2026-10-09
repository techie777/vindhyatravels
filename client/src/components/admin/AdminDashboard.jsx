import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminOverview from './AdminOverview';
import VehicleManager from './VehicleManager';
import DestinationManager from './DestinationManager';
import EnquiryManager from './EnquiryManager';
import ReviewManager from './ReviewManager';
import HeroManager from './HeroManager';
import WebSettingsManager from './WebSettingsManager';
import { fetchDestinations, fetchAdminEnquiries, fetchAdminReviews, fetchVehicles } from '../../services/api';

const AdminDashboard = ({ onExit, onLogout, currency }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [stats, setStats] = useState({
    destinationsCount: 0,
    vehiclesCount: 0,
    enquiriesCount: 0,
    reviewsCount: 0,
    pendingEnquiriesCount: 0,
    pendingReviewsCount: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [destRes, vehRes, enqRes, revRes] = await Promise.all([
        fetchDestinations(),
        fetchVehicles('All'),
        fetchAdminEnquiries(),
        fetchAdminReviews()
      ]);

      const enquiries = enqRes.data || [];
      const reviews = revRes.data || [];

      setStats({
        destinationsCount: (destRes.data || []).length,
        vehiclesCount: (vehRes.data || []).length,
        enquiriesCount: enquiries.length,
        reviewsCount: reviews.length,
        pendingEnquiriesCount: enquiries.filter(e => e.status === 'Pending').length,
        pendingReviewsCount: reviews.filter(r => !r.approved).length
      });
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans overflow-x-hidden relative">
      
      {/* Collapsible Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        stats={stats}
        onExit={onExit}
        onLogout={onLogout}
      />

      {/* Top Action Header */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setMobileOpen={setMobileOpen}
        onExit={onExit}
        onLogout={onLogout}
      />

      {/* Main Responsive Dynamic Content Area */}
      <div className={`transition-all duration-300 pt-20 pb-16 min-h-screen ${
        collapsed ? 'md:pl-20' : 'md:pl-64'
      }`}>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
          <div className="mt-4 w-full max-w-full">
            {activeTab === 'overview' && (
              <AdminOverview
                setActiveTab={setActiveTab}
                currency={currency}
                onRefreshStats={loadStats}
              />
            )}
            {activeTab === 'vehicles' && <VehicleManager />}
            {activeTab === 'destinations' && <DestinationManager currency={currency} />}
            {activeTab === 'enquiries' && <EnquiryManager currency={currency} />}
            {activeTab === 'reviews' && <ReviewManager />}
            {activeTab === 'hero' && <HeroManager />}
            {activeTab === 'settings' && <WebSettingsManager />}
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;
