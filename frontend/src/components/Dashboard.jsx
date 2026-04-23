import React from 'react';
import { 
  Building2, 
  CalendarRange, 
  Ticket, 
  Settings2, 
  Bell, 
  ArrowRight,
  ShieldCheck,
  Wrench,
  Layers,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const modules = [
    {
      title: "Facilities & Assets",
      description: "Comprehensive catalogue of lecture halls, labs, and specialized equipment management.",
      icon: <Building2 size={24} style={{ color: '#8b5cf6' }} />,
      link: "/facilities-dashboard",
      color: "rgba(139, 92, 246, 0.15)",
      accent: "#8b5cf6",
      tag: "Module A"
    },
    {
      title: "Bookings & Workflow",
      description: "End-to-end booking lifecycle with smart conflict detection and approval chains.",
      icon: <CalendarRange size={24} style={{ color: '#8b5cf6' }} />,
      link: "/bookings",
      color: "rgba(139, 92, 246, 0.15)",
      accent: "#8b5cf6",
      tag: "Module B"
    },
    {
      title: "Incident Management",
      description: "Real-time ticket tracking, technician updates, and asset maintenance history.",
      icon: <Wrench size={24} style={{ color: '#f59e0b' }} />,
      link: "/incident-management",
      color: "rgba(245, 158, 11, 0.15)",
      accent: "#f59e0b",
      tag: "Module C"
    },
    {
      title: "System & Governance",
      description: "Advanced role-based access control, notification dispatch, and OAuth security.",
      icon: <ShieldCheck size={24} style={{ color: '#10b981' }} />,
      link: "/admin",
      color: "rgba(16, 185, 129, 0.15)",
      accent: "#10b981",
      tag: "Module D"
    }
  ];

  return (
    <div style={{ padding: '140px 0 100px 0', minHeight: '100vh', background: 'radial-gradient(circle at top right, #f1f5f9, #ffffff)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Blur Orbs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.05)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(139, 92, 246, 0.05)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex justify-between items-end mb-16">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Activity size={18} />
                Hub Control Center
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.04em' }}>
                Operations <span className="gradient-text">Dashboard</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px' }}>
              Welcome back to UniHub. Manage your specialized campus modules and monitor real-time operational data.
            </p>
          </div>
          
          <div className="flex gap-4">
             <button className="btn btn-outline glass" style={{ width: '56px', height: '56px', borderRadius: '16px', padding: 0 }}>
                <Bell size={22} />
             </button>
             <div className="glass" style={{ padding: '0.5rem 1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '3px', border: '1px solid var(--primary)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>
                    AD
                </div>
                <div className="flex flex-col" style={{ marginLeft: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', lineHeight: 1.2 }}>Administrator</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Super User</span>
                </div>
             </div>
          </div>
        </div>

        {/* 4-Module Premium Grid - Forced 2x2 for Desktop */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {modules.map((module, i) => (
            <div key={i} className="feature-card glass" style={{ 
              padding: '3rem', 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%', 
              border: '1px solid rgba(255,255,255,0.8)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              borderRadius: '28px'
            }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px', background: 'rgba(0,0,0,0.03)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {module.tag}
                </span>
              </div>

              <div style={{ marginBottom: '2rem', width: '60px', height: '60px', borderRadius: '18px', background: module.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {module.icon}
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: module.color, borderRadius: '18px', filter: 'blur(10px)', zIndex: -1, opacity: 0.5 }}></div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{module.title}</h3>
                <div style={{ width: '40px', height: '3px', background: module.accent, marginTop: '8px', borderRadius: '2px' }}></div>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem', flexGrow: 1 }}>
                {module.description}
              </p>
              
              <Link to={module.link} className="btn" style={{ width: '100%', justifyContent: 'space-between', background: '#0f172a', color: 'white', padding: '1rem 1.5rem' }}>
                <span className="flex items-center gap-2">
                    <Zap size={16} />
                    Launch Module
                </span>
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        {/* Global Activity Feed Static Placeholder */}
        <div className="mt-16 p-10 glass animate-fade-in" style={{ borderRadius: '32px', border: '1px solid rgba(59, 130, 246, 0.2)', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(255, 255, 255, 0) 100%)' }}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-primary" size={20} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>System Status Overview</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Server Uptime</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>99.98%</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Active Users</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>124</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Open Tickets</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
