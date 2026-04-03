import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #86efac 100%)' }}>
      <Navbar />

      {/* Header */}
      <div className="text-center px-6 pt-14 pb-10">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
          Get In Touch
        </span>
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-3">Contact Us</h1>
        <p className="text-white/80 text-lg max-w-lg mx-auto">
          Have a question or need help? Reach out and we'll get back to you quickly.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 md:px-16 pb-16 flex flex-col md:flex-row gap-8 items-start">

        {/* Info Cards */}
        <div className="flex flex-col gap-5 w-full md:w-80 flex-shrink-0">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 flex items-center gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/25 flex items-center justify-center text-3xl shadow">📞</div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Phone</p>
              <a href="tel:7897659266" className="text-white font-extrabold text-lg hover:text-pink-200 transition">
                7897659266
              </a>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 flex items-start gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/25 flex items-center justify-center text-3xl shadow flex-shrink-0">📍</div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Address</p>
              <p className="text-white font-bold text-sm leading-relaxed">
                Ramkola, Kaptainganj Road<br />
                Front of 2nd Petrol Pump<br />
                District Kushinagar — 274305
              </p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 flex items-center gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/25 flex items-center justify-center text-3xl shadow">🕘</div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Working Hours</p>
              <p className="text-white font-bold text-sm">Mon – Sat: 8:00 AM – 8:00 PM</p>
              <p className="text-white/60 text-xs mt-0.5">Sunday: By Appointment</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 flex items-center gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-white/25 flex items-center justify-center text-3xl shadow">👤</div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Owner</p>
              <p className="text-white font-bold text-sm">Mr. Mubarak Ansari</p>
              <p className="text-white/60 text-xs mt-0.5">25 Years Experience</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="text-6xl">✅</span>
              <h2 className="text-2xl font-extrabold text-white">Message Sent!</h2>
              <p className="text-white/80 text-base max-w-sm">
                Thanks <span className="font-bold">{form.name}</span>! We'll reach you on <span className="font-bold">{form.phone}</span> soon.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', phone: '', message: '' }); }}
                className="mt-4 bg-white text-pink-500 font-bold px-8 py-3 rounded-full shadow hover:bg-pink-100 transition"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h2 className="text-2xl font-extrabold text-white mb-1">Send a Message</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ahmed Khan"
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/70 focus:bg-white/30 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 03001234567"
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/70 focus:bg-white/30 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Ask anything — about services, pricing, availability..."
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/70 focus:bg-white/30 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-pink-500 font-extrabold py-4 rounded-2xl shadow-lg hover:bg-pink-100 transition text-lg mt-1"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white/20 backdrop-blur-md border-t border-white/30 px-6 md:px-16 py-8">
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
