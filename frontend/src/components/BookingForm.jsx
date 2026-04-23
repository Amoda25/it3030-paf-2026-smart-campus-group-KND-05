import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Users,
  Laptop,
  ArrowLeft,
  Mic2,
  Tv,
  Wind,
  AlignLeft,
  FileText,
  Info
} from 'lucide-react';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preSelected = location.state || {};

  // Mock authenticated user data
  const currentUser = {
    name: 'Amila Perera',
    sid: 'IT21004567',
    faculty: 'Computing & Information Technology'
  };

  const [formData, setFormData] = useState({
    userName: currentUser.name,
    userId: currentUser.sid,
    userFaculty: currentUser.faculty,
    facilityName: preSelected.resourceName || '',
    facilityId: preSelected.resourceId || 'FAC-DEFAULT',
    bookingDate: '',
    startTime: '',
    endTime: '',
    purpose: '',
    participantsCount: 1,
    projectorNeeded: false,
    microphoneNeeded: false,
    acNeeded: false,
    seatingArrangement: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const purposes = ['Lecture', 'Meeting', 'Workshop', 'Event', 'Other'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.bookingDate || !formData.startTime || !formData.endTime || !formData.purpose) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Combine date and time for backend LocalDateTime
      const payload = {
        ...formData,
        startTime: `${formData.bookingDate}T${formData.startTime}:00`,
        endTime: `${formData.bookingDate}T${formData.endTime}:00`,
        participantsCount: parseInt(formData.participantsCount, 10)
      };

      const response = await fetch('http://localhost:8081/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/profile'); // Redirect to profile to see the new booking
        }, 3000);
      } else {
        throw new Error('Failed to submit booking. Ensure backend is running.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndices: 9999,
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div className="glass" style={{
        background: '#fff',
        padding: '3.5rem',
        borderRadius: '2.5rem',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <div style={{
          width: '90px',
          height: '90px',
          background: '#dcfce7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: '#10b981'
        }}>
          <CheckCircle2 size={48} className="animate-bounce" />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Request Sent!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Your booking request for <strong>{formData.facilityName}</strong> has been successfully transmitted to the facility management node.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/profile')}
            className="btn btn-primary" 
            style={{ width: '100%', borderRadius: '15px', padding: '1rem', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}
          >
            Go to My Bookings
          </button>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>
            Auto-redirecting in a few seconds...
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="section-padding" style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted hover-text-primary transition-all" style={{ background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
            <ArrowLeft size={20} /> Back to Facilities
          </button>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: 'var(--secondary)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem' }}>Resource Hub</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginTop: '0.25rem' }}>Request Booking</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Section 1: User Info (Auto-filled) */}
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(7, 19, 63, 0.05)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>1. Student Identity</h3>
              <span style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '99px', background: '#f1f5f9', color: '#64748b', fontSize: '0.7rem', fontWeight: '800' }}>AUTO-VERIFIED</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>UNIVERSITY ID</label>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '600', color: '#475569' }}>{formData.userId}</div>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>FULL NAME</label>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '600', color: '#475569' }}>{formData.userName}</div>
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>FACULTY</label>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '600', color: '#475569' }}>{formData.userFaculty}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Facility & Schedule */}
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(242, 106, 0, 0.05)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>2. Booking Schedule</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>TARGET FACILITY</label>
                  <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Building2 size={18} /> {formData.facilityName}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>BOOKING DATE *</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleInputChange} style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>START TIME *</label>
                  <div style={{ position: 'relative' }}>
                    <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>END TIME *</label>
                  <div style={{ position: 'relative' }}>
                    <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>QUICK SELECT SLOTS</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[
                      { label: 'Morning', start: '08:00', end: '12:00' },
                      { label: 'Afternoon', start: '12:00', end: '17:00' },
                      { label: 'Evening', start: '17:00', end: '21:00' }
                    ].map(slot => (
                      <button 
                        key={slot.label} 
                        type="button" 
                        onClick={() => setFormData(prev => ({...prev, startTime: slot.start, endTime: slot.end}))}
                        style={{ 
                          flex: 1, 
                          padding: '0.6rem', 
                          borderRadius: '8px', 
                          border: '1px solid #e2e8f0', 
                          background: formData.startTime === slot.start && formData.endTime === slot.end ? 'rgba(242, 106, 0, 0.1)' : '#fff',
                          color: formData.startTime === slot.start && formData.endTime === slot.end ? 'var(--secondary)' : '#64748b',
                          fontSize: '0.75rem', 
                          fontWeight: '700',
                          cursor: 'pointer' 
                        }}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Purpose & Scale */}
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.05)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>3. Purpose & Scale</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>BOOKING PURPOSE *</label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {purposes.map(p => (
                      <button 
                        key={p} 
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, purpose: p}))}
                        style={{ 
                          padding: '0.6rem 1.25rem', 
                          borderRadius: '10px', 
                          border: '2px solid',
                          borderColor: formData.purpose === p ? 'var(--primary)' : '#e2e8f0',
                          background: formData.purpose === p ? 'rgba(7, 19, 63, 0.03)' : '#fff',
                          color: formData.purpose === p ? 'var(--primary)' : 'var(--text-muted)',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>ADDITIONAL DETAILS</label>
                  <textarea 
                    name="purposeDetails" 
                    placeholder="Briefly describe your event or requirement..." 
                    style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', minHeight: '100px', resize: 'none' }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>EXPECTED PARTICIPANTS</label>
                <div style={{ position: 'relative' }}>
                  <Users size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="number" name="participantsCount" value={formData.participantsCount} onChange={handleInputChange} min="1" style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Important for safety & resource allocation.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Requirements & Notes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.05)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Laptop size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>4. Special Requirements</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { name: 'projectorNeeded', label: 'Projector', icon: <Tv size={16} /> },
                  { name: 'microphoneNeeded', label: 'Microphone', icon: <Mic2 size={16} /> },
                  { name: 'acNeeded', label: 'A/C Required', icon: <Wind size={16} /> }
                ].map(req => (
                  <label key={req.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '12px', background: formData[req.name] ? 'rgba(16, 185, 129, 0.05)' : '#f8fafc', border: '1px solid', borderColor: formData[req.name] ? '#10b981' : '#e2e8f0', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    <input type="checkbox" name={req.name} checked={formData[req.name]} onChange={handleInputChange} style={{ display: 'none' }} />
                    <div style={{ color: formData[req.name] ? '#10b981' : '#64748b' }}>{req.icon}</div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: formData[req.name] ? '#065f46' : '#475569' }}>{req.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>SEATING ARRANGEMENT</label>
                <div style={{ position: 'relative' }}>
                  <AlignLeft size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" name="seatingArrangement" value={formData.seatingArrangement} onChange={handleInputChange} placeholder="e.g. Cluster, Classroom, Theatre" style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(100, 116, 139, 0.05)', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>5. Extra Notes</h3>
              </div>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleInputChange} 
                placeholder="Any other instructions for the facility management..." 
                style={{ width: '100%', padding: '1.25rem', borderRadius: '15px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', minHeight: '180px', resize: 'none' }}
              />
            </div>
          </div>

          {/* Submission Area */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#0f172a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={24} style={{ color: 'var(--secondary)' }} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>Final Review</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Please ensure all schedule details are accurate.</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {error && <span style={{ color: '#ef4444', fontWeight: '700', fontSize: '0.9rem' }}>{error}</span>}
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="btn btn-primary" 
                style={{ padding: '1.25rem 3rem', borderRadius: '15px', fontSize: '1.1rem', fontWeight: '800', boxShadow: '0 10px 25px rgba(242, 106, 0, 0.4)' }}
              >
                {isSubmitting ? 'Processing...' : 'Request Booking'}
              </button>
            </div>
          </div>

        </form>
      </div>

      {isSuccess && <SuccessModal />}

      <style>{`
        .hover-text-primary:hover { color: var(--primary) !important; }
      `}</style>
    </div>
  );
};

export default BookingForm;
