import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock3, 
  XCircle,
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

const MyBookings = () => {
  const [sid, setSid] = useState('');
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = async (e) => {
    if (e) e.preventDefault();
    if (!sid.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Team's backend port is 8081
      const response = await fetch(`http://localhost:8081/api/bookings/user/${sid}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        setHasSearched(true);
      } else {
        throw new Error('Could not find bookings for this ID');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return '#22c55e';
      case 'REJECTED': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle2 size={16} />;
      case 'REJECTED': return <XCircle size={16} />;
      default: return <Clock3 size={16} />;
    }
  };

  return (
    <div className="section-padding" style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="text-center mb-12">
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Manage Reservations</span>
          <h1 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>My Bookings</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
            Enter your Student or Staff ID to view and manage your resource reservation requests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass mb-12 p-2" style={{ borderRadius: '1.5rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          <form onSubmit={fetchBookings} className="flex items-center gap-2">
            <div className="flex-grow flex items-center px-4 gap-3">
              <Search size={20} className="text-muted" />
              <input 
                type="text" 
                placeholder="Enter Student/Staff ID (e.g. IT2100...)" 
                value={sid}
                onChange={(e) => setSid(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem 0', 
                  background: 'none', 
                  border: 'none', 
                  outline: 'none', 
                  fontSize: '1rem',
                  fontWeight: '500'
                }} 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ borderRadius: '1.2rem', padding: '0.75rem 2rem' }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
            </button>
          </form>
        </div>

        {/* Results Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p style={{ color: 'var(--text-muted)' }}>Searching for your bookings...</p>
          </div>
        ) : error ? (
          <div className="glass p-12 text-center" style={{ borderRadius: '2rem' }}>
            <AlertCircle size={48} className="text-error mb-4" style={{ color: '#ef4444', margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Oops! Something went wrong</h3>
            <p style={{ color: 'var(--text-muted)' }}>{error}. Please check the ID and try again.</p>
          </div>
        ) : hasSearched && bookings.length === 0 ? (
          <div className="glass p-12 text-center" style={{ borderRadius: '2rem' }}>
            <div className="mb-6 flex justify-center">
              <div className="flex items-center justify-center" style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.05)', color: 'var(--primary)', borderRadius: '50%' }}>
                <Calendar size={40} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No bookings found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't made any resource reservations yet.</p>
            <a href="/book" className="btn btn-primary">Make a Booking</a>
          </div>
        ) : hasSearched ? (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end mb-2">
              <h3 style={{ fontSize: '1.25rem' }}>Found {bookings.length} reservations for <span className="text-primary">{sid}</span></h3>
            </div>
            <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-1 gap-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="glass feature-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div className="flex-shrink-0" style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                    <Building2 size={32} style={{ margin: 'auto' }} />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{booking.resourceName}</h4>
                      <span className="px-3 py-1" style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '700', 
                        borderRadius: '99px', 
                        background: `${getStatusColor(booking.status)}15`, 
                        color: getStatusColor(booking.status),
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{booking.resourceType}</p>
                    
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-primary" />
                        <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-primary" />
                        <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{booking.startTime} - {booking.endTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[150px]">
                     <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem' }}>View Details</button>
                     {booking.status === 'PENDING' && (
                       <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>Cancel Request</button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Illustration or Placeholder before search */
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
             <MapPin size={80} className="mb-4" />
             <p>Your booking details will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
