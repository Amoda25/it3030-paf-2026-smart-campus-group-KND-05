import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  HelpCircle,
  Headphones,
  Map as MapIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import contactHero from '../assets/contact_hero.png';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! Our campus consultant will contact you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    { q: "How do I book a campus facility?", a: "To book a facility, log in to your UniHub account, navigate to 'Facilities', select your desired hall or equipment, and choose an available time slot." },
    { q: "How can I track my maintenance request?", a: "You can track the status of your requests in the 'My Tickets' section of your dashboard. You will see real-time updates as technicians are assigned." },
    { q: "Who should I contact for emergency maintenance?", a: "For urgent issues, please use the 'Emergency' tag when submitting a ticket or call our 24/7 hotline directly at +94 11 234 5678." },
    { q: "Is the UniHub platform accessible for visitors?", a: "Currently, UniHub is optimized for registered students and staff. Guests can view public facilities but require an account for bookings." }
  ];

  return (
    <div className="contact-page-refined" style={{ background: '#fff' }}>
      {/* Breadcrumbs */}
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', opacity: 0.7 }}>Home</Link>
          <ChevronRight size={12} strokeWidth={3} />
          <span>Contact Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '40vh', 
        minHeight: '350px', 
        width: '100%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4rem'
      }}>
        <img 
          src={contactHero} 
          alt="Contact Hero" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(30, 58, 138, 0.5))', 
          zIndex: 2 
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ 
            fontSize: '4.5rem', 
            fontFamily: "'Outfit', sans-serif", 
            fontWeight: '800', 
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>Better connection,<br /> better campus</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            We're here to help you optimize your campus experience. Reach out to us anytime.
          </p>
        </div>
      </section>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', marginBottom: '80px' }}>
        {/* Contact Info Tiles */}
        <div className="flex flex-col gap-6">
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Help Center</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0 2rem' }}>Get in touch <br />by any means</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
             {[
               { icon: <Mail />, title: 'Email Support', info: 'support@unihub.com', color: '#3b82f6' },
               { icon: <Phone />, title: '24/7 Hotline', info: '+94 11 234 5678', color: '#10b981' },
               { icon: <MapPin />, title: 'Physical Office', info: 'Innovation Dr, Colombo', color: '#f59e0b' },
               { icon: <Headphones />, title: 'Tech Desk', info: 'ext. 4452', color: '#8b5cf6' }
             ].map((item, i) => (
                <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.03)', background: '#f8fafc' }}>
                  <div style={{ color: item.color, marginBottom: '1rem' }}>{item.icon}</div>
                  <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>{item.info}</p>
                </div>
             ))}
          </div>

          <div className="glass p-8 mt-4" style={{ borderRadius: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontWeight: '800' }}>Working Hours</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Monday – Friday: 9am to 5pm</p>
            </div>
          </div>
        </div>

        {/* Refined Contact Form */}
        <div className="glass p-10 md-p-16" style={{ borderRadius: '3rem', boxShadow: '0 40px 80px rgba(15, 23, 42, 0.08)', background: '#fff', border: '1px solid rgba(15, 23, 42, 0.05)' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2.5rem' }}>Drop us a line</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Jane Doe" 
                required
                style={{ padding: '1.2rem 1.5rem', borderRadius: '14px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)', e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)')}
                onBlur={(e) => (e.target.style.borderColor = '#ebeef2', e.target.style.boxShadow = 'none')}
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@unihub.com" 
                required
                style={{ padding: '1.2rem 1.5rem', borderRadius: '14px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)', e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)')}
                onBlur={(e) => (e.target.style.borderColor = '#ebeef2', e.target.style.boxShadow = 'none')}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?" 
                required
                style={{ padding: '1.2rem 1.5rem', borderRadius: '14px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '1rem', transition: 'all 0.3s' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)', e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)')}
                onBlur={(e) => (e.target.style.borderColor = '#ebeef2', e.target.style.boxShadow = 'none')}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your inquiry in detail..." 
                rows="6"
                required
                style={{ padding: '1.2rem 1.5rem', borderRadius: '14px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '1rem', resize: 'none', transition: 'all 0.3s' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)', e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)')}
                onBlur={(e) => (e.target.style.borderColor = '#ebeef2', e.target.style.boxShadow = 'none')}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4" style={{ borderRadius: '16px', padding: '1.4rem', fontSize: '1rem', fontWeight: '800' }}>
              <Send size={20} className="mr-2" /> Submit Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section style={{ background: '#f8fafc', padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>FAQ's</span>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginTop: '1rem' }}>Questions? Look here.</h3>
          </div>
          
          <div className="flex flex-col gap-4">
             {faqs.map((faq, i) => (
               <div key={i} className="glass" style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', background: '#fff' }}>
                 <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                 >
                   <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a' }}>{faq.q}</span>
                   <ChevronDown size={20} style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                 </button>
                 <div style={{ maxHeight: activeFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                   <p style={{ padding: '0 2rem 2rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                     {faq.a}
                   </p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
