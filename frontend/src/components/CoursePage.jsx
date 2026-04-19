import React from 'react';

const CoursePage = () => {
  return (
    <div className="course-page" style={{ background: 'var(--bg-deep)', minHeight: '80vh', padding: '160px 0 80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Explore Programs</span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginTop: '0.5rem' }}>Our Courses</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
            Discover our comprehensive range of industry-aligned programs designed to accelerate your career.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Course Card 1 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'transform 0.3s ease' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Engineering
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#1e3a8a', marginBottom: '1rem', fontWeight: 800 }}>Software Engineering</h3>
            <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>Learn the fundamentals of software engineering, system design, and modern development practices.</p>
            <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>View Program Details</button>
          </div>

          {/* Course Card 2 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'transform 0.3s ease' }}>
             <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Data & AI
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#1e3a8a', marginBottom: '1rem', fontWeight: 800 }}>Data Science</h3>
            <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>Explore data analysis, machine learning algorithms, and real-world predictive modeling applications.</p>
            <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>View Program Details</button>
          </div>

          {/* Course Card 3 */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)', transition: 'transform 0.3s ease' }}>
             <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Security
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#1e3a8a', marginBottom: '1rem', fontWeight: 800 }}>Cyber Security</h3>
            <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>Master network security, ethical hacking, and protect systems against evolving global cyber threats.</p>
            <button className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>View Program Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
