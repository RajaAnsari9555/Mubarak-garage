import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const vehicleTypes = ['Bus', 'Truck', 'Car / 4-Wheeler', 'Van', 'Heavy Machinery', 'Other'];

const serviceOptions = [
  'Engine Repair / Replacement',
  'Transmission & Gearbox',
  'Brake System',
  'Tyre & Wheel',
  'Electrical & Battery',
  'AC & Cooling',
  'Fuel System',
  'Greasing & Lubrication',
  'Body & Welding',
  'Full Service',
  'Other / Not Sure',
];

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicleType: '',
    service: '',
    problem: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #86efac 100%)' }}>
      <Navbar />

      {/* Page Header */}
      <div className="text-center px-6 pt-14 pb-8">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
          Book a Visit
        </span>
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-3">Book an Appointment</h1>
        <p className="text-white/80 text-lg max-w-lg mx-auto">
          Fill in your details and we'll confirm your slot. Fast, easy, and hassle-free.
        </p>
      </div>

      {/* Form Card */}
      <div className="flex justify-center px-6 pb-16">
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 md:p-10">

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <span className="text-6xl">✅</span>
              <h2 className="text-2xl font-extrabold text-white">Booking Confirmed!</h2>
              <p className="text-white/80 text-base max-w-sm">
                Thank you <span className="font-bold">{form.name}</span>! We've received your booking and will contact you on <span className="font-bold">{form.phone}</span> shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', vehicleType: '', service: '', problem: '' }); }}
                className="mt-4 bg-white text-pink-500 font-bold px-8 py-3 rounded-full shadow hover:bg-pink-100 transition"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Full Name</label>
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

              {/* Phone */}
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

              {/* Vehicle Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Vehicle Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {vehicleTypes.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setForm({ ...form, vehicleType: v })}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        form.vehicleType === v
                          ? 'bg-white text-pink-500 border-white shadow-md scale-[1.03]'
                          : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Needed */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Service Required</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/70 focus:bg-white/30 transition appearance-none"
                >
                  <option value="" disabled className="text-gray-800">Select a service...</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="text-gray-800">{s}</option>
                  ))}
                </select>
              </div>

              {/* Problem Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white font-semibold text-sm">Describe the Problem</label>
                <textarea
                  name="problem"
                  value={form.problem}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="e.g. Engine makes noise when starting, smoke from exhaust..."
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/70 focus:bg-white/30 transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-white text-pink-500 font-extrabold py-4 rounded-2xl shadow-lg hover:bg-pink-100 transition text-lg mt-2"
              >
                Confirm Booking →
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
