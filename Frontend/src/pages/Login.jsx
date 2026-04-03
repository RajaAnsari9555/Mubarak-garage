import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const OWNER_PHONE = '7897659266';
const OWNER_PASS = 'mubarak123';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.phone === OWNER_PHONE && form.password === OWNER_PASS) {
      localStorage.setItem('owner_auth', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid phone number or password.');
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #86efac 100%)' }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white/20 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔧</span>
          <span className="text-2xl font-extrabold text-white drop-shadow tracking-wide">Mubarak Garage</span>
        </div>
        <Link to="/" className="text-white font-semibold hover:text-pink-200 transition">← Back to Home</Link>
      </nav>

      {/* Login Card */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-3xl font-extrabold text-white">Owner Login</h1>
            <p className="text-white/70 text-sm mt-1">Access the garage dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white font-semibold text-sm">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="Enter owner phone"
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/70 focus:bg-white/30 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white font-semibold text-sm">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                placeholder="Enter password"
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/70 focus:bg-white/30 transition"
              />
            </div>

            {error && (
              <p className="text-red-200 text-sm bg-red-400/20 border border-red-300/30 rounded-xl px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-white text-pink-500 font-extrabold py-4 rounded-2xl shadow-lg hover:bg-pink-100 transition text-lg mt-1"
            >
              Login →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
