import React from 'react';
import { 
  Building2, 
  CalendarCheck2, 
  Wrench, 
  ChevronRight, 
  ShieldCheck,
  LayoutDashboard,
  Users,
  BarChart3,
  Play,
  ArrowRight,
  Cpu,
  Layers,
  Lock,
  UserCheck
} from 'lucide-react';
import campusHero from '../assets/campus_hero.png';

const HomePage = () => {
  return (
    <div className="home-page" style={{ background: 'var(--bg-deep)' }}>
      {/* Heavy Hero Section with Overlap Support */}
      <section className="relative" style={{ minHeight: '600px', padding: '160px 0 180px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${campusHero})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.4))', zIndex: 2 }}></div>
        
        <div className="container relative text-center" style={{ zIndex: 3, maxWidth: '900px' }}>
          <div style={{ display: 'inline-flex', padding: '8px 24px', background: 'var(--primary)', color: 'white', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', border: 'none' }}>
            Next-Gen Learning Platform
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Master Your Future <br />
            With UniHub
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '2.5rem', maxWidth: '750px', marginInline: 'auto', lineHeight: 1.6 }}>
            UniHub is a role-based platform designed to manage facility bookings, maintenance requests, and campus workflows efficiently.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}>
              Start Learning
            </a>
            <a href="/courses" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              View Courses
            </a>
          </div>
        </div>
      </section>

      {/* Overlapping Feature Cards */}
      <section id="features" style={{ position: 'relative', zIndex: 10, marginTop: '-120px', paddingBottom: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '900px', width: '100%' }}>
            {/* Card 1 */}
            <div className="feature-card" style={{ background: '#ffffff', textAlign: 'center', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s ease' }}>
              <div style={{ width: '64px', height: '64px', background: '#ffffff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#2563eb', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' }}>
                <CalendarCheck2 size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>Booking Management</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Request and manage room, lab, and equipment bookings with automated conflict prevention.</p>
            </div>

            {/* Card 2 */}
            <div className="feature-card" style={{ background: '#ffffff', textAlign: 'center', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s ease' }}>
              <div style={{ width: '64px', height: '64px', background: '#ffffff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#10b981', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' }}>
                <Wrench size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>Maintenance System</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Report issues with resources and track ticket status from Open to Closed in real-time.</p>
            </div>

            {/* Card 3 */}
            <div className="feature-card" style={{ background: '#ffffff', textAlign: 'center', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s ease' }}>
              <div style={{ width: '64px', height: '64px', background: '#ffffff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#f59e0b', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' }}>
                <Lock size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>Secure Authentication</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Enterprise-grade security featuring JWT-based login and robust role validation mechanisms.</p>
            </div>

            {/* Card 4 */}
            <div className="feature-card" style={{ background: '#ffffff', textAlign: 'center', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s ease' }}>
              <div style={{ width: '64px', height: '64px', background: '#ffffff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#8b5cf6', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' }}>
                <Users size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>Role-Based Dashboards</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Dedicated portals for Admins, Technicians, and Users to manage their specific tasks and queues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Block */}
      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Operational Flow</span>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>How UniHub Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', position: 'relative' }}>
                <Layers size={36} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: '28px', height: '28px', background: '#0f172a', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>01</div>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.5rem' }}>Resource Request</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>User requests a booking or reports a campus incident with key details.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', position: 'relative' }}>
                <UserCheck size={36} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: '28px', height: '28px', background: '#0f172a', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>02</div>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.5rem' }}>Rapid Assignment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Admin reviews requests or assigns a Technician to relevant tickets.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', position: 'relative' }}>
                <ShieldCheck size={36} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: '28px', height: '28px', background: '#0f172a', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>03</div>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.5rem' }}>Live Resolution</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time updates and notifications are sent throughout the workflow.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

