import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Trash2, 
  Search, 
  Calendar, 
  Clock, 
  Download, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  MessageCircle, 
  X, 
  Users, 
  Car, 
  MapPin, 
  Sparkles,
  Filter,
  RefreshCw
} from 'lucide-react';
import { fetchAdminEnquiries, updateEnquiryStatus, deleteEnquiry, formatPrice } from '../../services/api';

const EnquiryManager = ({ currency }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [timeFilter, setTimeFilter] = useState('All'); // All, Today, 3Days, 7Days, 1Month
  const [statusFilter, setStatusFilter] = useState('All'); // All, Pending, Contacted, Confirmed
  const [searchTerm, setSearchTerm] = useState('');

  // Share Modal State
  const [shareModalItem, setShareModalItem] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminEnquiries();
      setEnquiries(res.data || []);
    } catch (err) {
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      loadEnquiries();
    } catch (err) {
      alert('Failed to update lead status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer enquiry record?')) {
      try {
        await deleteEnquiry(id);
        loadEnquiries();
      } catch (err) {
        alert('Failed to delete enquiry');
      }
    }
  };

  // Helper date functions
  const now = new Date();

  const isToday = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return d.toDateString() === now.toDateString();
  };

  const isWithinDays = (dateStr, days) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const diffTime = Math.abs(now - d);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  };

  // Metrics Dashboard Calculations
  const todayCount = enquiries.filter(e => isToday(e.createdAt)).length;
  const last3DaysCount = enquiries.filter(e => isWithinDays(e.createdAt, 3)).length;
  const last7DaysCount = enquiries.filter(e => isWithinDays(e.createdAt, 7)).length;
  const last1MonthCount = enquiries.filter(e => isWithinDays(e.createdAt, 30)).length;

  // Filtered List Logic
  const filteredEnquiries = enquiries.filter((item) => {
    // 1. Time Filter
    let matchesTime = true;
    if (timeFilter === 'Today') matchesTime = isToday(item.createdAt);
    else if (timeFilter === '3Days') matchesTime = isWithinDays(item.createdAt, 3);
    else if (timeFilter === '7Days') matchesTime = isWithinDays(item.createdAt, 7);
    else if (timeFilter === '1Month') matchesTime = isWithinDays(item.createdAt, 30);

    // 2. Status Filter
    let matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    // 3. Search Filter (by Name or Number or Destination)
    const term = searchTerm.toLowerCase().trim();
    let matchesSearch = true;
    if (term) {
      const nameMatch = item.name ? item.name.toLowerCase().includes(term) : false;
      const phoneMatch = item.phone ? item.phone.toLowerCase().includes(term) : false;
      const destMatch = item.destination ? item.destination.toLowerCase().includes(term) : false;
      const emailMatch = item.email ? item.email.toLowerCase().includes(term) : false;
      matchesSearch = nameMatch || phoneMatch || destMatch || emailMatch;
    }

    return matchesTime && matchesStatus && matchesSearch;
  });

  // Export PDF Report Generator
  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    const tableRows = filteredEnquiries.map((item, idx) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${idx + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <strong>${item.name || 'N/A'}</strong><br/>
          <small style="color: #64748b;">📱 ${item.phone || 'N/A'}</small><br/>
          <small style="color: #64748b;">✉️ ${item.email || 'N/A'}</small>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <strong>${item.destination || 'General'}</strong><br/>
          <small style="color: #64748b;">${item.specialRequests || ''}</small>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          ${item.travelDate || 'Flexible'}<br/>
          <small style="color: #64748b;">${item.travelersCount || 2} Guests (${item.travelStyle || 'Standard'})</small>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <span style="padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: ${
            item.status === 'Confirmed' ? '#dcfce7; color: #166534;' : item.status === 'Contacted' ? '#fef3c7; color: #92400e;' : '#f1f5f9; color: #334155;'
          }">${item.status || 'Pending'}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          ${item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
        </td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Customer Enquiries Report - Vindhyanchal Travels</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #0f172a; }
            .header { text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { margin: 0; color: #ea580c; font-size: 24px; }
            .header p { margin: 5px 0 0 0; color: #64748b; font-size: 12px; }
            .summary { display: flex; justify-content: space-between; margin-bottom: 20px; background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; text-transform: uppercase; font-size: 10px; color: #475569; }
            .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>VINDHYANCHAL TRAVELS</h1>
            <p>Customer Leads & Enquiry Pipeline Report | Generated on ${new Date().toLocaleString()}</p>
          </div>
          <div class="summary">
            <div><strong>Total Enquiries:</strong> ${filteredEnquiries.length}</div>
            <div><strong>Filter Mode:</strong> ${timeFilter}</div>
            <div><strong>Status Filter:</strong> ${statusFilter}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name & Phone</th>
                <th>Destination Package</th>
                <th>Travel Date & Guests</th>
                <th>Status</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <div class="footer">
            Vindhyanchal Travels Portal - Confidential Admin Lead Audit Log
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Lead Text Format for Share
  const getFormattedLeadText = (item) => {
    return `🚩 *Vindhyanchal Travels - Customer Lead* 🚩\n\n👤 *Name:* ${item.name || 'N/A'}\n📞 *Phone:* ${item.phone || 'N/A'}\n📍 *Destination:* ${item.destination || 'General Enquiry'}\n👥 *Guests:* ${item.travelersCount || 2} Persons\n🚗 *Vehicle:* ${item.travelStyle || 'Standard'}\n📅 *Travel Date:* ${item.travelDate || 'Flexible'}\n📝 *Notes:* ${item.specialRequests || 'None'}\n⏰ *Time:* ${item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}`;
  };

  const handleCopyLead = (item) => {
    const text = getFormattedLeadText(item);
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleWhatsAppShare = (item) => {
    const text = getFormattedLeadText(item);
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Title & Quick Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold font-serif text-slate-900">Customer Leads & Enquiry Dashboard</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-extrabold">
              {enquiries.length} Total Enquiries
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time pipeline for all booking leads submitted via website, quick enquiry form, and vehicles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadEnquiries}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* 📊 DEDICATED METRICS DASHBOARD CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Today's Enquiries */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Today's Enquiries</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">{todayCount}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Received today</div>
        </div>

        {/* Card 2: Last 3 Days */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Last 3 Days</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">{last3DaysCount}</div>
          <div className="text-[11px] text-sky-600 font-bold mt-1">Recent 72 hours</div>
        </div>

        {/* Card 3: Last 7 Days */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Last 7 Days</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">{last7DaysCount}</div>
          <div className="text-[11px] text-indigo-600 font-bold mt-1">Past week volume</div>
        </div>

        {/* Card 4: Last 1 Month */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Last 1 Month</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">{last1MonthCount}</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">Past 30 days total</div>
        </div>

      </div>

      {/* 🔍 FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Time Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Time:
          </span>
          {[
            { id: 'All', label: 'All Time' },
            { id: 'Today', label: "Today's" },
            { id: '3Days', label: 'Last 3 Days' },
            { id: '7Days', label: 'Last 7 Days' },
            { id: '1Month', label: 'Last 1 Month' }
          ].map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeFilter(tf.id)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                timeFilter === tf.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          
          {/* Status Dropdown Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Leads</option>
            <option value="Contacted">Contacted</option>
            <option value="Confirmed">Confirmed</option>
          </select>

          {/* Live Search Input (Name & Mobile Number) */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

        </div>

      </div>

      {/* 📋 ENQUIRY LOGS TABLE */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs font-bold bg-white rounded-3xl border border-slate-200">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-orange-500 mb-2" />
          Loading customer enquiries...
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 uppercase text-[10px] tracking-wider text-slate-500 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Customer Name & Contact</th>
                  <th className="p-4">Destination & Vehicle</th>
                  <th className="p-4">Travel Date & Guests</th>
                  <th className="p-4">Lead Status</th>
                  <th className="p-4 text-right">Actions (Share / Delete)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500 font-medium">
                      <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      No customer enquiries match your current filters or search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* 1. Date & Time */}
                      <td className="p-4">
                        <div className="font-bold text-slate-800">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'N/A'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.createdAt ? new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </td>

                      {/* 2. Customer Name & Phone */}
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900 text-sm">{item.name || 'Anonymous Customer'}</div>
                        <div className="text-[11px] text-emerald-700 font-extrabold flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                        </div>
                        {item.email && item.email !== 'quicklead@vindhyanchal.com' && (
                          <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{item.email}</span>
                          </div>
                        )}
                      </td>

                      {/* 3. Destination & Vehicle */}
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{item.destination}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                          <Car className="w-3 h-3 text-sky-600" />
                          <span>{item.travelStyle || 'Standard Vehicle'}</span>
                        </div>
                        {item.specialRequests && (
                          <div className="text-[10px] text-slate-500 italic line-clamp-1 mt-1 bg-slate-100 p-1 px-2 rounded-lg" title={item.specialRequests}>
                            "{item.specialRequests}"
                          </div>
                        )}
                      </td>

                      {/* 4. Travel Date & Guests */}
                      <td className="p-4">
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.travelDate || 'Flexible'}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span>{item.travelersCount || 2} Guests</span>
                        </div>
                      </td>

                      {/* 5. Status Selector */}
                      <td className="p-4">
                        <select
                          value={item.status || 'Pending'}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                            item.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : item.status === 'Contacted'
                              ? 'bg-sky-50 text-sky-800 border-sky-300'
                              : 'bg-orange-50 text-orange-800 border-orange-300'
                          }`}
                        >
                          <option value="Pending">🟡 Pending</option>
                          <option value="Contacted">🔵 Contacted</option>
                          <option value="Confirmed">🟢 Confirmed</option>
                        </select>
                      </td>

                      {/* 6. Actions (Share & Delete) */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* SHARE BUTTON */}
                          <button
                            onClick={() => setShareModalItem(item)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold text-xs flex items-center gap-1 transition-all"
                            title="Share Lead Details"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-all"
                            title="Delete Lead Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🚀 SHARE LEAD MODAL POPUP */}
      {shareModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-base font-extrabold text-slate-900">Share Customer Lead</h4>
              </div>
              <button
                onClick={() => setShareModalItem(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formatted Lead Text Preview */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-800 space-y-1.5 whitespace-pre-wrap">
              {getFormattedLeadText(shareModalItem)}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              
              <button
                onClick={() => handleWhatsAppShare(shareModalItem)}
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </button>

              <button
                onClick={() => handleCopyLead(shareModalItem)}
                className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Details</span>
              </button>

            </div>

            {copiedToast && (
              <div className="bg-emerald-100 text-emerald-800 text-xs font-extrabold text-center py-1.5 rounded-xl animate-bounce">
                ✓ Lead details copied to clipboard!
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default EnquiryManager;
