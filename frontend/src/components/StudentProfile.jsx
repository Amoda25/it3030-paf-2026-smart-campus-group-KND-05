import React from 'react';
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
  Share2
} from 'lucide-react';
import campusHero from '../assets/campus_hero.png';

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

  const activities = [
    { id: 1, type: 'Booking', title: 'Main Hall Reserved', date: 'Yesterday', status: 'Completed', icon: <Calendar size={16} /> },
    { id: 2, type: 'Ticket', title: 'Projector Issue Reported', date: '3 days ago', status: 'In Progress', icon: <Settings size={16} /> },
    { id: 3, type: 'Course', title: 'Applied Statistics Enrolled', date: '1 week ago', status: 'Active', icon: <BookOpen size={16} /> },
  ];

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

        {/* Decorative Blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '400px', height: '400px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            
            {/* Avatar with Glow */}
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
              <button style={{ 
                position: 'absolute', 
                bottom: '-10px', 
                right: '-10px', 
                width: '44px', 
                height: '44px', 
                borderRadius: '14px', 
                background: 'var(--secondary)', 
                color: '#fff', 
                border: '4px solid var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Camera size={20} />
              </button>
            </div>

            {/* Name and Basic Info */}
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

            {/* Hero Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                  <Share2 size={18} /> Share Profile
               </button>
               <button className="glass" style={{ 
                 padding: '1rem 2rem', 
                 borderRadius: '12px', 
                 background: 'rgba(255,255,255,0.05)', 
                 color: '#fff', 
                 border: '1px solid rgba(255,255,255,0.1)',
                 fontWeight: '600',
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '0.5rem'
               }}>
                  <Edit3 size={18} /> Edit Profile
               </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area - Shifted Up */}
      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 20 }}>
        
        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left Column - Info Cards */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Quick Info Card */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(242, 106, 0, 0.05)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Enrollment</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>{student.year}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
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

          {/* Right Column */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
               {[
                 { label: 'Active Courses', value: '08', icon: <BookOpen size={20} /> },
                 { label: 'Total Bookings', value: '12', icon: <Calendar size={20} /> },
                 { label: 'Achievement Points', value: '850', icon: <Award size={20} /> }
               ].map((stat, i) => (
                 <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(7, 19, 63, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--primary)' }}>
                      {stat.icon}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{stat.label}</div>
                 </div>
               ))}
            </div>

            {/* Activities */}
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>Recent Activity</h3>
                <button style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>View All</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activities.map(activity => (
                  <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', borderRadius: '1.5rem', background: '#f8fafc' }} className="activity-item">
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', color: 'var(--secondary)' }}>
                      {activity.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>{activity.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activity.date} • {activity.type}</div>
                    </div>
                    <div style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', background: 'rgba(7, 19, 63, 0.05)', color: 'var(--primary)' }}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .activity-item {
          transition: all 0.3s ease;
        }
        .activity-item:hover {
          transform: translateX(10px);
          background: #fff !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        @media (max-width: 992px) {
          .profile-page h1 { font-size: 2.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
