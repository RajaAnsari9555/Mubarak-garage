import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import garageBg from '../assets/Garage.png.png';

const services = [
  { category: 'Engine & Transmission', icon: '⚙️', accent: 'from-rose-500/25 to-pink-500/8',    border: 'border-rose-400/25',
    items: ['Complete Engine Replacement & Rebuild','Engine Tuning & Diagnostics','Transmission Repair & Overhaul','Gearbox Replacement','Clutch Repair & Replacement'] },
  { category: 'Heavy Vehicles (Bus & Truck)', icon: '🚛', accent: 'from-orange-500/25 to-amber-500/8', border: 'border-orange-400/25',
    items: ['Full Truck Engine Overhaul','Bus Chassis & Frame Repair','Differential & Axle Repair','Air Brake System Service','Suspension & Leaf Spring Repair'] },
  { category: '4-Wheeler Services', icon: '🚗', accent: 'from-sky-500/25 to-blue-500/8',       border: 'border-sky-400/25',
    items: ['Car Engine Repair & Replacement','Brake Pad & Disc Replacement','Steering & Suspension Repair','Exhaust System Repair','Full Car Service & Inspection'] },
  { category: 'Greasing & Lubrication', icon: '🛢️', accent: 'from-yellow-500/25 to-lime-500/8', border: 'border-yellow-400/25',
    items: ['Full Vehicle Greasing','Chassis Lubrication','Wheel Bearing Greasing','Differential Oil Change','Gear Oil Replacement'] },
  { category: 'Fuel System', icon: '⛽', accent: 'from-purple-500/25 to-violet-500/8',          border: 'border-purple-400/25',
    items: ['Fuel Pump Repair & Replacement','Fuel Injector Cleaning','Fuel Tank Repair & Cleaning','Carburetor Overhaul','Diesel Injection System Service'] },
  { category: 'Electrical & Battery', icon: '🔋', accent: 'from-cyan-500/25 to-teal-500/8',    border: 'border-cyan-400/25',
    items: ['Battery Replacement & Testing','Alternator & Starter Motor Repair','Full Wiring & Electrical Fault Fix','Headlight & Indicator Repair','ECU Diagnostics'] },
  { category: 'Tyres & Wheels', icon: '🛞', accent: 'from-green-500/25 to-emerald-500/8',      border: 'border-green-400/25',
    items: ['Tyre Replacement (All Sizes)','Wheel Balancing & Alignment','Puncture Repair','Rim Repair & Straightening','Spare Tyre Fitting'] },
  { category: 'AC & Cooling System', icon: '❄️', accent: 'from-blue-500/25 to-indigo-500/8',   border: 'border-blue-400/25',
    items: ['AC Gas Refilling & Repair','Radiator Flush & Replacement','Cooling Fan Repair','Thermostat Replacement','Heater Core Service'] },
  { category: 'Body & Welding', icon: '🧰', accent: 'from-fuchsia-500/25 to-pink-500/8',       border: 'border-fuchsia-400/25',
    items: ['Body Panel Repair & Replacement','Welding & Fabrication','Rust Treatment & Prevention','Denting & Painting','Bumper & Door Repair'] },
];

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px) scale(1.02)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return <div ref={ref} className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={leave}>{children}</div>;
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal(0.2);
  const [gridRef,   gridVisible]   = useScrollReveal(0.05);
  const [ctaRef,    ctaVisible]    = useScrollReveal(0.3);

  return (
    <div
      className="min-h-screen font-sans relative"
      style={{ backgroundImage: `url(${garageBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-black/72 z-0" />

      {/* Blobs — clipped so they don't overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-80 h-80 bg-orange-600 top-10 -right-20" />
        <div className="blob w-72 h-72 bg-rose-600 bottom-20 -left-16" style={{ animationDelay: '4s' }} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle ${i % 2 === 0 ? 'particle-orange' : ''}`}
            style={{ width: `${3+(i%4)*2}px`, height: `${3+(i%4)*2}px`, left: `${(i*8.5)%100}%`, top: `${(i*13+10)%88}%`, animationDuration: `${5+(i%5)*1.5}s`, animationDelay: `${i*0.4}s` }} />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Header */}
        <div ref={headerRef} className="text-center px-6 pt-16 pb-12">
          <span className={`reveal ${headerVisible ? 'visible' : ''} inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase`}>
            What We Offer
          </span>
          <h1 className={`reveal ${headerVisible ? 'visible' : ''} text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4`} style={{ transitionDelay: '0.1s' }}>
            Our <span className="shimmer-text">Services</span>
          </h1>
          <p className={`reveal ${headerVisible ? 'visible' : ''} text-white/60 text-lg max-w-xl mx-auto`} style={{ transitionDelay: '0.2s' }}>
            From heavy trucks to small cars — every repair handled with 25+ years of expertise.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="w-full px-6 md:px-16 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.category}
                className={`reveal ${gridVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <TiltCard className={`card-shine relative overflow-hidden rounded-3xl bg-linear-to-br ${s.accent} border ${s.border} shadow-xl backdrop-blur-md p-6 flex flex-col gap-4`}>
                  {/* Glow blob */}
                  <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/5 blur-2xl pointer-events-none" />

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/12 flex items-center justify-center text-3xl shadow-md animate-float" style={{ animationDelay: `${i * 0.25}s` }}>
                      {s.icon}
                    </div>
                    <h3 className="text-white font-extrabold text-sm leading-snug">{s.category}</h3>
                  </div>

                  <div className="w-full h-px bg-linear-to-r from-white/30 via-white/8 to-transparent" />

                  <ul className="flex flex-col gap-2 relative z-10">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-orange-400/25 border border-orange-400/35 flex items-center justify-center text-orange-300 text-[9px] shrink-0">✔</span>
                        <span className="text-white/78 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2 relative z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/8 hover:bg-white/14 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Available Now
                    </span>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mx-6 md:mx-16 mb-16">
          <div className={`reveal scan-line-container glass-card card-shine rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl animate-pulse-glow ${ctaVisible ? 'visible' : ''}`}>
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Ready to get your vehicle fixed?</h2>
              <p className="text-white/50 text-sm">Book an appointment today and get expert service at the best price.</p>
            </div>
            <Link to="/booking" className="btn-neon shrink-0 bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold px-10 py-3.5 rounded-full shadow-xl text-lg animate-pulse-glow-orange">
              Book Now →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
