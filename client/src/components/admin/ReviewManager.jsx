import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { fetchAdminReviews, toggleApproveReview, deleteReview } from '../../services/api';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminReviews();
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApprove = async (id, currentApproved) => {
    try {
      await toggleApproveReview(id, !currentApproved);
      loadReviews();
    } catch (err) {
      alert('Failed to update review approval state');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer review?')) {
      try {
        await deleteReview(id);
        loadReviews();
      } catch (err) {
        alert('Failed to delete review');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-xl font-bold font-serif text-slate-900">Review & Testimonial Moderation</h3>
        <p className="text-xs text-slate-500 font-medium">Approve or reject customer reviews before they appear publicly on the landing page.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 text-xs font-bold">Loading reviews for moderation...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className={`bg-white p-6 rounded-3xl border shadow-md transition-all flex flex-col justify-between ${
                rev.approved ? 'border-sky-200 shadow-sky-500/5' : 'border-amber-200 shadow-amber-500/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={rev.author}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                      }}
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{rev.author}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{rev.location || 'Traveler'}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    rev.approved ? 'bg-sky-50 text-sky-800 border-sky-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {rev.approved ? 'Approved (Live)' : 'Pending Review'}
                  </span>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-700 text-xs italic mb-4 font-medium">"{rev.comment}"</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleApprove(rev._id, rev.approved)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    rev.approved
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20'
                  }`}
                >
                  {rev.approved ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Unapprove</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(rev._id)}
                  className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ReviewManager;
