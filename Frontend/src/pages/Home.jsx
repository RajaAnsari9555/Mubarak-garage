import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { useTypewriter } from '../hooks/useTypewriter';
import garageBg from '../assets/Garage.png.png';

/* ── Tilt Card wrapper ─────────────────────────────────────────── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px) scale(1.02)`;
  };

  const handleLeave = (e) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      className={`tilt-card card-shine ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ── Stat Card with count-up ───────────────────────────────────── */
function StatCard({ value, label, icon, delay }) {
  const [ref, visible] = useScrollReveal(0.3);
  const displayed = useCountUp(value, 1600, visible);

  return (
    <div
      ref={ref}
      className={`reveal-scale glass-card card-shine rounded-2xl p-6 text-center ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div className="text-3xl mb-2 animate-float" style={{ animationDelay: delay }}>{icon}</div>
      <p className="text-4xl font-extrabold text-orange-400 drop-shadow tabular-nums">{displayed}</p>
      <p className="text-white/65 text-sm font-medium mt-1">{label}</p>
    </div>
  );
}

/* ── Vehicles marquee ──────────────────────────────────────────── */
const VEHICLES = ['🚌 Bus', '🚛 Truck', '🚗 4-Wheeler', '🚐 Van', '🏗️ Heavy Machinery', '🚑 Ambulance', '🚒 Fire Truck', '🚜 Tractor'];

export default function Home() {
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
    { value: '25+', label: 'Years Experience',      icon: '🏆', delay: '0s' },
    { value: '8+',  label: 'Years in Saudi Arabia', icon: '🇸🇦', delay: '0.1s' },
    { value: '500+',label: 'Vehicles Repaired',     icon: '🚗', delay: '0.2s' },
    { value: '100%',label: 'Customer Satisfaction', icon: '⭐', delay: '0.3s' },
  ];

  /* Typewriter for hero */
  const [heroRef, heroVisible] = useScrollReveal(0.1);
  const typed = useTypewriter('Mubarak', 80, heroVisible);

  /* Scroll reveal refs */
  const [featuresRef, featuresVisible] = useScrollReveal(0.1);
  const [testiRef, testiVisible]       = useScrollReveal(0.1);
  const [ctaRef, ctaVisible]           = useScrollReveal(0.2);

  /* Spark burst on Book Now */
  const [sparks, setSparks] = useState([]);
  const triggerSparks = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const newSparks = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * 2 * Math.PI;
      const dist = 40 + Math.random() * 30;
      return {
        id: Date.now() + i,
        cx, cy,
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist}px`,
      };
    });
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 600);
  };

  return (
    <div
      className="min-h-screen font-sans relative"
      style={{
        backgroundImage: `url(${garageBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/68 z-0" />

      {/* Morphing blobs — clipped so they don't overflow horizontally */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-96 h-96 bg-orange-500 top-20 -left-32" />
        <div className="blob w-80 h-80 bg-rose-600 bottom-40 -right-20" style={{ animationDelay: '3s' }} />
        <div className="blob w-64 h-64 bg-amber-500 top-1/2 left-1/2" style={{ animationDelay: '6s' }} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className={`particle ${i % 3 === 0 ? 'particle-orange' : i % 3 === 1 ? 'particle-gold' : ''}`}
            style={{
              width:  `${3 + (i % 5) * 2}px`,
              height: `${3 + (i % 5) * 2}px`,
              left:   `${(i * 5.7) % 100}%`,
              top:    `${(i * 11 + 15) % 90}%`,
              animationDuration: `${4 + (i % 6) * 1.5}s`,
              animationDelay:    `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <div ref={heroRef} className="w-full px-6 md:px-16 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-14">

            {/* Left */}
            <div className="flex-1 text-left">
              {/* Badge */}
              <div className={`reveal ${heroVisible ? 'visible' : ''} inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase`}>
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-heartbeat" />
                Trusted Since 2000 · Kushinagar
              </div>

              {/* Headline with typewriter */}
              <h1 className={`reveal ${heroVisible ? 'visible' : ''} text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5`} style={{ transitionDelay: '0.1s' }}>
                Welcome To<br />
                <span className="shimmer-text glitch-text" data-text={typed}>
                  {typed}
                  {typed.length < 7 && <span className="typewriter-cursor" />}
                </span>
                <br />
                <span className="text-orange-400 animate-neon-flicker">Garage House</span>
              </h1>

              <p className={`reveal ${heroVisible ? 'visible' : ''} text-lg md:text-xl text-white/70 mb-7 max-w-lg leading-relaxed`} style={{ transitionDelay: '0.2s' }}>
                Your trusted repair center for all types of heavy &amp; light vehicles. Professional service with decades of expertise.
              </p>

              {/* CTA Buttons */}
              <div className={`reveal ${heroVisible ? 'visible' : ''} flex gap-4 flex-wrap`} style={{ transitionDelay: '0.3s' }}>
                <Link
                  to="/booking"
                  onClick={triggerSparks}
                  className="btn-neon relative bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold px-9 py-3.5 rounded-full shadow-xl text-lg animate-pulse-glow-orange"
                >
                  Book Now →
                  {sparks.map((s) => (
                    <span
                      key={s.id}
                      className="absolute w-2 h-2 rounded-full bg-orange-300 pointer-events-none"
                      style={{
                        left: s.cx,
                        top: s.cy,
                        '--tx': s.tx,
                        '--ty': s.ty,
                        animation: 'spark 0.5s ease-out forwards',
                      }}
                    />
                  ))}
                </Link>
                <Link
                  to="/services"
                  className="btn-neon bg-white/10 border border-white/30 text-white font-bold px-9 py-3.5 rounded-full text-lg hover:bg-white/20"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Right: Owner Card */}
            <div className={`reveal-left ${heroVisible ? 'visible' : ''} shrink-0 w-full md:w-96`} style={{ transitionDelay: '0.15s' }}>
              <div className="glass-card card-shine rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-5 animate-pulse-glow border border-orange-400/25">
                  {/* Photo with ripple rings */}
                  <div className="relative flex items-center justify-center w-44 h-44">
                    <div className="ripple-ring w-44 h-44" style={{ animationDelay: '0s' }} />
                    <div className="ripple-ring w-44 h-44" style={{ animationDelay: '0.9s' }} />
                    <div className="ripple-ring w-44 h-44" style={{ animationDelay: '1.8s' }} />
                    <img
                      src="/mubarakansari.jpeg"
                      alt="Mr Mubarak Ansari"
                      className="relative z-10 w-36 h-36 rounded-full object-cover border-4 border-orange-400/70 shadow-2xl animate-float-slow"
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-extrabold text-white shimmer-text-white">Mr. Mubarak Ansari</h2>
                    <p className="text-orange-300 text-sm font-semibold mt-0.5">Owner &amp; Master Technician</p>
                  </div>

                  <div className="w-full border-t border-white/10 pt-3 flex flex-col gap-2">
                    {[
                      { icon: '🏆', title: '25 Years of Experience', sub: 'Expert in all vehicle repairs' },
                      { icon: '🇸🇦', title: '8 Years in Saudi Arabia', sub: 'International automotive expertise' },
                      { icon: '🔩', title: 'All Vehicle Types', sub: 'Bus, Truck, 4-Wheeler, Van & more' },
                    ].map((item, i) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 bg-white/8 hover:bg-white/14 rounded-xl px-4 py-3 transition-all duration-300 cursor-default group"
                      >
                        <span className="text-2xl group-hover:animate-swing inline-block">{item.icon}</span>
                        <div>
                          <p className="text-white font-bold text-sm">{item.title}</p>
                          <p className="text-white/50 text-xs">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ VEHICLE MARQUEE ═══════════════════════════════════════ */}
        <div className="w-full overflow-hidden py-5 mb-6 border-y border-white/8 bg-black/20 backdrop-blur-sm">
          <div className="marquee-track gap-6 flex">
            {[...VEHICLES, ...VEHICLES].map((v, i) => (
              <span
                key={i}
                className="shrink-0 glass-card text-white/85 font-semibold px-5 py-2.5 rounded-full text-sm border border-white/10 hover:border-orange-400/50 hover:text-orange-300 transition-colors duration-200 cursor-default"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* ══ STATS ═════════════════════════════════════════════════ */}
        <div className="w-full px-6 md:px-16 pb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* ══ FEATURES ══════════════════════════════════════════════ */}
        <div ref={featuresRef} className="w-full px-6 md:px-16 pb-16">
          <div className={`reveal text-center mb-10 ${featuresVisible ? 'visible' : ''}`}>
            <span className="inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase">
              Our Expertise
            </span>
            <h2 className="text-4xl font-extrabold text-white drop-shadow">
              What We <span className="shimmer-text">Fix</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`reveal glass-card card-shine rounded-2xl p-6 ${featuresVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <TiltCard className="glass-card rounded-2xl p-6 -m-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-3xl mb-4 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                    {f.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-orange-400 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available Now
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TESTIMONIALS ══════════════════════════════════════════ */}
        <div ref={testiRef} className="w-full px-6 md:px-16 pb-16">
          <div className={`reveal text-center mb-10 ${testiVisible ? 'visible' : ''}`}>
            <span className="inline-block bg-white/8 border border-white/15 text-white/60 text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase">
              Reviews
            </span>
            <h2 className="text-4xl font-extrabold text-white drop-shadow">
              What Our <span className="shimmer-text">Customers</span> Say
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TiltCard
                key={t.name}
                className={`reveal glass-card rounded-2xl p-6 flex flex-col gap-3 ${testiVisible ? 'visible' : ''}`}
              >
                <div
                  className={`reveal glass-card rounded-2xl p-6 flex flex-col gap-3 ${testiVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="flex gap-0.5 text-yellow-400 text-xl animate-pulse-glow-gold">
                    {'★'.repeat(t.stars)}
                  </div>
                  <p className="text-white/80 text-sm italic leading-relaxed">"{t.review}"</p>
                  <div className="mt-auto pt-3 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow animate-heartbeat">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-white/45 text-xs">{t.vehicle}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* ══ CONTACT STRIP ═════════════════════════════════════════ */}
        <div ref={ctaRef} className="w-full px-6 md:px-16 pb-12">
          <div className={`reveal scan-line-container glass-card card-shine rounded-3xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse-glow ${ctaVisible ? 'visible' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-2xl shadow animate-float">
                📞
              </div>
              <div>
                <p className="text-white/45 text-xs font-semibold uppercase tracking-widest">Call Us</p>
                <a href="tel:7897659266" className="text-white font-extrabold text-xl hover:text-orange-300 transition-colors">
                  78976592**
                </a>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/12" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-2xl shadow animate-float delay-300">
                📍
              </div>
              <div>
                <p className="text-white/45 text-xs font-semibold uppercase tracking-widest">Our Location</p>
                <p className="text-white font-bold text-sm leading-snug">
                  Ramkola, Kaptainganj Road, Front of 2nd Petrol Pump<br />
                  District Kushinagar — 274305
                </p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/12" />
            <Link
              to="/booking"
              className="btn-neon shrink-0 bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold px-8 py-3.5 rounded-full shadow-xl"
            >
              Book Now →
            </Link>
          </div>
        </div>

        {/* ══ FOOTER ════════════════════════════════════════════════ */}
        <Footer />
      </div>
    </div>
  );
}
