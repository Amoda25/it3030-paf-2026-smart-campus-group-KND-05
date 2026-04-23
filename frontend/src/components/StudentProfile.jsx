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
  Award
} from 'lucide-react';

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
    <div className="profile-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header Section */}
        <div className="glass" style={{ 
          borderRadius: '2rem', 
          background: '#fff', 
          overflow: 'hidden', 
          marginBottom: '2rem',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <div style={{ height: '160px', background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', position: 'relative' }}>
             <button style={{ position: 'absolute', bottom: '1rem', right: '2rem', padding: '0.6rem 1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={16} /> Edit Cover
             </button>
          </div>
          
          <div style={{ padding: '0 3rem 3rem 3rem', marginTop: '-50px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '30px', border: '6px solid #fff', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', background: '#fff' }}>
                  <img src={student.profileImg} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ paddingBottom: '1rem' }}>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>{student.name}</h1>
                  <p style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GraduationCap size={18} className="text-primary" /> {student.sid} • {student.degree}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem' }}>
                 <button style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
                    Download ID
                 </button>
                 <button style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', color: '#64748b', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Settings size={20} />
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          
          {/* Left Column - Info Cards */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Contact Card */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0f9ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Email Address</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>{student.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Phone Number</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>{student.phone}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>{student.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Summary */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>Academic Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: '1.25rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.25rem' }}>{student.gpa}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700' }}>Current GPA</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Academic Year</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>{student.year}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Joined Date</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>{student.joinedDate}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Status</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e', fontWeight: '800' }}>
                        <Shield size={14} /> Active
                      </span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & More */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
               {[
                 { label: 'Courses', value: '08', icon: <BookOpen size={20} className="text-primary" /> },
                 { label: 'Reservations', value: '12', icon: <Calendar size={20} style={{ color: '#8b5cf6' }} /> },
                 { label: 'Achievements', value: '04', icon: <Award size={20} style={{ color: '#f59e0b' }} /> }
               ].map((stat, i) => (
                 <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: '#fff', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>{stat.label}</div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Recent Activity */}
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>Recent Activities</h3>
                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>View All Activity</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activities.map(activity => (
                  <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', borderRadius: '1.25rem', background: '#f8fafc', transition: 'all 0.2s ease' }} className="activity-item">
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', color: 'var(--primary)' }}>
                      {activity.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{activity.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={12} /> {activity.date} • {activity.type}
                      </div>
                    </div>
                    <div style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', background: activity.status === 'Completed' ? '#dcfce7' : activity.status === 'In Progress' ? '#fef3c7' : '#dbeafe', color: activity.status === 'Completed' ? '#15803d' : activity.status === 'In Progress' ? '#92400e' : '#1e40af' }}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings / Preferences Placeholder */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
               <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: '#fff' }}>
                  <Bell size={32} style={{ marginBottom: '1.5rem', color: 'var(--primary)' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem' }}>Notifications</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.5rem' }}>You have 2 unread messages and 1 pending reservation update.</p>
                  <button className="btn btn-primary" style={{ width: '100%', borderRadius: '12px' }}>Check Inbox</button>
               </div>
               <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <LogOut size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Logout Session</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>End your current login session securely from all devices.</p>
                  <button className="btn btn-outline" style={{ width: '100%', color: '#ef4444', borderColor: '#fee2e2', borderRadius: '12px' }}>Sign Out</button>
               </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .activity-item:hover {
          transform: translateX(10px);
          background: #fff !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.03);
        }
        @media (max-width: 992px) {
          .profile-page .container {
            padding: 0 20px;
          }
          .profile-page grid {
            display: flex !important;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
