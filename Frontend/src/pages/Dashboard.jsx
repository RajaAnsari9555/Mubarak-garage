import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import garageBg from '../assets/Garage.png.png';

const INITIAL_BOOKINGS = [];

const statusConfig = {
  pending:  { bg:'bg-yellow-400/12 border-yellow-400/28', text:'text-yellow-300', dot:'bg-yellow-400', label:'Pending' },
  accepted: { bg:'bg-green-400/12 border-green-400/28',   text:'text-green-300',  dot:'bg-green-400',  label:'Accepted' },
  rejected: { bg:'bg-red-400/12 border-red-400/28',       text:'text-red-300',    dot:'bg-red-400',    label:'Rejected' },
};

function StatCard({ label, value, icon, gradient, border, delay }) {
  const [ref, visible] = useScrollReveal(0.3);
  const displayed = useCountUp(String(value), 1200, visible);
  return (
    <div
      ref={ref}
      className={`reveal-scale card-shine bg-linear-to-br ${gradient} backdrop-blur border ${border} rounded-2xl p-5 shadow flex items-center gap-4 ${visible?'visible':''}`}
      style={{ transitionDelay: delay }}
    >
      <span className="text-3xl animate-float" style={{ animationDelay: delay }}>{icon}</span>
      <div>
        <p className="text-3xl font-extrabold text-white tabular-nums">{displayed}</p>
        <p className="text-white/50 text-xs font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter]     = useState('all');
  const [mounted, setMounted]   = useState(false);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings.");
      }

      const mapped = data.data.map(b => {
        let mappedStatus = 'pending';
        if (b.status === 'In Progress' || b.status === 'Completed') {
          mappedStatus = 'accepted';
        } else if (b.status === 'Cancelled') {
          mappedStatus = 'rejected';
        }

        return {
          id: b._id,
          name: b.fullName,
          phone: b.phoneNumber,
          vehicleType: b.vehicleType,
          service: b.serviceRequired,
          problem: b.problemDescription || "No description provided.",
          status: mappedStatus,
          date: new Date(b.createdAt).toISOString().split('T')[0]
        };
      });

      setBookings(mapped);
    } catch (err) {
      setError(err.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('owner_auth') !== 'true') { navigate('/login'); return; }
    fetchBookings();
    setTimeout(() => setMounted(true), 50);
  }, [navigate]);

  const updateStatus = async (id, status) => {
    let backendStatus = 'Pending';
    if (status === 'accepted') {
      backendStatus = 'In Progress';
    } else if (status === 'rejected') {
      backendStatus = 'Cancelled';
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: backendStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status.");
      }

      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    } catch (err) {
      alert(err.message || "Failed to update booking status.");
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all:      bookings.length,
    pending:  bookings.filter((b) => b.status === 'pending').length,
    accepted: bookings.filter((b) => b.status === 'accepted').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  };

  const statCards = [
    { label:'Total Bookings', value:counts.all,      icon:'📋', gradient:'from-white/12 to-white/4',          border:'border-white/12',      delay:'0s'    },
    { label:'Pending',        value:counts.pending,  icon:'⏳', gradient:'from-yellow-400/18 to-yellow-400/4', border:'border-yellow-400/22', delay:'0.08s' },
    { label:'Accepted',       value:counts.accepted, icon:'✅', gradient:'from-green-400/18 to-green-400/4',   border:'border-green-400/22',  delay:'0.16s' },
    { label:'Rejected',       value:counts.rejected, icon:'❌', gradient:'from-red-400/18 to-red-400/4',       border:'border-red-400/22',    delay:'0.24s' },
  ];

  const [listRef, listVisible] = useScrollReveal(0.05);

  return (
    <div
      className="min-h-screen font-sans relative"
      style={{ backgroundImage:`url(${garageBg})`, backgroundSize:'cover', backgroundPosition:'center', backgroundAttachment:'fixed' }}
    >
      <div className="absolute inset-0 bg-black/78 z-0" />

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-80 h-80 bg-orange-600 top-10 -right-24" />
        <div className="blob w-64 h-64 bg-rose-700 bottom-20 -left-16" style={{ animationDelay:'5s' }} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`particle ${i%2===0?'particle-orange':''}`}
            style={{ width:`${3+(i%4)*2}px`, height:`${3+(i%4)*2}px`, left:`${(i*10)%100}%`, top:`${(i*14+10)%88}%`, animationDuration:`${5+(i%5)*1.5}s`, animationDelay:`${i*0.4}s` }} />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="px-6 md:px-16 py-10">

          {/* Title */}
          <div className={`mb-8 transition-all duration-600 ${mounted?'opacity-100 translate-y-0':'opacity-0 -translate-y-4'}`}>
            <h1 className="text-3xl font-extrabold text-white">
              <span className="shimmer-text">Dashboard</span>
            </h1>
            <p className="text-white/45 text-sm mt-1">Manage all incoming bookings</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Filter Tabs */}
          <div className={`flex gap-3 mb-6 flex-wrap transition-all duration-600 delay-200 ${mounted?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}>
            {['all','pending','accepted','rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-250 capitalize ${
                  filter === f
                    ? 'bg-linear-to-r from-orange-500 to-rose-500 text-white border-transparent shadow-lg scale-[1.05] animate-pulse-glow-orange'
                    : 'bg-white/8 border-white/15 text-white/65 hover:bg-white/14 hover:text-white hover:scale-[1.02]'
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>

          {/* Bookings */}
          <div ref={listRef} className="flex flex-col gap-4">
            {loading && (
              <div className="text-center text-white/50 py-16 text-lg flex items-center justify-center gap-2">
                <span className="w-6 h-6 border-2 border-white/20 border-t-orange-400 rounded-full animate-spin" /> Loading bookings...
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 py-16 text-lg bg-red-500/10 border border-red-500/20 rounded-3xl">
                ⚠️ Error: {error}
              </div>
            )}
            {!loading && !error && filtered.length === 0 && (
              <div className="text-center text-white/35 py-16 text-lg animate-fade-in">No bookings found.</div>
            )}
            {!loading && !error && filtered.map((b, i) => {
              const s = statusConfig[b.status];
              return (
                <div
                  key={b.id}
                  className={`reveal glass-card card-shine rounded-3xl p-6 shadow-lg ${listVisible?'visible':''}`}
                  style={{ transitionDelay:`${i*0.07}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow animate-heartbeat">
                          {b.name.charAt(0)}
                        </div>
                        <h3 className="text-white font-extrabold text-lg">{b.name}</h3>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${s.bg} ${s.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                          {s.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-white/55 text-sm">
                        <span>📞 <a href={`tel:${b.phone}`} className="hover:text-orange-300 transition-colors">{b.phone}</a></span>
                        <span>🚗 {b.vehicleType}</span>
                        <span>🔧 {b.service}</span>
                        <span>📅 {b.date}</span>
                      </div>
                      <p className="text-white/65 text-sm bg-white/6 rounded-xl px-4 py-2.5 mt-1 border border-white/8">
                        💬 {b.problem}
                      </p>
                    </div>

                    {b.status === 'pending' && (
                      <div className="flex gap-3 shrink-0 mt-1">
                        <button
                          onClick={() => updateStatus(b.id, 'accepted')}
                          className="btn-neon bg-green-500/18 hover:bg-green-500/32 border border-green-400/32 text-green-300 font-bold px-5 py-2.5 rounded-xl text-sm"
                        >
                          ✔ Accept
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, 'rejected')}
                          className="btn-neon bg-red-500/18 hover:bg-red-500/32 border border-red-400/32 text-red-300 font-bold px-5 py-2.5 rounded-xl text-sm"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                    {b.status !== 'pending' && (
                      <button
                        onClick={() => updateStatus(b.id, 'pending')}
                        className="shrink-0 bg-white/8 hover:bg-white/14 border border-white/12 text-white/45 hover:text-white/75 font-semibold px-4 py-2 rounded-xl transition-all text-xs mt-1"
                      >
                        ↩ Reset
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
