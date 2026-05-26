import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const lastY = useRef(0);
  const isOwner = localStorage.getItem('owner_auth') === 'true';
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollDir(y > lastY.current ? 'down' : 'up');
      setScrolled(y > 30);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('owner_auth');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const links = [
    { to: '/',          label: 'Home',      icon: '🏠' },
    { to: '/services',  label: 'Services',  icon: '⚙️' },
    { to: '/booking',   label: 'Booking',   icon: '📅' },
    { to: '/contact',   label: 'Contact',   icon: '📞' },
    ...(isOwner ? [{ to: '/dashboard', label: 'Dashboard', icon: '📊' }] : []),
  ];

  return (
    <nav
      className={`flex items-center justify-between px-8 py-4 sticky top-0 z-50
        transition-all duration-500
        ${scrolled
          ? 'bg-black/70 backdrop-blur-2xl shadow-2xl border-b border-orange-500/20'
          : 'bg-black/25 backdrop-blur-md border-b border-white/5'
        }
        ${scrollDir === 'down' && scrolled ? '-translate-y-1' : 'translate-y-0'}
      `}
    >
      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-3 group animate-slide-down">
        <div className="relative">
          {/* Orbit dot */}
          <span
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-orbit"
            style={{ top: '50%', left: '50%', marginTop: '-4px', marginLeft: '-4px' }}
          />
          <span className="text-3xl relative z-10 group-hover:animate-spin-slow inline-block transition-transform duration-500">🔧</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-400 rounded-full animate-heartbeat" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-extrabold tracking-wide shimmer-text">Mubarak Garage</span>
          <span className="text-[10px] text-white/45 font-medium tracking-widest uppercase">Est. 2000 · Kushinagar</span>
        </div>
      </Link>

      {/* ── Desktop Links ── */}
      <ul className="hidden md:flex gap-8 text-white font-semibold text-sm">
        {links.map(({ to, label }, i) => (
          <li key={to} className={`animate-slide-down delay-${(i + 1) * 100}`}>
            <Link
              to={to}
              className={`nav-link transition-colors duration-200 relative group ${
                isActive(to) ? 'text-orange-300 active' : 'text-white/75 hover:text-white'
              }`}
            >
              {label}
              {isActive(to) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-orange-400 to-rose-400 rounded-full animate-wipe-in" />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* ── CTA ── */}
      <div className="hidden md:flex items-center gap-3 animate-slide-down delay-600">
        {isOwner ? (
          <button
            onClick={logout}
            className="btn-neon bg-white/8 hover:bg-white/15 border border-white/15 text-white font-semibold px-5 py-2 rounded-full text-sm"
          >
            🚪 Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn-neon bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold px-6 py-2 rounded-full shadow-lg text-sm animate-pulse-glow-orange"
          >
            Owner Login
          </Link>
        )}
      </div>

      {/* ── Mobile Hamburger ── */}
      <button
        className="md:hidden text-white text-xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 transition-all duration-200 active:scale-90"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}>
          {menuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* ── Mobile Menu ── */}
      <div
        className={`absolute top-full left-0 w-full md:hidden bg-black/85 backdrop-blur-2xl border-b border-white/8 px-8 py-5 flex flex-col gap-1 shadow-2xl
          transition-all duration-400 origin-top
          ${menuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'}
        `}
        style={{ transformOrigin: 'top' }}
      >
        {links.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 py-3 px-3 rounded-xl border-b border-white/6 transition-all duration-200 text-sm font-semibold
              ${isActive(to)
                ? 'text-orange-300 bg-orange-500/10'
                : 'text-white/75 hover:text-white hover:bg-white/6'
              }`}
          >
            <span>{icon}</span> {label}
          </Link>
        ))}
        <div className="pt-2">
          {isOwner ? (
            <button onClick={logout} className="w-full text-left text-red-300 py-3 px-3 text-sm font-semibold hover:bg-red-500/10 rounded-xl transition">
              🚪 Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-orange-300 py-3 px-3 text-sm font-semibold hover:bg-orange-500/10 rounded-xl transition"
            >
              🔐 Owner Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
