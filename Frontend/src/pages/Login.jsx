import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import garageBg from '../assets/Garage.png.png';

const OWNER_PHONE = '7897659266';
const OWNER_PASS  = 'mubarak123';

export default function Login() {
  const [form, setForm]       = useState({ phone: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid phone number or password.");
      }

      localStorage.setItem('owner_auth', 'true');
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col relative"
      style={{ backgroundImage: `url(${garageBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-black/75 z-0" />

      {/* Blobs — clipped so they don't overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-96 h-96 bg-orange-600 top-0 -left-32" />
        <div className="blob w-80 h-80 bg-rose-700 bottom-0 -right-20" style={{ animationDelay: '4s' }} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(14)].map((_, i) => (
          <div key={i} className={`particle ${i%3===0?'particle-orange':i%3===1?'particle-gold':''}`}
            style={{ width:`${3+(i%4)*2}px`, height:`${3+(i%4)*2}px`, left:`${(i*7.2)%100}%`, top:`${(i*11+10)%88}%`, animationDuration:`${4+(i%6)*1.5}s`, animationDelay:`${i*0.35}s` }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className={`flex items-center justify-between px-8 py-4 bg-black/30 backdrop-blur-md border-b border-white/8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-3xl group-hover:animate-spin-slow inline-block transition-transform duration-500">🔧</span>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold shimmer-text">Mubarak Garage</span>
              <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase">Est. 2000 · Kushinagar</span>
            </div>
          </Link>
          <Link to="/" className="btn-neon text-white/60 hover:text-white font-semibold text-sm transition-colors flex items-center gap-1.5 bg-white/6 border border-white/10 px-4 py-2 rounded-full">
            ← Back to Home
          </Link>
        </nav>

        {/* Card */}
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className={`w-full max-w-md transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <div className="glass-card card-shine rounded-3xl shadow-2xl border border-orange-400/25 animate-pulse-glow">
              <div className="p-10 flex flex-col gap-6 rounded-3xl">

                {/* Icon */}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-3">
                    <div className="ripple-ring w-24 h-24" style={{ animationDelay:'0s' }} />
                    <div className="ripple-ring w-24 h-24" style={{ animationDelay:'1s' }} />
                    <div className="ripple-ring w-24 h-24" style={{ animationDelay:'2s' }} />
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-orange-500 to-rose-600 flex items-center justify-center text-4xl shadow-2xl relative z-10 animate-float-slow">
                      🔐
                    </div>
                  </div>
                  <h1 className="text-3xl font-extrabold text-white shimmer-text-white">Owner Login</h1>
                  <p className="text-white/45 text-sm mt-1">Access the garage dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { key:'phone',    label:'Phone Number', type:'tel',      placeholder:'Enter owner phone' },
                    { key:'password', label:'Password',     type:'password', placeholder:'Enter password' },
                  ].map((field, i) => (
                    <div
                      key={field.key}
                      className={`flex flex-col gap-1.5 transition-all duration-500 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                      style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                    >
                      <label className="text-white/75 font-semibold text-sm">{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        required
                        placeholder={field.placeholder}
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-400/70 focus:bg-white/12 transition-all duration-300"
                      />
                    </div>
                  ))}

                  {error && (
                    <div className="animate-bounce-in flex items-center gap-2 text-red-300 text-sm bg-red-500/12 border border-red-400/22 rounded-xl px-4 py-3">
                      <span className="animate-swing inline-block">⚠️</span> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-neon w-full bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold py-4 rounded-2xl shadow-xl text-lg mt-1 animate-pulse-glow-orange disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '0.4s' }}
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Login →'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
