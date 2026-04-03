import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const INITIAL_BOOKINGS = [
  { id: 1, name: 'Ahmed Khan', phone: '9876543210', vehicleType: 'Truck', service: 'Engine Repair / Replacement', problem: 'Engine makes loud knocking noise when accelerating.', status: 'pending', date: '2025-03-20' },
  { id: 2, name: 'Ravi Sharma', phone: '9123456780', vehicleType: 'Bus', service: 'Brake System', problem: 'Brakes feel soft and take too long to stop.', status: 'pending', date: '2025-03-21' },
  { id: 3, name: 'Salman Qureshi', phone: '9988776655', vehicleType: 'Car / 4-Wheeler', service: 'AC & Cooling', problem: 'AC not cooling, blowing warm air.', status: 'accepted', date: '2025-03-22' },
  { id: 4, name: 'Imran Siddiqui', phone: '9871234560', vehicleType: 'Van', service: 'Tyre & Wheel', problem: 'Front tyre punctured, need replacement.', status: 'pending', date: '2025-03-23' },
  { id: 5, name: 'Farhan Ali', phone: '9765432100', vehicleType: 'Truck', service: 'Greasing & Lubrication', problem: 'Full chassis greasing required.', status: 'rejected', date: '2025-03-23' },
  { id: 6, name: 'Zubair Malik', phone: '9654321009', vehicleType: 'Car / 4-Wheeler', service: 'Full Service', problem: 'Routine full service and oil change needed.', status: 'accepted', date: '2025-03-24' },
];

const statusStyles = {
  pending:  { bg: 'bg-yellow-300/20 border-yellow-300/40', text: 'text-yellow-200', dot: 'bg-yellow-300', label: 'Pending' },
  accepted: { bg: 'bg-green-300/20 border-green-300/40',  text: 'text-green-200',  dot: 'bg-green-300',  label: 'Accepted' },
  rejected: { bg: 'bg-red-300/20 border-red-300/40',     text: 'text-red-200',    dot: 'bg-red-300',    label: 'Rejected' },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (localStorage.getItem('owner_auth') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const updateStatus = (id, status) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    accepted: bookings.filter((b) => b.status === 'accepted').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #86efac 100%)' }}>
      <Navbar />

      <div className="px-6 md:px-16 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: counts.all, icon: '📋', color: 'from-white/20 to-white/10' },
            { label: 'Pending', value: counts.pending, icon: '⏳', color: 'from-yellow-300/30 to-yellow-200/10' },
            { label: 'Accepted', value: counts.accepted, icon: '✅', color: 'from-green-300/30 to-green-200/10' },
            { label: 'Rejected', value: counts.rejected, icon: '❌', color: 'from-red-300/30 to-red-200/10' },
          ].map((s) => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} backdrop-blur border border-white/25 rounded-2xl p-5 shadow flex items-center gap-4`}>
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-white/70 text-xs font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {['all', 'pending', 'accepted', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition capitalize ${
                filter === f
                  ? 'bg-white text-pink-500 border-white shadow'
                  : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
              }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 && (
            <div className="text-center text-white/60 py-16 text-lg">No bookings found.</div>
          )}
          {filtered.map((b) => {
            const s = statusStyles[b.status];
            return (
              <div key={b.id} className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-3xl p-6 shadow-lg transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                  {/* Left Info */}
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-white font-extrabold text-lg">{b.name}</h3>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-white/75 text-sm">
                      <span>📞 <a href={`tel:${b.phone}`} className="hover:text-white transition">{b.phone}</a></span>
                      <span>🚗 {b.vehicleType}</span>
                      <span>🔧 {b.service}</span>
                      <span>📅 {b.date}</span>
                    </div>
                    <p className="text-white/80 text-sm bg-white/10 rounded-xl px-4 py-2 mt-1 border border-white/15">
                      💬 {b.problem}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {b.status === 'pending' && (
                    <div className="flex gap-3 flex-shrink-0 mt-1">
                      <button
                        onClick={() => updateStatus(b.id, 'accepted')}
                        className="bg-green-400/30 hover:bg-green-400/50 border border-green-300/40 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm"
                      >
                        ✔ Accept
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, 'rejected')}
                        className="bg-red-400/30 hover:bg-red-400/50 border border-red-300/40 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                  {b.status !== 'pending' && (
                    <button
                      onClick={() => updateStatus(b.id, 'pending')}
                      className="flex-shrink-0 bg-white/15 hover:bg-white/25 border border-white/25 text-white/70 font-semibold px-4 py-2 rounded-xl transition text-xs mt-1"
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
  );
}
