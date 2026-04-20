import React, { useRef, useState } from 'react';
import { 
  ArrowRight, 
  Wrench, 
  ShieldAlert, 
  Cpu, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  MapPin, 
  Layers,
  UploadCloud,
  ChevronDown,
  Send,
  RotateCcw,
  Info,
  CheckCircle2
} from 'lucide-react';

const IncidentsPage = () => {
  const formRef = useRef(null);
  const [priority, setPriority] = useState('MEDIUM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    preferredTime: '',
    issueTitle: '',
    category: 'Select category',
    location: 'Select location',
    description: ''
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      preferredTime: '',
      issueTitle: '',
      category: 'Select category',
      location: 'Select location',
      description: ''
    });
    setPriority('MEDIUM');
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Submitting:', { ...formData, priority });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      handleReset(e);
    }, 5000);
  };

  return (
    <div className="incidents-page" style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .btn-hover:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
          }
          .btn-hover:active {
            transform: translateY(0);
          }
        `}
      </style>      
      {/* Success Notification */}
      {isSubmitted && (
        <div 
          style={{ 
            position: 'fixed', 
            top: '100px', 
            right: '20px', 
            background: '#ffffff', 
            padding: '1.25rem 2rem', 
            borderRadius: '16px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            zIndex: 9999,
            borderLeft: '4px solid #10b981',
            animation: 'slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <CheckCircle2 color="#10b981" size={24} />
          <div>
            <div style={{ fontWeight: '700', color: '#0f172a' }}>Ticket Submitted!</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Our team will review it shortly.</div>
          </div>
        </div>
      )}

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden" style={{ padding: '160px 0 120px 0', background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)' }}>
        {/* Animated Background Glows */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', 
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container relative" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-start gap-8" style={{ maxWidth: '800px' }}>
            {/* Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.5rem 1.25rem', 
                background: 'rgba(59, 130, 246, 0.08)', 
                borderRadius: '99px', 
                border: '1px solid rgba(59, 130, 246, 0.2)',
                color: '#2563eb',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
              className="animate-fade-in"
            >
              <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }} />
              UniHub • Maintenance & Incident Ticketing
            </div>

            {/* Heading */}
            <h1 
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 5rem)', 
                fontWeight: 800, 
                lineHeight: 1.05, 
                letterSpacing: '-0.04em',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}
              className="animate-fade-in"
            >
              Raise a campus <br />
              <span style={{ color: '#0f172a' }}>maintenance ticket</span> <br />
              <span style={{ color: '#2563eb' }}>in minutes</span>
            </h1>

            {/* Description */}
            <p 
              style={{ 
                fontSize: '1.25rem', 
                color: '#475569', 
                lineHeight: 1.6, 
                maxWidth: '650px',
                fontWeight: '450'
              }}
              className="animate-fade-in"
            >
              Report projector faults, network issues, classroom damage, electrical problems, and more. 
              Submit your request with priority, location, contact details, and image evidence.
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ marginTop: '1rem' }}>
              <button 
                onClick={scrollToForm}
                className="btn btn-primary btn-hover" 
                style={{ 
                  background: '#2563eb',
                  padding: '1.25rem 2.5rem', 
                  fontSize: '1.1rem', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                Raise Ticket Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Raise Ticket Form Section */}
      <section ref={formRef} className="section-padding" style={{ background: '#f8fafc', paddingTop: '80px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="glass" style={{ padding: '3.5rem', borderRadius: '40px', background: '#ffffff', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 0, 0, 0.03)' }}>
            
            {/* Form Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '0.4rem 1.25rem', 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  borderRadius: '99px', 
                  color: '#2563eb',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}
              >
                UniHub • Raise Ticket
              </div>
              <h2 style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Raise a Ticket</h2>
              <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Fill in the details below and submit your maintenance or incident request.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Row 1: Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                      required
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email" 
                      required
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Contact vs Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Contact Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                    <input 
                      type="text" 
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter contact number" 
                      style={{ width: '100%', padding: '1rem 1.25rem 1rem 3rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Preferred Contact Time</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      placeholder="Ex: 9.00 AM - 12.00 PM" 
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Issue Title */}
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Issue Title</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    name="issueTitle"
                    value={formData.issueTitle}
                    onChange={handleInputChange}
                    placeholder="Ex: Projector display not visible" 
                    required
                    style={{ width: '100%', padding: '1rem 1.25rem 1rem 3rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                  />
                </div>
              </div>

              {/* Row 4: Cat & Loc */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Category</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', appearance: 'none' }}
                    >
                      <option>Select category</option>
                      <option>Equipment Fault</option>
                      <option>Facility Damage</option>
                      <option>Network Issue</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', appearance: 'none' }}
                    >
                      <option>Select location</option>
                      <option>Main Hall</option>
                      <option>Lab A</option>
                      <option>Library</option>
                      <option>Cafeteria</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Priority Selector */}
              <div className="flex flex-col gap-3">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Priority</label>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setPriority('LOW')}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.75rem', 
                      borderRadius: '12px', 
                      border: priority === 'LOW' ? '1px solid #93c5fd' : '1px solid rgba(0,0,0,0.05)', 
                      background: priority === 'LOW' ? '#dbeafe' : '#f8fafc', 
                      color: priority === 'LOW' ? '#1e40af' : '#64748b', 
                      fontWeight: '700', 
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    LOW
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPriority('MEDIUM')}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.75rem', 
                      borderRadius: '12px', 
                      border: priority === 'MEDIUM' ? '1px solid #fde68a' : '1px solid rgba(0,0,0,0.05)', 
                      background: priority === 'MEDIUM' ? '#fef3c7' : '#f8fafc', 
                      color: priority === 'MEDIUM' ? '#92400e' : '#64748b', 
                      fontWeight: '700', 
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    MEDIUM
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPriority('HIGH')}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.75rem', 
                      borderRadius: '12px', 
                      border: priority === 'HIGH' ? '1px solid #fca5a5' : '1px solid rgba(0,0,0,0.05)', 
                      background: priority === 'HIGH' ? '#fee2e2' : '#f8fafc', 
                      color: priority === 'HIGH' ? '#b91c1c' : '#64748b', 
                      fontWeight: '700', 
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    HIGH
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Clearly describe the issue, when it happened, and any visible damage or symptoms." 
                  style={{ width: '100%', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', minHeight: '150px', resize: 'vertical' }}
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-3">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Upload Images (Max 3)</label>
                <div 
                  style={{ 
                    border: '2px dashed rgba(59, 130, 246, 0.2)', 
                    borderRadius: '20px', 
                    padding: '3rem', 
                    textAlign: 'center',
                    background: 'rgba(59, 130, 246, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <UploadCloud size={40} style={{ color: '#2563eb' }} />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Click to upload images</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>PNG, JPG or JPEG files • up to 3 files</div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions and Info Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', gap: '3rem' }}>
                
                {/* Info Note Box (Left) */}
                <div 
                  style={{ 
                    flex: 1,
                    padding: '1.25rem 1.75rem',
                    background: 'rgba(37, 99, 235, 0.04)',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.1)',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Info size={24} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: '1rem', fontWeight: '800', color: '#2563eb' }}>Please Note</span>
                      <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.4 }}>
                          After submission, your ticket will be reviewed by our team. You will receive updates via email or notifications.
                      </p>
                  </div>
                </div>

                {/* Form Buttons (Right) */}
                <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="btn btn-hover" 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 1.75rem', 
                      borderRadius: '12px', 
                      background: '#ffffff', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      color: '#0f172a',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-hover" 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 2rem', 
                      borderRadius: '12px', 
                      background: '#2563eb',
                      border: 'none',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1rem',
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Send size={18} />
                    Submit Ticket
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IncidentsPage;
