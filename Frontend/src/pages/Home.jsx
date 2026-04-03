import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const vehicles = ['🚌 Bus', '🚛 Truck', '🚗 4-Wheeler', '🚐 Van', '🏗️ Heavy Machinery'];

  const features = [
    { icon: '⚙️', title: 'Engine Overhaul', desc: 'Complete engine rebuild & diagnostics for all vehicle types' },
    { icon: '🛞', title: 'Tyre & Wheel', desc: 'Balancing, alignment and tyre replacement services' },
    { icon: '🔋', title: 'Electrical Systems', desc: 'Battery, wiring and full electrical fault repair' },
    { icon: '🧰', title: 'Body & Chassis', desc: 'Frame repair, welding and body restoration' },
    { icon: '❄️', title: 'AC & Cooling', desc: 'AC servicing and radiator repair for all vehicles' },
    { icon: '🛢️', title: 'Oil & Fluids', desc: 'Full service oil change and fluid top-up packages' },
  ];

  const testimonials = [
    { name: 'Ahmed Khan', vehicle: 'Truck Owner', review: 'Got my engine fully replaced at the lowest price I could find anywhere. Mubarak Garage is simply the best!', stars: 5 },
    { name: 'Ravi Sharma', vehicle: 'Bus Driver', review: 'All spare parts were available on the spot. No waiting, no delays. Fixed my bus in just one day.', stars: 5 },
    { name: 'Salman Qureshi', vehicle: '4-Wheeler Owner', review: 'The workers are so skilled and professional. They explained every issue clearly before starting the work.', stars: 5 },
    { name: 'Imran Siddiqui', vehicle: 'Van Owner', review: 'Very honest pricing and quality work. My van AC was repaired perfectly. Highly recommended!', stars: 5 },
    { name: 'Farhan Ali', vehicle: 'Heavy Vehicle Driver', review: 'Mr. Mubarak himself supervised my truck repair. 25 years of experience really shows in the quality.', stars: 5 },
    { name: 'Zubair Malik', vehicle: 'Car Owner', review: 'Changed my engine oil and got full service done. Cheapest rates in the area with top quality work!', stars: 5 },
  ];

  const stats = [
    { value: '25+', label: 'Years Experience' },
    { value: '8', label: 'Years in Saudi Arabia' },
    { value: '500+', label: 'Vehicles Repaired' },
    { value: '100%', label: 'Customer Satisfaction' },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #86efac 100%)' }}>
      <Navbar />

      {/* Hero Section */}
      <div className="w-full px-6 md:px-16 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Left: Text + Vehicles */}
          <div className="flex-1 text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight">
            Welcome To  Mubarak<br />Garage House
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-lg">
              Your trusted repair center for all types of heavy & light vehicles. Professional service with decades of expertise.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {vehicles.map((v) => (
                <span key={v} className="bg-white/30 backdrop-blur text-white font-semibold px-4 py-2 rounded-full text-sm shadow">
                  {v}
                </span>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link to="/booking" className="bg-white text-pink-500 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-pink-100 transition text-lg">
                Book Now
              </Link>
              <Link to="/services" className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/20 transition text-lg">
                Our Services
              </Link>
            </div>
          </div>

          {/* Right: Owner Card */}
          <div className="flex-shrink-0 w-full md:w-96 bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-5">
            <img
              src="/mubarakansari.jpeg"
              alt="Mr Mubarak Ansari"
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-xl font-extrabold text-white drop-shadow">Mr. Mubarak Ansari</h2>
              <p className="text-white/80 text-sm font-medium">Owner & Master Technician</p>
            </div>
            <div className="w-full border-t border-white/30 pt-3 flex flex-col gap-2">
              <div className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-white font-bold text-sm">25 Years of Experience</p>
                  <p className="text-white/70 text-xs">Expert in all vehicle repairs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3">
                <span className="text-2xl">🇸🇦</span>
                <div>
                  <p className="text-white font-bold text-sm">8 Years in Saudi Arabia</p>
                  <p className="text-white/70 text-xs">International automotive expertise</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3">
                <span className="text-2xl">🔩</span>
                <div>
                  <p className="text-white font-bold text-sm">All Vehicle Types</p>
                  <p className="text-white/70 text-xs">Bus, Truck, 4-Wheeler, Van & more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full px-6 md:px-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/25 backdrop-blur rounded-2xl p-5 text-center shadow">
              <p className="text-4xl font-extrabold text-white drop-shadow">{s.value}</p>
              <p className="text-white/80 text-sm font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full px-6 md:px-16 pb-16">
        <h2 className="text-3xl font-extrabold text-white drop-shadow mb-8 text-center">What We Fix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow hover:bg-white/35 transition">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="text-white font-bold text-lg mt-3 mb-1">{f.title}</h3>
              <p className="text-white/75 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}

      <div className="w-full px-6 md:px-16 pb-16">
        <h2 className="text-3xl font-extrabold text-white drop-shadow mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow flex flex-col gap-3 hover:bg-white/35 transition">
              <div className="flex gap-1 text-yellow-300 text-lg">
                {'★'.repeat(t.stars)}
              </div>
              <p className="text-white/90 text-sm italic">"{t.review}"</p>
              <div className="mt-auto pt-3 border-t border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-white/60 text-xs">{t.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info Strip */}
      <div className="w-full px-6 md:px-16 pb-10">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center text-2xl shadow">📞</div>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Call Us</p>
              <a href="tel:7897659266" className="text-white font-extrabold text-xl hover:text-pink-200 transition">7897659266</a>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/25" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center text-2xl shadow">📍</div>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Our Location</p>
              <p className="text-white font-bold text-sm leading-snug">
                Ramkola, Kaptainganj Road, Front of 2nd Petrol Pump<br />
                District Kushinagar — 274305
              </p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/25" />
          <Link to="/booking" className="flex-shrink-0 bg-white text-pink-500 font-bold px-7 py-3 rounded-full shadow-lg hover:bg-pink-100 transition">
            Book Now →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white/20 backdrop-blur-md border-t border-white/30 px-6 md:px-16 py-8 mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            <span className="text-white font-extrabold text-xl">Mubarak Garage</span>
          </div>
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
