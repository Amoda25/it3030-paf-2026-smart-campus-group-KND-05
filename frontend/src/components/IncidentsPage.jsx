import React from 'react';
import { ArrowRight, Wrench, ShieldAlert, Cpu, Clock } from 'lucide-react';

const IncidentsPage = () => {
  return (
    <div className="incidents-page" style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden" style={{ padding: '160px 0 120px 0', background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%)' }}>
        {/* Animated Background Glows */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', 
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container relative" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-start gap-8" style={{ maxWidth: '800px' }}>
            {/* Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.5rem 1.25rem', 
                background: 'rgba(59, 130, 246, 0.08)', 
                borderRadius: '99px', 
                border: '1px solid rgba(59, 130, 246, 0.2)',
                color: '#2563eb',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
              className="animate-fade-in"
            >
              <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }} />
              UniHub • Maintenance & Incident Ticketing
            </div>

            {/* Heading */}
            <h1 
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 5rem)', 
                fontWeight: 800, 
                lineHeight: 1.05, 
                letterSpacing: '-0.04em',
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}
              className="animate-fade-in"
            >
              Raise a campus <br />
              <span style={{ color: '#0f172a' }}>maintenance ticket</span> <br />
              <span style={{ color: '#2563eb' }}>in minutes</span>
            </h1>

            {/* Description */}
            <p 
              style={{ 
                fontSize: '1.25rem', 
                color: '#475569', 
                lineHeight: 1.6, 
                maxWidth: '650px',
                fontWeight: '450'
              }}
              className="animate-fade-in"
            >
              Report projector faults, network issues, classroom damage, electrical problems, and more. 
              Submit your request with priority, location, contact details, and image evidence.
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ marginTop: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ 
                  background: '#2563eb',
                  padding: '1.25rem 2.5rem', 
                  fontSize: '1.1rem', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
                  border: 'none',
                  color: 'white'
                }}
              >
                Raise Ticket Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IncidentsPage;
