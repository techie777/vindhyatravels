import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../services/api';
import ImageUpload from '../common/ImageUpload';

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Sedan',
    image: '',
    seats: '4 Guests + Driver',
    acType: 'Air Conditioned AC',
    luggage: '2-3 Large Bags',
    ratePerKm: '14',
    dailyDriverBatta: '300',
    description: '',
    features: 'AC, Music System, Experienced Chauffeur',
    popular: false
  });

  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchVehicles('All');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditItem(null);
    setFormData({
      name: '',
      category: 'Sedan',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      seats: '4 Guests + Driver',
      acType: 'Automatic AC',
      luggage: '2-3 Large Bags',
      ratePerKm: '14',
      dailyDriverBatta: '300',
      description: 'Clean, sanitized vehicle driven by experienced local driver.',
      features: 'AC, Music System, Experienced Chauffeur',
      popular: false
    });
    setUploadMode('file');
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      image: item.image,
      seats: item.seats,
      acType: item.acType || '',
      luggage: item.luggage || '',
      ratePerKm: item.ratePerKm,
      dailyDriverBatta: item.dailyDriverBatta || 300,
      description: item.description || '',
      features: Array.isArray(item.features) ? item.features.join(', ') : item.features || '',
      popular: Boolean(item.popular)
    });
    setUploadMode('file');
    setShowModal(true);
  };

  // Local File Upload Handler converting image to Data URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vehicle from fleet?')) {
      try {
        await deleteVehicle(id);
        loadData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload a vehicle image photo');
      return;
    }

    try {
      const payload = {
        ...formData,
        ratePerKm: Number(formData.ratePerKm),
        dailyDriverBatta: Number(formData.dailyDriverBatta),
        features: Array.isArray(formData.features)
          ? formData.features
          : String(formData.features).split(',').map((s) => s.trim()).filter(Boolean)
      };

      if (editItem) {
        await updateVehicle(editItem._id, payload);
      } else {
        await createVehicle(payload);
      }

      setShowModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving vehicle');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-900">Vehicle Fleet Management</h3>
          <p className="text-xs text-slate-500 font-medium">Add, edit, upload vehicle photos, seating capacity, per KM rates, and features.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Car / Vehicle</span>
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 text-xs font-bold">Loading fleet...</div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 uppercase text-[10px] tracking-wider text-slate-500 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-4">Car Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Rate / KM</th>
                  <th className="p-4">Popular</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vehicles.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/cars/dzire.jpg';
                          }}
                        />
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">{item.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{item.acType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-sky-700">{item.category}</td>
                    <td className="p-4 font-semibold">{item.seats}</td>
                    <td className="p-4 font-extrabold text-orange-600 font-serif">₹{item.ratePerKm} / KM</td>
                    <td className="p-4">
                      {item.popular ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-100 text-orange-700 border border-orange-200">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
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

      {/* Edit / Add Modal with File Image Upload */}
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
              {editItem ? 'Edit Vehicle Details' : 'Add New Car / Vehicle to Fleet'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Car Name (e.g. Swift Dzire) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <option value="Sedan">Sedan (Dzire / Aura)</option>
                    <option value="MUV/SUV">MUV/SUV (Ertiga / Innova)</option>
                    <option value="Van/Bus">Van/Bus (Tourist Tempo Traveler)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Seating Capacity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Guests + Driver"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Rate Per KM (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.ratePerKm}
                    onChange={(e) => setFormData({ ...formData, ratePerKm: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Driver Batta Per Day (₹)</label>
                  <input
                    type="number"
                    value={formData.dailyDriverBatta}
                    onChange={(e) => setFormData({ ...formData, dailyDriverBatta: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <ImageUpload
                label="Vehicle Image Photo"
                helpText="Upload a car photo from your system device or provide an image link."
                value={formData.image}
                onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                required
                aspectRatio="card"
              />

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popCheck"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="rounded border-slate-300 text-orange-500 focus:ring-0"
                />
                <label htmlFor="popCheck" className="text-slate-700 font-bold cursor-pointer">
                  Mark as "Most Popular" Vehicle Badge
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
                  {editItem ? 'Update Car' : 'Add Vehicle'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default VehicleManager;
