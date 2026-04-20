import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleBookResource = (type, name) => {
    navigate('/book', { state: { resourceType: type, resourceName: name } });
  };
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
            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}>
              Start Learning
            </Link>
            <Link to="/courses" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              View Courses
            </Link>
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
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>User requests a booking or reports a campus incident with key details.</p>
              <button 
                className="btn btn-outline" 
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                onClick={() => handleBookResource('lecture-hall', 'Main Hall')}
              >
                Book Sample Hall
              </button>
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

