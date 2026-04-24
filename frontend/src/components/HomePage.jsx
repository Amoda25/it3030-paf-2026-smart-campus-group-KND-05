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
import campusHero from '../assets/sliit_campus.png';
import graduate1 from '../assets/graduate1.png';
import graduate2 from '../assets/graduate2.png';
import graduate3 from '../assets/graduate3.png';
import facilitiesHero from '../assets/facilities_hero.png';
import resourceBlue from '../assets/blue_resource.png';
import systemsBlue from '../assets/blue_systems.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [campusHero, graduate1, graduate2, graduate3];

  const [popularFacilities, setPopularFacilities] = useState([]);
  const [loadingFacilities, setLoadingFacilities] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchPopularFacilities();
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const fetchPopularFacilities = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/facilities');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        const active = data.filter(f => f.status === 'ACTIVE').slice(0, 3);
        setPopularFacilities(active);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setPopularFacilities([]); // Fallback to empty list
    } finally {
      setLoadingFacilities(false);
    }
  };

  const handleBookResource = (type, name) => {
    navigate('/book', { state: { resourceType: type, resourceName: name } });
  };

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
      <section className="relative" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
        {/* Sliding Background Images */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${slide})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              filter: 'brightness(0.5)',
              zIndex: 1,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          ></div>
        ))}
        {/* Extra dark overlay for text clarity */}
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(7, 19, 63, 0.75) 0%, rgba(7, 19, 63, 0.50) 100%)', 
            zIndex: 2 
          }}
        ></div>
        
        {/* Hero text — full width, left aligned */}
        <div className="relative" style={{ zIndex: 3, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '180px', paddingBottom: '120px', paddingLeft: '7.0rem', paddingRight: '7.0rem' }}>
          <div className={`animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ maxWidth: '800px', transition: 'all 1s ease-out', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <p style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              DO YOU NEED ANY HELP?
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, color: 'white', lineHeight: 1.02, marginBottom: '1.8rem', textTransform: 'uppercase', textShadow: '0 2px 20px rgba(0,0,0,0.6)', letterSpacing: '-0.01em' }}>
              WELCOME TO<br />
              <span className="hero-gradient-text">UniHub</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.88)', marginBottom: '2.8rem', lineHeight: 1.75, maxWidth: '550px' }}>
              UniHub provides a seamless digital ecosystem for resource booking, maintenance tracking, and real-time campus connectivity.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/facilities" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem', boxShadow: '0 8px 25px rgba(242, 106, 0, 0.4)' }}>
                Explore Facilities <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/book" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem', boxShadow: '0 8px 25px rgba(242, 106, 0, 0.4)' }}>
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {loadingFacilities ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                <p style={{ color: 'var(--text-muted)' }}>Fetching latest campus resources...</p>
              </div>
            ) : popularFacilities.length > 0 ? (
              popularFacilities.map((facility) => (
                <div key={facility.id} className="feature-card glass" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img src={facility.imageUrl || facilitiesHero} alt={facility.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: 'white', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Star size={14} style={{ color: '#fbbf24' }} /> {facility.rating || '4.5'}
                    </div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{facility.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {facility.description || "Premium campus space equipped with modern amenities for an enhanced learning experience."}
                    </p>
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
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '24px' }}>
                <Box size={48} style={{ color: 'var(--text-muted)', opacity: 0.3, margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>No facilities listed yet</h3>
                <p style={{ color: 'var(--text-muted)' }}>Check back later for updated campus resources.</p>
              </div>
            )}
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
                <div style={{ width: '64px', height: '64px', background: 'rgba(242, 106, 0, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', flexShrink: 0 }}>
                  <Newspaper size={30} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', background: 'var(--secondary)', padding: '2px 10px', borderRadius: '99px' }}>{news.category}</span>
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
          <div className="glass" style={{ padding: '5rem', borderRadius: '48px', background: 'linear-gradient(135deg, var(--primary) 0%, #040b2a 100%)', position: 'relative', overflow: 'hidden' }}>
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

