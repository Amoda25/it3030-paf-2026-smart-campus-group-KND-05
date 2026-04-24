import React, { useState, useEffect } from 'react';
import { 
  CalendarRange, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Clock3, 
  PlusCircle, 
  Activity, 
  LayoutGrid, 
  ClipboardList, 
  Info, 
  ArrowUpRight, 
  TrendingUp,
  Search,
  MapPin,
  Users,
  ChevronRight,
  ShieldCheck,
  Zap,
  CalendarDays,
  FileText,
  Inbox,
  Building2,
  User
} from 'lucide-react';

const BookingsPage = () => {
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'my-bookings', 'new-booking'
  const [bookings, setBookings] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Booking Form State
  const [formData, setFormData] = useState({
    facilityId: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBookings();
    fetchFacilities();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/bookings');
      const data = await response.json();
      setBookings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8081/api/bookings/${id}/status?status=${status}`, {
        method: 'PUT'
      });
      if (response.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.facilityId) newErrors.facilityId = 'Please select a facility.';
    if (!formData.startTime) newErrors.startTime = 'Start time is required.';
    if (!formData.endTime) newErrors.endTime = 'End time is required.';
    if (!formData.purpose || formData.purpose.length < 5) newErrors.purpose = 'Purpose must be at least 5 characters.';
    
    if (formData.startTime && formData.endTime) {
        if (new Date(formData.startTime) >= new Date(formData.endTime)) {
            newErrors.endTime = 'End time must be after start time.';
        }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const selectedFacility = facilities.find(f => f.id === formData.facilityId);
      const bookingData = {
        ...formData,
        facilityName: selectedFacility?.name || 'Unknown Facility',
        userId: 'USER123', // Static for now
        userName: 'John Doe',
        status: 'PENDING'
      };

      const response = await fetch('http://localhost:8081/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        setSuccessMsg('Booking request submitted successfully!');
        setFormData({ facilityId: '', startTime: '', endTime: '', purpose: '' });
        fetchBookings();
        setTimeout(() => {
          setSuccessMsg('');
          setActiveView('my-bookings');
        }, 2000);
      } else {
        const errorData = await response.text();
        setErrors({ general: errorData || 'Conflict detected or server error.' });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors({ general: 'Connection error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <Activity size={20} /> },
    { id: 'my-bookings', label: 'My Bookings', icon: <CalendarDays size={20} /> },
    { id: 'new-booking', label: 'Request Facility', icon: <PlusCircle size={20} /> },
    { id: 'booking-requests', label: 'Booking Requests', icon: <Inbox size={20} /> },
    { id: 'history', label: 'Workflow History', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="bookings-dashboard" style={{ 
      background: '#f8fafc', 
      minHeight: '100vh', 
      paddingTop: '80px',
      display: 'flex'
    }}>
      {/* Sidebar Navigation */}
      <aside style={{ 
        width: '280px', 
        height: 'calc(100vh - 80px)', 
        position: 'fixed', 
        left: 0, 
        top: '80px', 
        background: '#fff', 
        borderRight: '1px solid rgba(0,0,0,0.05)',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: '900', 
            color: '#8b5cf6', 
            textTransform: 'uppercase', 
            letterSpacing: '0.12em', 
            marginBottom: '1.5rem', 
            paddingLeft: '0.75rem',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '4px', height: '14px', background: '#8b5cf6', borderRadius: '2px' }}></div>
            Reservation Engine
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeView === item.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  color: activeView === item.id ? '#8b5cf6' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: activeView === item.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon}
                {item.label}
                {item.id === 'booking-requests' && bookings.filter(b => b.status === 'PENDING').length > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#f59e0b', color: '#fff', borderRadius: '99px', fontSize: '0.65rem', fontWeight: '900', padding: '2px 8px' }}>
                    {bookings.filter(b => b.status === 'PENDING').length}
                  </span>
                )}
                {activeView === item.id && item.id !== 'booking-requests' && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></div>}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#fff' }}>
             <Zap size={24} style={{ marginBottom: '1rem' }} />
             <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Instant Approval</div>
             <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Available for Faculty Staff members.</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        marginLeft: '280px', 
        padding: '2.5rem 3rem',
        minWidth: 0 
      }}>
        
        {/* Dynamic Header */}
        <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {activeView === 'overview' && 'Workflow Overview'}
              {activeView === 'my-bookings' && 'My Active Reservations'}
              {activeView === 'new-booking' && 'Facility Request'}
              {activeView === 'booking-requests' && 'Booking Requests'}
              {activeView === 'history' && 'Operational History'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {activeView === 'overview' && 'Monitor your campus presence and reservation throughput.'}
              {activeView === 'my-bookings' && 'Track and manage your upcoming facility sessions.'}
              {activeView === 'new-booking' && 'Queue a new resource allocation into the system chain.'}
              {activeView === 'booking-requests' && 'Review and action incoming student reservation requests.'}
              {activeView === 'history' && 'Review past allocations and resource utilization cycles.'}
            </p>
          </div>
        </header>

        {/* Content Views */}
        <div className="animate-fade-in">
          {activeView === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Total Requests', value: bookings.length, icon: <FileText style={{ color: '#8b5cf6' }} />, trend: 'System total', gradient: 'linear-gradient(135deg, #fff 0%, #f5f3ff 100%)' },
                  { label: 'Approved Slots', value: bookings.filter(b => b.status === 'APPROVED').length, icon: <CheckCircle2 style={{ color: '#10b981' }} />, trend: 'Ready to use', gradient: 'linear-gradient(135deg, #fff 0%, #ecfdf5 100%)' },
                  { label: 'Pending Review', value: bookings.filter(b => b.status === 'PENDING').length, icon: <Clock3 style={{ color: '#f59e0b' }} />, trend: 'In Queue', gradient: 'linear-gradient(135deg, #fff 0%, #fffbeb 100%)' },
                  { label: 'Wait Time', value: '1.2h', icon: <TrendingUp style={{ color: '#3b82f6' }} />, trend: 'Faster than avg', gradient: 'linear-gradient(135deg, #fff 0%, #eff6ff 100%)' },
                ].map((stat, i) => (
                  <div key={i} className="glass card-hover" style={{ 
                    padding: '2rem', 
                    borderRadius: '2rem', 
                    background: stat.gradient, 
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                         {stat.icon}
                       </div>
                       <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>
                         {stat.trend}
                       </div>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.25rem', color: '#0f172a', letterSpacing: '-1px' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Upcoming Sessions</h3>
                      <button onClick={() => setActiveView('my-bookings')} className="text-primary" style={{ background: 'none', border: 'none', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', color: '#8b5cf6' }}>View Timeline</button>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {bookings.slice(0, 3).map(booking => (
                        <div key={booking.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', borderRadius: '16px', background: '#f8fafc' }}>
                           <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                              <CalendarRange size={20} style={{ color: '#8b5cf6' }} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '800', fontSize: '1rem' }}>{booking.facilityName}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(booking.startTime).toLocaleString()}</div>
                           </div>
                           <span style={{ 
                             padding: '6px 12px', 
                             borderRadius: '8px', 
                             fontSize: '0.7rem', 
                             fontWeight: '800', 
                             background: booking.status === 'PENDING' ? '#fffbeb' : booking.status === 'APPROVED' ? '#ecfdf5' : '#fef2f2', 
                             color: booking.status === 'PENDING' ? '#b45309' : booking.status === 'APPROVED' ? '#047857' : '#b91c1c' 
                           }}>{booking.status}</span>
                        </div>
                      ))}
                      {bookings.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No localized activities detected.</div>
                      )}
                   </div>
                </div>

                <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)', color: '#fff' }}>
                   <Zap size={32} style={{ marginBottom: '1.5rem', color: '#a78bfa' }} />
                   <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Priority Lane</h3>
                   <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                     Your department has 4 priority tokens remaining for instant lab allocations.
                   </p>
                   <button onClick={() => setActiveView('new-booking')} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#fff', color: '#4c1d95', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Use Token</button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'my-bookings' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
               {bookings.map(booking => (
                 <div key={booking.id} className="glass card-hover" style={{ borderRadius: '1.5rem', overflow: 'hidden', background: '#fff', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: '800' }}>
                          RES-ID: {booking.id.slice(-6).toUpperCase()}
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: booking.status === 'PENDING' ? '#f59e0b' : booking.status === 'APPROVED' ? '#10b981' : '#ef4444' }}></div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>{booking.status}</span>
                       </div>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>{booking.facilityName}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{booking.purpose}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <Clock size={16} style={{ color: '#8b5cf6' }} />
                          <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                             {new Date(booking.startTime).toLocaleDateString()} @ {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <Users size={16} style={{ color: '#8b5cf6' }} />
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reserved by {booking.userName}</div>
                       </div>
                    </div>
                 </div>
               ))}
               {bookings.length === 0 && (
                 <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                    <Info size={48} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>No active reservations</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Your timeline is currently clear.</p>
                 </div>
               )}
            </div>
          )}

          {activeView === 'new-booking' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem' }}>
               <div className="glass" style={{ borderRadius: '2rem', background: '#fff', padding: '2.5rem' }}>
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>New Allocation Request</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Synchronize your resource requirements with campus availability.</p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     {errors.general && (
                        <div style={{ padding: '1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #fee2e2' }}>
                           {errors.general}
                        </div>
                     )}

                     <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>TARGET FACILITY</label>
                        <select 
                           style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.facilityId ? '2px solid #ef4444' : '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
                           value={formData.facilityId}
                           onChange={(e) => setFormData({...formData, facilityId: e.target.value})}
                        >
                           <option value="">Select a resource...</option>
                           {facilities.map(f => (
                             <option key={f.id} value={f.id}>{f.name} ({f.type})</option>
                           ))}
                        </select>
                        {errors.facilityId && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.facilityId}</span>}
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>START SHIFT</label>
                           <input 
                              type="datetime-local" 
                              style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.startTime ? '2px solid #ef4444' : '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }}
                              value={formData.startTime}
                              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                           />
                           {errors.startTime && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.startTime}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>END SHIFT</label>
                           <input 
                              type="datetime-local" 
                              style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.endTime ? '2px solid #ef4444' : '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }}
                              value={formData.endTime}
                              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                           />
                           {errors.endTime && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.endTime}</span>}
                        </div>
                     </div>

                     <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>OPERATION PURPOSE</label>
                        <textarea 
                           placeholder="Detail the research activity or meeting goal..."
                           style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.purpose ? '2px solid #ef4444' : '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', minHeight: '120px', resize: 'none' }}
                           value={formData.purpose}
                           onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                        />
                        {errors.purpose && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.purpose}</span>}
                     </div>

                     <button 
                        type="submit" 
                        disabled={submitting}
                        style={{ 
                          width: '100%', 
                          padding: '1.25rem', 
                          borderRadius: '16px', 
                          background: '#8b5cf6', 
                          color: '#fff', 
                          border: 'none', 
                          fontWeight: '800', 
                          fontSize: '1rem',
                          marginTop: '1rem',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          boxShadow: '0 10px 20px rgba(139, 92, 246, 0.2)'
                        }}
                     >
                        {submitting ? (
                           <>
                             <div className="animate-spin" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></div>
                             Processing Chain...
                           </>
                        ) : (
                           <>
                             <CalendarDays size={20} /> Submit Reservation
                           </>
                        )}
                     </button>

                     {successMsg && (
                        <div className="animate-fade-in mt-6" style={{ padding: '1rem', background: '#ecfdf5', color: '#059669', borderRadius: '12px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem', border: '1px solid #10b981' }}>
                           {successMsg}
                        </div>
                     )}
                  </form>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: '#fff' }}>
                     <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>VALIDATION PROTOCOL</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                           { label: 'Time Slot Availability', desc: 'System checks for temporal overlaps in the resource registry.' },
                           { label: 'Role Clearance', desc: 'Validates user permissions for the specific facility tier.' },
                           { label: 'Resource Quota', desc: 'Ensures department usage remains within allocated thresholds.' }
                        ].map((rule, i) => (
                           <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(167, 139, 250, 0.2)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', fontWeight: '900' }}>
                                 {i + 1}
                              </div>
                              <div>
                                 <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{rule.label}</div>
                                 <div style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.5 }}>{rule.desc}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Info size={20} className="text-primary" style={{ color: '#8b5cf6' }} />
                        <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Need Assistance?</span>
                     </div>
                     <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        Specialized sessions requiring technical setup must be requested at least 48 hours in advance.
                     </p>
                  </div>
               </div>
            </div>
          )}

          {activeView === 'booking-requests' && (
            <div className="glass" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ padding: '2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, #fff, #faf5ff)' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>Student Booking Requests</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Review and action incoming student facility reservation requests.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.1)', color: '#b45309', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></div>
                    {bookings.filter(b => b.status === 'PENDING').length} PENDING
                  </div>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#047857', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                    {bookings.filter(b => b.status === 'APPROVED').length} APPROVED
                  </div>
                  <button onClick={fetchBookings} style={{ padding: '8px 16px', borderRadius: '10px', background: '#f5f3ff', border: '1px solid #e9d5ff', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', color: '#7c3aed' }}>↻ Refresh</button>
                </div>
              </div>

              <div style={{ padding: '1.5rem 2.5rem 2.5rem' }}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '60px' }}>
                    <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #8b5cf6', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                    <p style={{ color: 'var(--text-muted)' }}>Loading requests...</p>
                  </div>
                ) : bookings.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left' }}>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Student</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Facility & Time</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Purpose</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Requirements</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Status</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} style={{ background: '#faf5ff' }}>
                          <td style={{ padding: '1.25rem 1rem', borderRadius: '12px 0 0 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                <User size={18} />
                              </div>
                              <div>
                                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' }}>{booking.userName || '—'}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>ID: {booking.userId || '—'}</div>
                                {booking.userFaculty && <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{booking.userFaculty}</div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                              <Building2 size={14} style={{ color: '#8b5cf6' }} />
                              {booking.facilityName || '—'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {booking.startTime ? new Date(booking.startTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Date N/A'}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                              {booking.startTime ? new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              {booking.endTime ? ` – ${new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                            </div>
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={{ padding: '5px 12px', borderRadius: '8px', background: '#f5f3ff', color: '#6d28d9', fontSize: '0.75rem', fontWeight: '800' }}>
                              {booking.purpose || '—'}
                            </span>
                            {booking.participantsCount > 0 && (
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Users size={12} /> {booking.participantsCount} participants
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {booking.projectorNeeded && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#f0fdf4', color: '#15803d', fontSize: '0.65rem', fontWeight: '800' }}>📽 Projector</span>}
                              {booking.microphoneNeeded && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#fdf4ff', color: '#7e22ce', fontSize: '0.65rem', fontWeight: '800' }}>🎤 Mic</span>}
                              {booking.acNeeded && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#eff6ff', color: '#1d4ed8', fontSize: '0.65rem', fontWeight: '800' }}>❄ AC</span>}
                              {!booking.projectorNeeded && !booking.microphoneNeeded && !booking.acNeeded && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>None</span>}
                            </div>
                          </td>
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={{
                              padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800',
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              background: booking.status === 'PENDING' ? '#fffbeb' : booking.status === 'APPROVED' ? '#ecfdf5' : '#fef2f2',
                              color: booking.status === 'PENDING' ? '#b45309' : booking.status === 'APPROVED' ? '#047857' : '#991b1b'
                            }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                              {booking.status}
                            </span>
                          </td>
                          <td style={{ padding: '1.25rem 1rem', borderRadius: '0 12px 12px 0' }}>
                            {booking.status === 'PENDING' ? (
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'APPROVED')}
                                  style={{ padding: '8px 14px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', border: '1px solid #bbf7d0', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                                >
                                  <CheckCircle2 size={15} /> Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'REJECTED')}
                                  style={{ padding: '8px 14px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                                >
                                  <XCircle size={15} /> Reject
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: 'center', padding: '80px' }}>
                    <Inbox size={56} style={{ color: '#ddd6fe', margin: '0 auto 1rem', display: 'block' }} />
                    <h4 style={{ color: '#64748b', fontWeight: '700', fontSize: '1.2rem' }}>No Booking Requests Yet</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>When students submit booking requests, they will appear here for your review.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
};

export default BookingsPage;
