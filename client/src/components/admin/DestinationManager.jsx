import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, MapPin } from 'lucide-react';
import { fetchDestinations, createDestination, updateDestination, deleteDestination, formatPrice } from '../../services/api';
import ImageUpload from '../common/ImageUpload';

const DestinationManager = ({ currency }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'MP',
    image: '',
    price: '',
    duration: '',
    location: '',
    description: '',
    highlights: '',
    inclusions: 'Hotel Stay, Guided Tours, Transport, Meals',
    featured: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchDestinations();
      setDestinations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData({
      title: '',
      category: 'MP',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      price: '15000',
      duration: '4 Days / 3 Nights',
      location: 'Madhya Pradesh',
      description: '',
      highlights: 'Heritage Tour, Local Cuisine, Guided Safari',
      inclusions: 'Hotel Stay, Guided Tours, Transport',
      featured: false
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      price: item.price,
      duration: item.duration,
      location: item.location || '',
      description: item.description,
      highlights: Array.isArray(item.highlights) ? item.highlights.join(', ') : item.highlights || '',
      inclusions: Array.isArray(item.inclusions) ? item.inclusions.join(', ') : item.inclusions || '',
      featured: Boolean(item.featured)
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDestination(id);
        loadData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        highlights: formData.highlights.split(',').map((s) => s.trim()).filter(Boolean),
        inclusions: formData.inclusions.split(',').map((s) => s.trim()).filter(Boolean)
      };

      if (editItem) {
        await updateDestination(editItem._id, payload);
      } else {
        await createDestination(payload);
      }

      setShowModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving destination');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-900">Destinations CRUD Manager</h3>
          <p className="text-xs text-slate-500 font-medium">Manage package details, prices, images, and categories (MP vs India).</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Destination</span>
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 text-xs font-bold">Loading destinations...</div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 uppercase text-[10px] tracking-wider text-slate-500 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4">Package</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {destinations.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/destinations/varanasi.jpg';
                          }}
                        />
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-sky-600" /> {item.location || 'India'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        item.category === 'MP'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{item.duration}</td>
                    <td className="p-4 font-extrabold text-orange-600 font-serif text-sm">
                      {formatPrice(item.price, currency)}
                    </td>
                    <td className="p-4">
                      {item.featured ? (
                        <span className="text-sky-700 text-xs font-extrabold">Yes</span>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">No</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 my-8 shadow-2xl">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-slate-900 mb-4">
              {editItem ? 'Edit Destination Package' : 'Create New Destination Package'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900 cursor-pointer"
                  >
                    <option value="MP">Madhya Pradesh (MP)</option>
                    <option value="India">Incredible India</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Days / 3 Nights"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Location City/State</label>
                  <input
                    type="text"
                    placeholder="e.g. Mandla, MP"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <ImageUpload
                label="Destination Package Image"
                helpText="Upload a scenic photo for this destination from your system device or enter a web link."
                value={formData.image}
                onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                required
                aspectRatio="card"
              />

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Highlights (comma separated)</label>
                <input
                  type="text"
                  placeholder="UNESCO Temples, Jungle Safari, Light Show"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-slate-300 text-orange-500 focus:ring-0"
                />
                <label htmlFor="featCheck" className="text-slate-700 font-bold cursor-pointer">
                  Feature on Homepage Hero/Highlights
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-md shadow-orange-500/20"
                >
                  {editItem ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default DestinationManager;
