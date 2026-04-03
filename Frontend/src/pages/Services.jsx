import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const services = [
  { category: 'Engine & Transmission', icon: '⚙️', color: 'from-rose-400/40 to-pink-300/20', badge: 'bg-rose-400/30',
    items: ['Complete Engine Replacement & Rebuild','Engine Tuning & Diagnostics','Transmission Repair & Overhaul','Gearbox Replacement','Clutch Repair & Replacement'] },
  { category: 'Heavy Vehicles (Bus & Truck)', icon: '🚛', color: 'from-orange-400/40 to-amber-300/20', badge: 'bg-orange-400/30',
    items: ['Full Truck Engine Overhaul','Bus Chassis & Frame Repair','Differential & Axle Repair','Air Brake System Service','Suspension & Leaf Spring Repair'] },
  { category: '4-Wheeler Services', icon: '🚗', color: 'from-sky-400/40 to-blue-300/20', badge: 'bg-sky-400/30',
    items: ['Car Engine Repair & Replacement','Brake Pad & Disc Replacement','Steering & Suspension Repair','Exhaust System Repair','Full Car Service & Inspection'] },
  { category: 'Greasing & Lubrication', icon: '🛢️', color: 'from-yellow-400/40 to-lime-300/20', badge: 'bg-yellow-400/30',
    items: ['Full Vehicle Greasing','Chassis Lubrication','Wheel Bearing Greasing','Differential Oil Change','Gear Oil Replacement'] },
  { category: 'Fuel System', icon: '⛽', color: 'from-purple-400/40 to-violet-300/20', badge: 'bg-purple-400/30',
    items: ['Fuel Pump Repair & Replacement','Fuel Injector Cleaning','Fuel Tank Repair & Cleaning','Carburetor Overhaul','Diesel Injection System Service'] },
  { category: 'Electrical & Battery', icon: '🔋', color: 'from-cyan-400/40 to-teal-300/20', badge: 'bg-cyan-400/30',
    items: ['Battery Replacement & Testing','Alternator & Starter Motor Repair','Full Wiring & Electrical Fault Fix','Headlight & Indicator Repair','ECU Diagnostics'] },
  { category: 'Tyres & Wheels', icon: '🛞', color: 'from-green-400/40 to-emerald-300/20', badge: 'bg-green-400/30',
    items: ['Tyre Replacement (All Sizes)','Wheel Balancing & Alignment','Puncture Repair','Rim Repair & Straightening','Spare Tyre Fitting'] },
  { category: 'AC & Cooling System', icon: '❄️', color: 'from-blue-400/40 to-indigo-300/20', badge: 'bg-blue-400/30',
    items: ['AC Gas Refilling & Repair','Radiator Flush & Replacement','Cooling Fan Repair','Thermostat Replacement','Heater Core Service'] },
  { category: 'Body & Welding', icon: '🧰', color: 'from-fuchsia-400/40 to-pink-300/20', badge: 'bg-fuchsia-400/30',
    items: ['Body Panel Repair & Replacement','Welding & Fabrication','Rust Treatment & Prevention','Denting & Painting','Bumper & Door Repair'] },
];

export default function Services() {
  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #86efac 100%)' }}>
      <Navbar />

      <div className="text-center px-6 pt-16 pb-10">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">What We Offer</span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Our Services</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">From heavy trucks to small cars — every repair handled with 25+ years of expertise.</p>
      </div>

      <div className="w-full px-6 md:px-16 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {services.map((s) => (
            <div key={s.category} className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${s.color} border border-white/25 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 flex flex-col gap-4 backdrop-blur-md`}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${s.badge} flex items-center justify-center text-3xl shadow-md`}>{s.icon}</div>
                <h3 className="text-white font-extrabold text-base leading-snug">{s.category}</h3>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
              <ul className="flex flex-col gap-2 relative z-10">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-white text-[10px] flex-shrink-0">✔</span>
                    <span className="text-white/90 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  Available Now
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-6 md:mx-16 mb-16 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-1">Ready to get your vehicle fixed?</h2>
          <p className="text-white/70 text-sm">Book an appointment today and get expert service at the best price.</p>
        </div>
        <Link to="/booking" className="flex-shrink-0 bg-white text-pink-500 font-bold px-10 py-3 rounded-full shadow-lg hover:bg-pink-100 transition text-lg">
          Book Now →
        </Link>
      </div>

      <footer className="w-full bg-white/20 backdrop-blur-md border-t border-white/30 px-6 md:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><span className="text-2xl">🔧</span><span className="text-white font-extrabold text-xl">Mubarak Garage</span></div>
          <div className="flex gap-6 text-white/80 text-sm font-medium">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/services" className="hover:text-white transition">Services</Link>
            <Link to="/booking" className="hover:text-white transition">Booking</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
          <p className="text-white/60 text-sm">© 2025 Mubarak Garage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
