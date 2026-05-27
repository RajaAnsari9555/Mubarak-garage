import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black/70 backdrop-blur-xl border-t border-white/10 overflow-hidden">

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* Main grid */}
      <div className="px-6 md:px-16 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Col 1: Brand ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-swing inline-block">🔧</span>
              <div>
                <p className="text-xl font-extrabold shimmer-text leading-none">Mubarak Garage</p>
                <p className="text-white/40 text-[10px] tracking-widest uppercase mt-0.5">Est. 2000 · Kushinagar</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Your trusted repair center for all types of heavy &amp; light vehicles. 25+ years of professional expertise.
            </p>
            {/* Rating badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/25 rounded-full px-4 py-2 w-fit">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="text-white/70 text-xs font-semibold">5.0 · 500+ Customers</span>
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-400 rounded-full inline-block" />
              Quick Links
            </h4>
            {[
              { to: '/',         label: 'Home',     icon: '🏠' },
              { to: '/services', label: 'Services', icon: '⚙️' },
              { to: '/booking',  label: 'Booking',  icon: '📅' },
              { to: '/contact',  label: 'Contact',  icon: '📞' },
            ].map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2.5 text-white/55 hover:text-orange-300 text-sm font-medium transition-colors duration-200 group"
              >
                <span className="text-base group-hover:animate-swing inline-block">{icon}</span>
                <span className="nav-link">{label}</span>
              </Link>
            ))}
          </div>

          {/* ── Col 3: Services ── */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-400 rounded-full inline-block" />
              Our Services
            </h4>
            {[
              'Engine Overhaul',
              'Tyre & Wheel',
              'Electrical Systems',
              'AC & Cooling',
              'Body & Welding',
              'Greasing & Lubrication',
            ].map((s) => (
              <Link
                key={s}
                to="/services"
                className="flex items-center gap-2 text-white/55 hover:text-orange-300 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-orange-400/60 shrink-0" />
                {s}
              </Link>
            ))}
          </div>

          {/* ── Col 4: Contact Info ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-400 rounded-full inline-block" />
              Contact Us
            </h4>

            <a
              href="tel:7897659266"
              className="flex items-start gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/25 flex items-center justify-center text-base shrink-0 group-hover:bg-orange-500/35 transition-colors">
                📞
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Phone</p>
                <p className="text-white font-bold text-sm group-hover:text-orange-300 transition-colors">78976592**</p>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/25 flex items-center justify-center text-base shrink-0">
                📍
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Address</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Ramkola, Kaptainganj Road<br />
                  Front of 2nd Petrol Pump<br />
                  Dist. Kushinagar — 274305
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/25 flex items-center justify-center text-base shrink-0">
                🕘
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Hours</p>
                <p className="text-white/80 text-sm">Mon – Sat: 8 AM – 8 PM</p>
                <p className="text-white/40 text-xs">Sunday: By Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-16 h-px bg-white/8" />

      {/* Bottom bar */}
      <div className="px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/35 text-xs">
          © {year} Mubarak Garage House. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-white/30 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open Today · 8:00 AM – 8:00 PM
        </div>
        <p className="text-white/25 text-xs">
          Designed with ❤️ for Mubarak Garage
        </p>
      </div>

    </footer>
  );
}
