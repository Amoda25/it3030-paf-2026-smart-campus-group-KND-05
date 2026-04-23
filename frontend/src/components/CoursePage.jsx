import React from 'react';
import courseHero from '../assets/course1.png';

const CoursePage = () => {
  return (
    <div className="course-page" style={{ background: 'var(--bg-deep)', overflowX: 'hidden' }}>
      
      {/* 1. Hero Section */}
      <section className="relative" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
        {/* Background image */}
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url(${courseHero})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            zIndex: 1
          }}
        ></div>
        {/* Dark overlay */}
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(7, 19, 63, 0.85) 0%, rgba(7, 19, 63, 0.6) 100%)', 
            zIndex: 2 
          }}
        ></div>
        
        {/* Hero content */}
        <div className="relative" style={{ zIndex: 3, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '160px', paddingBottom: '100px' }}>
          <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
            <span style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block' }}>
              Explore Programs
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              OUR <span className="hero-gradient-text">COURSES</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.88)', lineHeight: 1.75, maxWidth: '600px', margin: '0 auto' }}>
              Discover our comprehensive range of industry-aligned programs designed to accelerate your career and equip you with future-ready skills.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Course Cards Section */}
      <div className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Course Card 1 */}
            <div className="feature-card glass" style={{ padding: '2.5rem 2rem', borderTop: '4px solid var(--secondary)' }}>
              <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(242, 106, 0, 0.1)', color: 'var(--secondary)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Engineering
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>Software Engineering</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>Learn the fundamentals of software engineering, system design, and modern development practices.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>View Program Details</button>
            </div>

            {/* Course Card 2 */}
            <div className="feature-card glass" style={{ padding: '2.5rem 2rem', borderTop: '4px solid #10b981' }}>
               <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Data & AI
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>Data Science</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>Explore data analysis, machine learning algorithms, and real-world predictive modeling applications.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>View Program Details</button>
            </div>

            {/* Course Card 3 */}
            <div className="feature-card glass" style={{ padding: '2.5rem 2rem', borderTop: '4px solid #a855f7' }}>
               <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Security
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>Cyber Security</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>Master network security, ethical hacking, and protect systems against evolving global cyber threats.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>View Program Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

