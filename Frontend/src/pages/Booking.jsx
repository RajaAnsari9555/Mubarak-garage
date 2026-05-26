import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import garageBg from '../assets/Garage.png.png';

const vehicleTypes = ['Bus', 'Truck', 'Car / 4-Wheeler', 'Van', 'Heavy Machinery', 'Other'];

const serviceOptions = [
  'Engine Repair / Replacement', 'Transmission & Gearbox', 'Brake System',
  'Tyre & Wheel', 'Electrical & Battery', 'AC & Cooling', 'Fuel System',
  'Greasing & Lubrication', 'Body & Welding', 'Full Service', 'Other / Not Sure',
];

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', vehicleType: '', service: '', problem: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (data.errors ? data.errors[0].msg : "Failed to book your appointment."));
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const [headerRef, headerVisible] = useScrollReveal(0.2);
  const [formRef,   formVisible]   = useScrollReveal(0.1);

  return (
    <div
      className="min-h-screen font-sans relative"
      style={{ backgroundImage: `url(${garageBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-black/72 z-0" />

      {/* Blobs — clipped so they don't overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-72 h-72 bg-orange-500 top-20 -left-20" />
        <div className="blob w-64 h-64 bg-rose-600 bottom-32 -right-16" style={{ animationDelay: '5s' }} />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`particle ${i%2===0?'particle-orange':''}`}
            style={{ width:`${3+(i%4)*2}px`, height:`${3+(i%4)*2}px`, left:`${(i*10)%100}%`, top:`${(i*14+10)%88}%`, animationDuration:`${5+(i%5)*1.5}s`, animationDelay:`${i*0.4}s` }} />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Header */}
        <div ref={headerRef} className="text-center px-6 pt-14 pb-8">
          <span className={`reveal ${headerVisible?'visible':''} inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase`}>
            Book a Visit
          </span>
          <h1 className={`reveal ${headerVisible?'visible':''} text-5xl font-extrabold text-white drop-shadow-lg mb-3`} style={{ transitionDelay:'0.1s' }}>
            Book an <span className="shimmer-text">Appointment</span>
          </h1>
          <p className={`reveal ${headerVisible?'visible':''} text-white/60 text-lg max-w-lg mx-auto`} style={{ transitionDelay:'0.2s' }}>
            Fill in your details and we'll confirm your slot. Fast, easy, and hassle-free.
          </p>
        </div>

        {/* Form */}
        <div ref={formRef} className="flex justify-center px-6 pb-16">
          <div className={`reveal-scale w-full max-w-2xl ${formVisible?'visible':''}`}>
            <div className="glass-card card-shine rounded-3xl shadow-2xl p-8 md:p-10 border border-orange-400/20 animate-pulse-glow">

                {submitted ? (
                  <div className="flex flex-col items-center gap-5 py-10 text-center animate-bounce-in">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="ripple-ring w-24 h-24" style={{ animationDelay:'0s' }} />
                      <div className="ripple-ring w-24 h-24" style={{ animationDelay:'0.9s' }} />
                      <span className="text-6xl animate-float-slow relative z-10">✅</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white shimmer-text-white">Booking Confirmed!</h2>
                    <p className="text-white/65 text-base max-w-sm leading-relaxed">
                      Thank you <span className="font-bold text-orange-300">{form.name}</span>! We've received your booking and will contact you on{' '}
                      <span className="font-bold text-orange-300">{form.phone}</span> shortly.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', vehicleType:'', service:'', problem:'' }); }}
                      className="btn-neon mt-2 bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold px-9 py-3.5 rounded-full shadow-xl animate-pulse-glow-orange"
                    >
                      Book Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {errorMessage && (
                      <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 animate-pulse">
                        <span>⚠️</span> {errorMessage}
                      </div>
                    )}

                    {[
                      { name:'name',  label:'Full Name',    type:'text', placeholder:'e.g. Ahmed Khan' },
                      { name:'phone', label:'Phone Number', type:'tel',  placeholder:'e.g. 03001234567' },
                    ].map((field, i) => (
                      <div key={field.name} className={`reveal ${formVisible?'visible':''} flex flex-col gap-1.5`} style={{ transitionDelay:`${i*0.08}s` }}>
                        <label className="text-white/75 font-semibold text-sm">{field.label}</label>
                        <div className={`relative transition-all duration-300 ${focused===field.name ? 'scale-[1.01]' : ''}`}>
                          <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            onFocus={() => setFocused(field.name)}
                            onBlur={() => setFocused('')}
                            required
                            placeholder={field.placeholder}
                            className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-400/70 focus:bg-white/12 transition-all duration-300"
                          />
                          {focused === field.name && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Vehicle Type */}
                    <div className={`reveal ${formVisible?'visible':''} flex flex-col gap-1.5`} style={{ transitionDelay:'0.16s' }}>
                      <label className="text-white/75 font-semibold text-sm">Vehicle Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {vehicleTypes.map((v) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setForm({ ...form, vehicleType: v })}
                            className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-250 ${
                              form.vehicleType === v
                                ? 'bg-linear-to-r from-orange-500 to-rose-500 text-white border-transparent shadow-lg scale-[1.05] animate-pulse-glow-orange'
                                : 'bg-white/8 border-white/15 text-white/75 hover:bg-white/14 hover:border-orange-400/40 hover:text-white hover:scale-[1.02]'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Service */}
                    <div className={`reveal ${formVisible?'visible':''} flex flex-col gap-1.5`} style={{ transitionDelay:'0.24s' }}>
                      <label className="text-white/75 font-semibold text-sm">Service Required</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        onFocus={() => setFocused('service')}
                        onBlur={() => setFocused('')}
                        required
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400/70 focus:bg-white/12 transition-all duration-300 appearance-none"
                      >
                        <option value="" disabled className="text-gray-800">Select a service...</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s} className="text-gray-800">{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Problem */}
                    <div className={`reveal ${formVisible?'visible':''} flex flex-col gap-1.5`} style={{ transitionDelay:'0.32s' }}>
                      <label className="text-white/75 font-semibold text-sm">Describe the Problem</label>
                      <textarea
                        name="problem"
                        value={form.problem}
                        onChange={handleChange}
                        onFocus={() => setFocused('problem')}
                        onBlur={() => setFocused('')}
                        required
                        rows={4}
                        placeholder="e.g. Engine makes noise when starting, smoke from exhaust..."
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-400/70 focus:bg-white/12 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`reveal ${formVisible?'visible':''} btn-neon w-full bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold py-4 rounded-2xl shadow-xl text-lg mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'animate-pulse-glow-orange'}`}
                      style={{ transitionDelay:'0.4s' }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin text-xl">⏳</span> Processing...
                        </span>
                      ) : (
                        "Confirm Booking →"
                      )}
                    </button>
                  </form>
                )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
