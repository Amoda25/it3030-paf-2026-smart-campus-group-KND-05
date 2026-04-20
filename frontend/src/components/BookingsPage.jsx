import React, { useState, useEffect } from 'react';
import { 
  CalendarRange, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity, 
  History, 
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  MoreVertical,
  Calendar as CalendarIcon,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'active', 'new', 'history'
  const [bookings, setBookings] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Booking Form State
  const [formData, setFormData] = useState({
    facilityId: '',
    facilityName: '',
    userId: 'USER_123', // Dummy user for now
    userName: 'John Doe',
    date: '',
    timeSlot: '08:00-10:00',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchBookings();
    fetchFacilities();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Find facility name
    const selectedFacility = facilities.find(f => f.id === formData.facilityId);
    const bookingData = { 
        ...formData, 
        facilityName: selectedFacility ? selectedFacility.name : 'Unknown' 
    };

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (response.ok) {
        setSuccessMsg('Booking request submitted successfully!');
        setFormData({ ...formData, facilityId: '', date: '', notes: '' });
        fetchBookings();
        setTimeout(() => {
          setSuccessMsg('');
          setActiveView('active');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${id}/status?status=${status}`, {
        method: 'PATCH'
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Workflow Overview', icon: <Activity size={20} /> },
    { id: 'active', label: 'Active Bookings', icon: <CalendarRange size={20} /> },
    { id: 'new', label: 'New Reservation', icon: <Plus size={20} /> },
    { id: 'history', label: 'Booking History', icon: <History size={20} /> },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return '#10b981';
      case 'PENDING': return '#f59e0b';
      case 'REJECTED': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'APPROVED': return 'rgba(16, 185, 129, 0.1)';
      case 'PENDING': return 'rgba(245, 158, 11, 0.1)';
      case 'REJECTED': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(0,0,0,0.05)';
    }
  };

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
            color: '#8b5cf6', // Violet Primary
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
            Booking Console
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
                {activeView === item.id && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></div>}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#fff' }}>
             <ShieldCheck size={24} style={{ marginBottom: '1rem' }} />
             <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Security Protocol</div>
             <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Identity Verified & Active</div>
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
              {activeView === 'overview' && 'Workflow Control'}
              {activeView === 'active' && 'Current Reservations'}
              {activeView === 'new' && 'Reserve Space'}
              {activeView === 'history' && 'Past Lifecycle'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {activeView === 'overview' && 'Orchestrate your campus schedule and resource allocations.'}
              {activeView === 'active' && 'Monitor pending requests and upcoming confirmed slot bookings.'}
              {activeView === 'new' && 'Secure a specialized campus node for your next operation.'}
              {activeView === 'history' && 'Audit of past resource utilization and booking outcomes.'}
            </p>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '12px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <Clock size={16} style={{ color: '#8b5cf6' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{new Date().toLocaleDateString()}</span>
             </div>
          </div>
        </header>

        {/* Content Views */}
        <div className="animate-fade-in">
          {activeView === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Total Lifecycle', value: bookings.length, icon: <Activity style={{ color: '#8b5cf6' }} />, trend: '+4 this week' },
                  { label: 'Pending Flow', value: bookings.filter(b => b.status === 'PENDING').length, icon: <Zap style={{ color: '#f59e0b' }} />, trend: 'Manual review' },
                  { label: 'Active Slots', value: bookings.filter(b => b.status === 'APPROVED').length, icon: <CheckCircle2 style={{ color: '#10b981' }} />, trend: 'Scheduled' },
                  { label: 'Efficiency', value: '92%', icon: <ArrowUpRight style={{ color: '#3b82f6' }} />, trend: 'Asset utilization' },
                ].map((stat, i) => (
                  <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {stat.icon}
                       </div>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>{stat.label}</div>
                    <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#8b5cf6', fontWeight: '700' }}>{stat.trend}</div>
                  </div>
                ))}
              </div>

              {/* Layout Content Bottom */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff' }}>
                  <div className="flex justify-between items-center mb-8">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Upcoming Schedule</h3>
                    <button onClick={() => setActiveView('active')} className="text-primary" style={{ background: 'none', border: 'none', fontWeight: '700', color: '#8b5cf6', cursor: 'pointer' }}>View All</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {bookings.filter(b => b.status === 'APPROVED').slice(0, 3).map(b => (
                      <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', background: '#f8fafc' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CalendarIcon size={18} style={{ color: '#8b5cf6' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{b.facilityName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.date} • {b.timeSlot}</div>
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#8b5cf6' }}>CONFIRMED</div>
                      </div>
                    ))}
                    {bookings.filter(b => b.status === 'APPROVED').length === 0 && <p className="text-muted text-center py-4">No upcoming events scheduled.</p>}
                  </div>
                </div>

                <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#fff' }}>
                  <Settings size={32} style={{ marginBottom: '1.5rem', color: '#8b5cf6' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem' }}>Workflow Rules</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
                    Set automatic approval constraints based on user roles and peak utilization hours.
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%', borderRadius: '12px', background: '#8b5cf6', border: 'none' }}>Configure Engine</button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'active' && (
            <div className="glass" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Pending Flow Queue</h3>
              </div>
              <div style={{ padding: '2rem' }}>
                {loading ? (
                   <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading queue...</div>
                ) : bookings.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Asset</th>
                        <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Requester</th>
                        <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timing</th>
                        <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Lifecycle Control</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                           <td style={{ padding: '1.25rem 0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>{b.facilityName}</td>
                           <td style={{ padding: '1.25rem 0.5rem', fontSize: '0.85rem' }}>{b.userName}</td>
                           <td style={{ padding: '1.25rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                             {b.date}<br/>{b.timeSlot}
                           </td>
                           <td style={{ padding: '1.25rem 0.5rem' }}>
                             <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '800', background: getStatusBg(b.status), color: getStatusColor(b.status) }}>
                               {b.status}
                             </span>
                           </td>
                           <td style={{ padding: '1.25rem 0.5rem' }}>
                             <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {b.status === 'PENDING' && (
                                  <>
                                    <button 
                                      onClick={() => handleUpdateStatus(b.id, 'APPROVED')}
                                      style={{ padding: '6px', borderRadius: '8px', background: '#dcfce7', color: '#10b981', border: 'none', cursor: 'pointer' }}>
                                      <CheckCircle2 size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateStatus(b.id, 'REJECTED')}
                                      style={{ padding: '6px', borderRadius: '8px', background: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer' }}>
                                      <XCircle size={16} />
                                    </button>
                                  </>
                                )}
                             </div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>No records found in the current flow cycle.</div>
                )}
              </div>
            </div>
          )}

          {activeView === 'new' && (
            <div style={{ maxWidth: '800px' }}>
              <form onSubmit={handleCreateBooking} className="glass p-10" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-3 mb-8" style={{ color: '#8b5cf6' }}>
                    <PlusCircle size={24} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Request Resource Slot</h2>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>SELECT CAMPUS FACILITY</label>
                    <select 
                        required
                        style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                        value={formData.facilityId}
                        onChange={(e) => setFormData({...formData, facilityId: e.target.value})}
                    >
                        <option value="">Choose a resource...</option>
                        {facilities.map(f => <option key={f.id} value={f.id}>{f.name} ({f.type})</option>)}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>DESIRED DATE</label>
                        <input 
                            required
                            type="date" 
                            style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>TIME SLOT</label>
                        <select 
                            style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                            value={formData.timeSlot}
                            onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                        >
                            <option>08:00-10:00</option>
                            <option>10:00-12:00</option>
                            <option>13:00-15:00</option>
                            <option>15:00-17:00</option>
                            <option>18:00-20:00</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>MISSION NOTES (OPTIONAL)</label>
                    <textarea 
                        style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', minHeight: '100px', resize: 'none' }}
                        value={formData.notes}
                        placeholder="Briefly describe the purpose of this reservation..."
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', background: '#8b5cf6', border: 'none', fontWeight: '800' }}>
                    {submitting ? 'Transmitting flow...' : 'Transmit Request'}
                </button>

                {successMsg && (
                    <div className="animate-fade-in mt-6" style={{ padding: '1rem', background: '#dcfce7', color: '#10b981', borderRadius: '14px', textAlign: 'center', fontWeight: '700' }}>
                        {successMsg}
                    </div>
                )}
              </form>
            </div>
          )}

          {activeView === 'history' && (
            <div style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '2rem' }}>
              <History size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.3, marginInline: 'auto' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Lifecycle Archive</h3>
              <p className="text-muted">Past operational data will appear here once the system cycle completes.</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
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

