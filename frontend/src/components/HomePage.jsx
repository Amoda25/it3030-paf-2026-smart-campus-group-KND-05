import React, { useState, useEffect } from 'react';
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
  UserCheck,
  MessageSquare,
  MapPin,
  Bell,
  Newspaper,
  Star,
  Clock,
  Calendar
} from 'lucide-react';
import campusHero from '../assets/campus_hero_new.png'; // Using the newer hero image
import facilitiesHero from '../assets/facilities_hero.png';
import resourceBlue from '../assets/blue_resource.png';
import systemsBlue from '../assets/blue_systems.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBookResource = (type, name) => {
    navigate('/book', { state: { resourceType: type, resourceName: name } });
  };

  const popularFacilities = [
    {
      id: 1,
      name: "Main Auditorium",
      description: "State-of-the-art 500-seat theater for events and lectures.",
      image: facilitiesHero,
      rating: 4.9,
      type: "lecture-hall"
    },
    {
      id: 2,
      name: "Innovation Lab",
      description: "Equipped with 3D printers, VR kits, and high-performance computing.",
      image: resourceBlue,
      rating: 4.8,
      type: "lab"
    },
    {
      id: 3,
      name: "Smart Study Pods",
      description: "Private, soundproof pods with high-speed Wi-Fi and climate control.",
      image: systemsBlue,
      rating: 4.7,
      type: "study-room"
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Library Extended Hours",
      date: "Oct 24, 2026",
      category: "Academic",
      content: "The main library will be open 24/7 during the upcoming exam period starting next Monday."
    },
    {
      id: 2,
      title: "New Smart Cafeteria Opening",
      date: "Oct 22, 2026",
      category: "Campus Life",
      content: "Experience our new AI-driven meal planning and self-checkout system at the North Block."
    },
    {
      id: 3,
      title: "Network Maintenance",
      date: "Oct 20, 2026",
      category: "Technical",
      content: "Brief Wi-Fi outages expected between 2:00 AM and 4:00 AM this Sunday for system upgrades."
    }
  ];

  return (
    <div className="home-page" style={{ background: 'var(--bg-deep)', overflowX: 'hidden' }}>
      
      {/* 1. Hero Banner Section */}
      <section className="relative" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0' }}>
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${campusHero})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            zIndex: 1,
            filter: 'brightness(0.6)'
          }}
        ></div>
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)', 
            zIndex: 2 
          }}
        ></div>
        
        <div className="container relative" style={{ zIndex: 3 }}>
          <div className={`animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ maxWidth: '800px', transition: 'all 1s ease-out' }}>
            <div style={{ display: 'inline-flex', padding: '8px 24px', background: 'rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(10px)', color: '#60a5fa', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <Star size={14} style={{ marginRight: '8px' }} /> Discover the Future of Campus Life
            </div>
            <h1 style={{ fontSize: '5rem', fontWeight: 800, color: 'white', lineHeight: 1.05, marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              Empower Your <span className="hero-gradient-text">Academic</span> Journey
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              UniHub provides a seamless digital ecosystem for resource booking, maintenance tracking, and real-time campus connectivity.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/facilities" className="btn btn-primary" style={{ padding: '1.1rem 2.8rem', fontSize: '1.1rem', boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)' }}>
                Explore Facilities <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/book" className="btn btn-primary" style={{ padding: '1.1rem 2.8rem', fontSize: '1.1rem', boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)' }}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 3. Popular Facilities Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Campus Highlights</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem' }}>Popular Facilities</h2>
            </div>
            <Link to="/facilities" className="btn btn-outline" style={{ borderRadius: '99px' }}>
              View All Facilities <ChevronRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {popularFacilities.map((facility) => (
              <div key={facility.id} className="feature-card glass" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={facility.image} alt={facility.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: 'white', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={14} style={{ color: '#fbbf24' }} /> {facility.rating}
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{facility.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>{facility.description}</p>
                  <div className="flex justify-between items-center">
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '0.6rem 1.5rem' }}
                      onClick={() => handleBookResource(facility.type, facility.name)}
                    >
                      Book Now
                    </button>
                    <Link to="/facilities" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Announcements Block */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Stay Informed</span>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem' }}>Latest Announcements</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
            {announcements.map((news) => (
              <div key={news.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border-light)', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                <div style={{ width: '64px', height: '64px', background: 'var(--secondary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <Newspaper size={30} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', background: 'var(--primary)', padding: '2px 10px', borderRadius: '99px' }}>{news.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {news.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>{news.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>{news.content}</p>
                  <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    Read More <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Newsletter / Call to Action */}
      <section className="section-padding">
        <div className="container">
          <div className="glass" style={{ padding: '5rem', borderRadius: '48px', background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', maxWidth: '700px', marginInline: 'auto' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>Join the UniHub Community</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
                Subscribe to our newsletter for the latest campus updates, new facility openings, and technical support.
              </p>
              <form className="flex gap-3 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your university email" 
                  style={{ flex: 1, padding: '1.2rem 1.5rem', borderRadius: '16px', border: 'none', fontSize: '1rem', outline: 'none' }}
                />
                <button type="submit" className="btn btn-white" style={{ paddingInline: '2rem' }}>
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

