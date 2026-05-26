import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import garageBg from '../assets/Garage.png.png';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  const [headerRef, headerVisible] = useScrollReveal(0.2);
  const [cardsRef,  cardsVisible]  = useScrollReveal(0.1);
  const [formRef,   formVisible]   = useScrollReveal(0.1);

  const infoCards = [
    { icon: '📞', label: 'Phone',
      content: <a href="tel:7897659266" className="text-white font-extrabold text-lg hover:text-orange-300 transition-colors">78976592**</a> },
    { icon: '📍', label: 'Address',
      content: <p className="text-white font-bold text-sm leading-relaxed">Ramkola, Kaptainganj Road<br />Front of 2nd Petrol Pump<br />District Kushinagar — 274305</p> },
    { icon: '🕘', label: 'Working Hours',
      content: <><p className="text-white font-bold text-sm">Mon – Sat: 8:00 AM – 8:00 PM</p><p className="text-white/45 text-xs mt-0.5">Sunday: By Appointment</p></> },
    { icon: '👤', label: 'Owner',
      content: <><p className="text-white font-bold text-sm">Mr. Mubarak Ansari</p><p className="text-white/45 text-xs mt-0.5">25 Years Experience</p></> },
  ];

  return (
    <div
      className="min-h-screen font-sans relative"
      style={{ backgroundImage: `url(${garageBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="absolute inset-0 bg-black/72 z-0" />

      {/* Blobs — clipped so they don't overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob w-80 h-80 bg-orange-500 top-16 -left-24" />
        <div className="blob w-64 h-64 bg-rose-600 bottom-24 -right-16" style={{ animationDelay: '4s' }} />
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
        <div ref={headerRef} className="text-center px-6 pt-14 pb-10">
          <span className={`reveal ${headerVisible?'visible':''} inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase`}>
            Get In Touch
          </span>
          <h1 className={`reveal ${headerVisible?'visible':''} text-5xl font-extrabold text-white drop-shadow-lg mb-3`} style={{ transitionDelay:'0.1s' }}>
            Contact <span className="shimmer-text">Us</span>
          </h1>
          <p className={`reveal ${headerVisible?'visible':''} text-white/60 text-lg max-w-lg mx-auto`} style={{ transitionDelay:'0.2s' }}>
            Have a question or need help? Reach out and we'll get back to you quickly.
          </p>
        </div>

        {/* Main */}
        <div className="w-full px-6 md:px-16 pb-16 flex flex-col md:flex-row gap-8 items-start">

          {/* Info Cards */}
          <div ref={cardsRef} className="flex flex-col gap-4 w-full md:w-80 shrink-0">
            {infoCards.map((card, i) => (
              <div
                key={card.label}
                className={`reveal-left ${cardsVisible?'visible':''} glass-card card-shine rounded-3xl p-5 flex items-start gap-4 shadow-lg`}
                style={{ transitionDelay:`${i*0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-2xl shadow shrink-0 animate-float" style={{ animationDelay:`${i*0.5}s` }}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-1">{card.label}</p>
                  {card.content}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div ref={formRef} className={`reveal-right flex-1 ${formVisible?'visible':''}`}>
            <div className="glass-card card-shine rounded-3xl shadow-2xl p-8 border border-orange-400/20 animate-pulse-glow">
                {sent ? (
                  <div className="flex flex-col items-center gap-5 py-12 text-center animate-bounce-in">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="ripple-ring w-24 h-24" style={{ animationDelay:'0s' }} />
                      <div className="ripple-ring w-24 h-24" style={{ animationDelay:'0.9s' }} />
                      <span className="text-6xl animate-float-slow relative z-10">✅</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white shimmer-text-white">Message Sent!</h2>
                    <p className="text-white/65 text-base max-w-sm leading-relaxed">
                      Thanks <span className="font-bold text-orange-300">{form.name}</span>! We'll reach you on{' '}
                      <span className="font-bold text-orange-300">{form.phone}</span> soon.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name:'', phone:'', message:'' }); }}
                      className="btn-neon mt-2 bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold px-9 py-3.5 rounded-full shadow-xl animate-pulse-glow-orange"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h2 className="text-2xl font-extrabold text-white mb-1 shimmer-text-white">Send a Message</h2>

                    {[
                      { name:'name',  label:'Your Name',    type:'text', placeholder:'e.g. Ahmed Khan' },
                      { name:'phone', label:'Phone Number', type:'tel',  placeholder:'e.g. 03001234567' },
                    ].map((field, i) => (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <label className="text-white/75 font-semibold text-sm">{field.label}</label>
                        <div className={`relative transition-all duration-300 ${focused===field.name?'scale-[1.01]':''}`}>
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
                          {focused===field.name && <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />}
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/75 font-semibold text-sm">Your Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                        required
                        rows={5}
                        placeholder="Ask anything — about services, pricing, availability..."
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-400/70 focus:bg-white/12 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-neon w-full bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold py-4 rounded-2xl shadow-xl text-lg mt-1 animate-pulse-glow-orange"
                    >
                      Send Message →
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
