import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Phone, 
  LayoutDashboard, 
  CalendarCheck2, 
  Wrench, 
  Database, 
  Activity, 
  ShieldCheck,
  Building2,
  Users,
  ArrowRight
} from 'lucide-react';
import heroImg from '../assets/blue_hero.png';
import resourceImg from '../assets/blue_resource.png';
import systemsImg from '../assets/blue_systems.png';

const AboutUs = () => {
  return (
    <div className="about-page-refined" style={{ background: '#fff', color: 'var(--text-main)' }}>
      {/* Breadcrumbs */}
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', opacity: 0.7 }}>Home</Link>
          <ChevronRight size={12} strokeWidth={3} />
          <span>About UniHub</span>
        </nav>
      </div>

      {/* Futuristic Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '75vh', 
        minHeight: '600px', 
        width: '100%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src={heroImg} 
          alt="Smart Campus Hero" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 58, 138, 0.4) 100%)', 
          zIndex: 2 
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', color: '#fff' }}>
          <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '2rem', backdropFilter: 'blur(10px)', color: '#60a5fa' }}>
            SMART CAMPUS OPERATIONS HUB
          </div>
          <h1 style={{ 
            fontSize: '5.5rem', 
            fontFamily: "'Outfit', sans-serif", 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            lineHeight: 1,
            letterSpacing: '-0.04em'
          }}>Pioneering <br />Campus Tech</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Empowering modern institutions with the digital orchestrator needed to manage facilities, resources, and people seamlessly.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary" style={{ padding: '1rem 3rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700' }}>
              Explore Platform
            </button>
            <button className="btn btn-outline" style={{ padding: '1rem 3rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Mission / Narrative Section */}
      <section className="container" style={{ padding: '100px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        <div>
          <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Our Mission</span>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#0f172a', margin: '1rem 0 2rem' }}>A Unified Vision for <br /><span className="gradient-text">Intelligent Operations</span></h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              UniHub was born from the realization that modern campuses are complex ecosystems that require more than just fragmented tools. We built a unified hub where every operation—from facility booking to maintenance dispatch—is interconnected.
            </p>
            <p>
              Our platform uses real-time data to bridge the gap between administrators, technicians, and users, ensuring that campus resources are always where they need to be, when they need to be there.
            </p>
          </div>
          <div className="flex gap-8 mt-10">
            <div className="flex flex-col">
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>50+</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Partner Institutions</span>
            </div>
            <div className="flex flex-col">
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>99.9%</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Uptime Reliability</span>
            </div>
          </div>
        </div>
        <div className="glass p-12" style={{ borderRadius: '3rem', background: 'var(--secondary)', border: 'none' }}>
           <div className="flex flex-col gap-8">
              {[
                { icon: <Building2 className="text-primary" />, title: 'Smart Infrastructure', desc: 'Managing over 10,000+ campus facilities globally.' },
                { icon: <Users className="text-primary" />, title: 'Role-Based Control', desc: 'Tailored experiences for Students, Admins, and Technicians.' },
                { icon: <ShieldCheck className="text-primary" />, title: 'Enterprise Security', desc: 'Bank-grade encryption for all institutional data.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0" style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Platform Features Grid (In This Section) */}
      <section style={{ background: '#f1f5f9', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>Core Operational Hubs</h3>
            <p className="text-muted">Direct links to our smart campus modules</p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {[
              { icon: <CalendarCheck2 size={20} />, title: "Facility & Hall Booking", link: "/" },
              { icon: <Wrench size={20} />, title: "Maintenance Workflows", link: "/" },
              { icon: <Database size={20} />, title: "Asset & Inventory Catalog", link: "/" },
              { icon: <LayoutDashboard size={20} />, title: "Admin Operation Center", link: "/" },
              { icon: <Activity size={20} />, title: "Real-time Field Monitoring", link: "/" },
              { icon: <ShieldCheck size={20} />, title: "Security & Access Control", link: "/" }
            ].map((item, i) => (
              <Link key={i} to={item.link} className="glass" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '1.5rem 2rem', 
                textDecoration: 'none', 
                color: 'var(--text-main)',
                borderRadius: '1.5rem',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{item.title}</span>
                <ChevronRight size={18} className="ml-auto" style={{ opacity: 0.5 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Systems Preview */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          <div style={{ 
            position: 'relative', 
            height: '450px', 
            borderRadius: '2.5rem', 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '3rem'
          }}>
            <img src={resourceImg} alt="Resource Hub" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)', zIndex: 2 }} />
            <div style={{ position: 'relative', zIndex: 3, color: '#fff' }}>
              <span style={{ background: 'var(--primary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>RESOURCE TECH</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0' }}>Resource Orchestration</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Intelligent mapping and allocation of campus materials and equipment.</p>
              <Link to="/" className="flex items-center gap-2" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div style={{ 
            position: 'relative', 
            height: '450px', 
            borderRadius: '2.5rem', 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '3rem'
          }}>
            <img src={systemsImg} alt="Smart Systems" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(30, 58, 138, 0.9), transparent)', zIndex: 2 }} />
            <div style={{ position: 'relative', zIndex: 3, color: '#fff' }}>
              <span style={{ background: '#0ea5e9', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>SMART ANALYTICS</span>
              <h3 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0' }}>Incident Analysis</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Predictive maintenance and real-time incident tracking dashboard.</p>
              <Link to="/" className="flex items-center gap-2" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>
                View Dashboard <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Talk */}
      <section style={{ borderTop: '1px solid #f1f5f9', padding: '40px 0' }}>
         <div className="container flex justify-between items-center bg-white">
            <div className="flex items-center gap-6">
               <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={28} />
               </div>
               <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Need a personalized consultation?</h4>
                  <p className="text-muted">Talk to our campus tech architecture specialists today.</p>
               </div>
            </div>
            <div style={{ textAlign: 'right' }}>
               <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', display: 'block' }}>+94 11 234 5678</span>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>MON - FRI, 9AM - 5PM</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutUs;
