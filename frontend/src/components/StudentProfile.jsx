import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Shield, 
  Settings, 
  Edit3, 
  Bell, 
  LogOut,
  Clock,
  CheckCircle2,
  BookOpen,
  Award,
  Camera,
  Share2,
  XCircle,
  Clock3,
  Loader2,
  Building2
} from 'lucide-react';
import campusHero from '../assets/campus_hero.png';
import { Link } from 'react-router-dom';

const StudentProfile = () => {
  // Mock student data
  const student = {
    name: 'Amila Perera',
    sid: 'IT21004567',
    email: 'amila.p@university.edu',
    phone: '+94 77 123 4567',
    location: 'Homagama, Sri Lanka',
    department: 'Computing & Information Technology',
    degree: 'BSc (Hons) in Software Engineering',
    year: '3rd Year, Semester 1',
    gpa: '3.82',
    joinedDate: 'February 2023',
    profileImg: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'
  };

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/bookings/user/${student.sid}`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          setError('Failed to load bookings');
        }
      } catch (err) {
        setError('Connection error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [student.sid]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return '#22c55e';
      case 'REJECTED': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle2 size={14} />;
      case 'REJECTED': return <XCircle size={14} />;
      default: return <Clock3 size={14} />;
    }
  };

  return (
    <div className="profile-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Premium Hero Section */}
      <section style={{ 
        height: '460px', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--primary)'
      }}>
        {/* Background Image with Overlay */}
        <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: `url(${campusHero})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: 0.4
        }}></div>
        <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'linear-gradient(180deg, rgba(7, 19, 63, 0.4) 0%, rgba(7, 19, 63, 0.95) 100%)' 
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '40px', 
                border: '8px solid rgba(255, 255, 255, 0.1)', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                background: '#fff'
              }}>
                <img src={student.profileImg} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '44px', height: '44px', borderRadius: '14px', background: 'var(--secondary)', color: '#fff', border: '4px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={20} />
              </button>
            </div>

            {/* Name and Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ padding: '4px 12px', borderRadius: '99px', background: 'rgba(242, 106, 0, 0.2)', color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Student Account
                </span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Joined {student.joinedDate}</span>
              </div>
              <h1 className="hero-gradient-text" style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem' }}>
                {student.name}
              </h1>
              <div style={{ display: 'flex', gap: '2rem', color: 'rgba(255,255,255,0.8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={20} style={{ color: 'var(--secondary)' }} />
                  <span style={{ fontWeight: '600' }}>{student.sid}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} style={{ color: 'var(--secondary)' }} />
                  <span style={{ fontWeight: '600' }}>{student.location}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                  <Share2 size={18} /> Share Profile
               </button>
               <button className="glass" style={{ padding: '1rem 2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Edit3 size={18} /> Edit Profile
               </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 20 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left Column */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>Academic Status</h3>
              <div style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'var(--primary)', color: '#fff', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '100px', height: '100px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.3 }}></div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{student.gpa}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: '600' }}>Cumulative GPA</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(7, 19, 63, 0.05)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Department</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{student.department}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>Contact Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Mail size={18} className="text-primary" />
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{student.email}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Phone size={18} className="text-primary" />
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{student.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bookings Integration */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>Your Reservations</h3>
                <Link to="/book" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>New Booking</Link>
              </div>

              {isLoading ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Loader2 className="animate-spin" style={{ margin: '0 auto 1rem' }} size={32} />
                  <p>Loading your bookings...</p>
                </div>
              ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444', background: '#fef2f2', borderRadius: '1rem' }}>
                  {error}
                </div>
              ) : bookings.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', border: '2px dashed var(--border-light)', borderRadius: '1.5rem' }}>
                  <Calendar size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.3 }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Bookings Yet</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't made any resource reservations yet.</p>
                  <Link to="/book" className="btn btn-outline">Explore Facilities</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bookings.map(booking => (
                    <div key={booking.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '1.5rem', background: '#f8fafc', transition: 'all 0.3s ease' }} className="booking-card">
                      <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                        <Building2 size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>{booking.resourceName}</h4>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            fontWeight: '800', 
                            padding: '3px 10px', 
                            borderRadius: '99px', 
                            background: `${getStatusColor(booking.status)}15`, 
                            color: getStatusColor(booking.status),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            textTransform: 'uppercase'
                          }}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Calendar size={14} /> {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={14} /> {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Details</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other Profile sections... */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
               <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: '#fff' }}>
                  <Bell size={32} style={{ marginBottom: '1.5rem', color: 'var(--secondary)' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem' }}>Notifications</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.5rem' }}>Stay updated with your latest campus activities.</p>
                  <button className="btn btn-primary" style={{ width: '100%', borderRadius: '12px' }}>View Alerts</button>
               </div>
               <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <LogOut size={28} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Sign Out</h3>
                  <button className="btn btn-outline" style={{ width: '100%', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>Logout Session</button>
               </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .booking-card:hover {
          transform: translateY(-5px);
          background: #fff !important;
          box-shadow: 0 15px 30px rgba(0,0,0,0.06);
        }
        @media (max-width: 992px) {
          .profile-page h1 { font-size: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
