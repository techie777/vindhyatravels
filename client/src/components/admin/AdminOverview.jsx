import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Phone, 
  Star, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';
import { fetchAdminEnquiries, fetchAdminReviews, updateEnquiryStatus, toggleApproveReview, formatPrice } from '../../services/api';

const AdminOverview = ({ setActiveTab, currency, onRefreshStats }) => {
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    setLoading(true);
    try {
      const [enqRes, revRes] = await Promise.all([
        fetchAdminEnquiries(),
        fetchAdminReviews()
      ]);
      
      setRecentEnquiries(enqRes.data.slice(0, 5));
      setPendingReviews(revRes.data.filter(r => !r.approved));
    } catch (err) {
      console.error('Error fetching overview data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOverviewData();
    if (onRefreshStats) await onRefreshStats();
    setRefreshing(false);
  };

  const handleQuickStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      loadOverviewData();
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleQuickApproveReview = async (id) => {
    try {
      await toggleApproveReview(id, true);
      loadOverviewData();
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      alert('Failed to approve review');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full overflow-x-hidden">
      
      {/* 1. Welcome Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 p-5 sm:p-8 text-white overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-full">
            <div className="flex items-center space-x-2 text-orange-400 font-extrabold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Control Panel Overview</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-serif tracking-tight text-white">
              Vindhyanchal Travels Portal
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Real-time monitor for taxi fleet availability, tour booking leads, customer reviews, and web content settings.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md transition-all shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Live Data'}</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
        
        {/* Card 1: Active Vehicles */}
        <div 
          onClick={() => setActiveTab('vehicles')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md shadow-slate-200/50 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Active Vehicle Fleet</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 group-hover:scale-110 transition-transform shrink-0">
              <Car className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between flex-wrap gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
              5 Cars
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> 100% Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2 truncate">Swift Dzire, Ertiga, Innova Crysta</p>
        </div>

        {/* Card 2: Tour Packages */}
        <div 
          onClick={() => setActiveTab('destinations')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md shadow-slate-200/50 hover:border-sky-300 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Tour Packages</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-200 group-hover:scale-110 transition-transform shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between flex-wrap gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">7 Destinations</span>
            <span className="text-xs font-bold text-sky-600">MP & All India</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2 truncate">Khajuraho, Maihar, Varanasi, Pachmarhi</p>
        </div>

        {/* Card 3: Customer Leads */}
        <div 
          onClick={() => setActiveTab('enquiries')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md shadow-slate-200/50 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Customer Leads</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 group-hover:scale-110 transition-transform shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between flex-wrap gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
              {recentEnquiries.length} Enquiries
            </span>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Active Pipeline
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2 truncate">Live website booking enquiries</p>
        </div>

        {/* Card 4: Reviews & Testimonials */}
        <div 
          onClick={() => setActiveTab('reviews')}
          className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md shadow-slate-200/50 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Review Moderation</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform shrink-0">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between flex-wrap gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
              {pendingReviews.length > 0 ? `${pendingReviews.length} Pending` : 'All Approved'}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9 Rating
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2 truncate">Verified tourist feedback</p>
        </div>

      </div>

      {/* 3. Quick Actions Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md w-full">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('vehicles')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50 hover:border-orange-200 border border-slate-200 font-bold text-xs text-slate-800 hover:text-orange-700 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-orange-500" />
              <span>Add / Edit Vehicle</span>
            </div>
            <Plus className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 hover:border-sky-200 border border-slate-200 font-bold text-xs text-slate-800 hover:text-sky-700 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-500" />
              <span>Manage Packages</span>
            </div>
            <Plus className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 font-bold text-xs text-slate-800 hover:text-emerald-700 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>Review Leads</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-slate-200 font-bold text-xs text-slate-800 hover:text-amber-700 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Website Settings</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 4. Two Column Layout: Recent Leads Stream & Pending Reviews Queue */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 w-full">
        
        {/* Left Column: Recent Customer Leads Pipeline (2 Cols on XL) */}
        <div className="xl:col-span-2 space-y-4 w-full overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">Recent Customer Leads</h3>
              <p className="text-xs text-slate-500 font-medium">Newest booking requests submitted by visitors</p>
            </div>
            <button
              onClick={() => setActiveTab('enquiries')}
              className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All Leads</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden w-full">
            {loading ? (
              <div className="p-8 text-center text-xs font-bold text-slate-400">Loading leads...</div>
            ) : recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-xs font-medium text-slate-500">
                No customer enquiries recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentEnquiries.map((item) => (
                  <div key={item._id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="font-extrabold text-slate-900 text-sm truncate">{item.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 shrink-0">
                          {item.destination}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium flex-wrap gap-y-1">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-sky-600 shrink-0" /> {item.phone}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{item.travelDate || 'Date TBD'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="font-serif font-extrabold text-orange-600">
                          {item.estimatedCost > 0 ? formatPrice(item.estimatedCost, currency) : 'Estimate N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 self-start sm:self-center">
                      <select
                        value={item.status}
                        onChange={(e) => handleQuickStatusChange(item._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                          item.status === 'Confirmed'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : item.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-orange-50 text-orange-800 border-orange-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pending Review Queue */}
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">Pending Reviews</h3>
              <p className="text-xs text-slate-500 font-medium">Customer reviews requiring moderation</p>
            </div>
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-xs font-extrabold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Moderation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 space-y-4 w-full">
            {pendingReviews.length === 0 ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                <h4 className="text-xs font-bold text-slate-800">All Reviews Moderated</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">No pending customer reviews in queue.</p>
              </div>
            ) : (
              pendingReviews.map((rev) => (
                <div key={rev._id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900">{rev.name}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic line-clamp-2">"{rev.comment}"</p>
                  
                  <div className="pt-2 flex items-center justify-between border-t border-amber-200/40">
                    <span className="text-[10px] text-slate-400 font-medium">{rev.location || 'Tourist'}</span>
                    <button
                      onClick={() => handleQuickApproveReview(rev._id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg shadow-sm transition-all"
                    >
                      Approve & Publish
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminOverview;
