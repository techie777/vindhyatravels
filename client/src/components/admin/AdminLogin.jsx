import React, { useState } from 'react';
import { ShieldCheck, Lock, User, X, LogIn } from 'lucide-react';
import { adminLogin } from '../../services/api';

const AdminLogin = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await adminLogin({ username, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data));
      onLoginSuccess(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-slate-900">Admin Authentication</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Enter your credentials to access the management portal.</p>
          <div className="mt-2 text-[10px] text-sky-700 font-mono bg-sky-50 py-1 px-2.5 rounded-lg inline-block border border-sky-200">
            Default Demo Credentials: admin / admin123
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded-xl mb-4 font-semibold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-700 font-bold mb-1">Admin Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-700 font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
