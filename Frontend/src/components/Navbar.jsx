import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOwner = localStorage.getItem('owner_auth') === 'true';
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('owner_auth');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white/20 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🔧</span>
        <span className="text-2xl font-extrabold text-white drop-shadow tracking-wide">Mubarak Garage</span>
      </div>

      {/* Desktop */}
      <ul className="hidden md:flex gap-8 text-white font-semibold text-lg">
        <li><Link to="/" className="hover:text-pink-200 transition-colors">Home</Link></li>
        <li><Link to="/services" className="hover:text-pink-200 transition-colors">Services</Link></li>
        <li><Link to="/booking" className="hover:text-pink-200 transition-colors">Booking</Link></li>
        <li><Link to="/contact" className="hover:text-pink-200 transition-colors">Contact</Link></li>
        {isOwner && (
          <li><Link to="/dashboard" className="hover:text-pink-200 transition-colors">Dashboard</Link></li>
        )}
      </ul>

      <div className="hidden md:flex items-center gap-3">
        {isOwner ? (
          <button
            onClick={logout}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-5 py-2 rounded-full transition text-sm"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-white text-pink-500 font-bold px-5 py-2 rounded-full shadow hover:bg-pink-100 transition">
            Login
          </Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-white/30 backdrop-blur-md px-8 py-4 flex flex-col gap-4 text-white font-semibold text-lg shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)}>Booking</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          {isOwner && <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
          {isOwner
            ? <button onClick={logout} className="text-left text-red-200">Logout</button>
            : <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          }
        </div>
      )}
    </nav>
  );
}
