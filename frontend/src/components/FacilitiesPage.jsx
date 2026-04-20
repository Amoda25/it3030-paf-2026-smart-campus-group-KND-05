import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Users, 
  Plus, 
  LayoutGrid, 
  Settings, 
  PieChart, 
  PlusCircle, 
  ArrowLeft,
  BookOpen,
  Cpu,
  Camera,
  Info,
  ChevronRight,
  TrendingUp,
  Box,
  Filter,
  Monitor,
  Mic2,
  Lock,
  Globe,
  MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import facilitiesHero from '../assets/facilities_hero.png';

const FacilitiesPage = () => {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'admin'
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Admin Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Lecture Hall',
    capacity: '',
    location: '',
    status: 'ACTIVE',
    description: '',
    imageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccessMsg('Facility registered successfully!');
        setFormData({ name: '', type: 'Lecture Hall', capacity: '', location: '', status: 'ACTIVE', description: '', imageUrl: '' });
        fetchFacilities();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (error) {
      console.error('Error adding facility:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', 'Lecture Hall', 'Lab', 'Meeting Room', 'Studios', 'Equipment'];

  const filteredFacilities = facilities.filter(fac => {
    const matchesSearch = fac.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fac.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || fac.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'Lecture Hall': return <BookOpen size={18} />;
      case 'Lab': return <Monitor size={18} />;
      case 'Meeting Room': return <Users size={18} />;
      case 'Equipment': return <Mic2 size={18} />;
      default: return <Box size={18} />;
    }
  };

  return (
    <div className="facilities-container" style={{ background: '#fff', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* Breadcrumbs */}
      <div className="container" style={{ paddingBottom: '1rem', paddingTop: '1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', opacity: 0.7 }}>Home</Link>
          <ChevronRight size={12} strokeWidth={3} />
          <span>Campus Facilities</span>
        </nav>
      </div>

      {/* Hero Section with Integrated Search */}
      <section style={{ 
        position: 'relative', 
        height: '45vh', 
        minHeight: '400px', 
        width: '100%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <img 
          src={facilitiesHero} 
          alt="Facilities Hero" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 58, 138, 0.4))', 
          zIndex: 2 
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ 
            fontSize: '4.5rem', 
            fontFamily: "'Outfit', sans-serif", 
            fontWeight: '800', 
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem'
          }}>Smart Resource Network</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Book equipment, reserve lecture halls, and explore specialized campus spaces in one unified hub.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={24} />
            <input 
              type="text" 
              placeholder="Search by facility name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '1.5rem 1.5rem 1.5rem 4rem', borderRadius: '1.5rem', border: 'none', background: '#fff', fontSize: '1.1rem', color: '#0f172a', outline: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingBottom: '100px' }}>
        
        {/* Category Pills & Admin Toggle */}
        <div className="flex justify-between items-center mb-10">
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '0.6rem 1.5rem', 
                  borderRadius: '99px', 
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--primary)' : 'rgba(15, 23, 42, 0.1)',
                  background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setActiveTab(activeTab === 'browse' ? 'admin' : 'browse')}
            className="btn btn-outline" 
            style={{ borderRadius: '12px', fontSize: '0.9rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {activeTab === 'browse' ? <Settings size={18} /> : <ArrowLeft size={18} />}
            {activeTab === 'browse' ? 'Member Console' : 'Back to Gallery'}
          </button>
        </div>

        {activeTab === 'browse' ? (
          /* Facility Gallery */
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loading-spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                <p className="text-muted">Orchestrating resources...</p>
              </div>
            ) : filteredFacilities.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
                {filteredFacilities.map(fac => (
                  <div key={fac.id} className="glass card-hover" style={{ borderRadius: '2.5rem', overflow: 'hidden', border: '1px solid rgba(15, 23, 42, 0.05)', background: '#fff', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)' }}>
                    <div style={{ position: 'relative', height: '220px' }}>
                      <img 
                        src={fac.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c"} 
                        alt={fac.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255, 255, 255, 0.9)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(10px)' }}>
                         {getIcon(fac.type)} {fac.type}
                      </div>
                      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: fac.status === 'ACTIVE' ? '#10b981' : '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                        {fac.status === 'ACTIVE' ? 'AVAILABLE' : 'MAINTENANCE'}
                      </div>
                    </div>
                    
                    <div style={{ padding: '2rem' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>{fac.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <MapPin size={16} /> {fac.location}
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {fac.description || "No description provided for this campus resource."}
                      </p>
                      
                      <div className="flex justify-between items-center" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-primary" />
                          <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{fac.capacity}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Capacity</span>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                          Reserve Space
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <Info size={48} className="text-muted mx-auto mb-4" style={{ opacity: 0.3 }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>No facilities found</h3>
                <p className="text-muted">Try adjusting your search filters or categories.</p>
              </div>
            )}
          </div>
        ) : (
          /* Admin View (Split with Sidebar-like control) */
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
            <div className="glass p-8" style={{ height: 'fit-content', borderRadius: '2rem', background: '#f8fafc', border: 'none' }}>
              <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Admin Metrics</h4>
              <div className="flex flex-col gap-4">
                <div className="glass p-5" style={{ background: '#fff', borderRadius: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL UNITS</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{facilities.length}</div>
                </div>
                <div className="glass p-5" style={{ background: '#fff', borderRadius: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '700' }}>ACTIVE NOW</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{facilities.filter(f => f.status === 'ACTIVE').length}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Register New Facility</h2>
              <p className="text-muted mb-8">Deploy new operational nodes to the campus network.</p>
              
              <form onSubmit={handleSubmit} className="glass p-10" style={{ borderRadius: '2.5rem', background: '#fff', border: '1px solid rgba(15, 23, 42, 0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>FACILITY NAME</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. Innovation Hall A"
                            style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>RESOURCE TYPE</label>
                        <select 
                            style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option>Lecture Hall</option>
                            <option>Lab</option>
                            <option>Meeting Room</option>
                            <option>Studios</option>
                            <option>Equipment</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>CAPACITY (PEOPLE/UNITS)</label>
                        <input 
                            required
                            type="number" 
                            style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                            value={formData.capacity}
                            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>CAMPUS LOCATION</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. West Wing, Floor 2"
                            style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none' }}
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>RESOURCE DESCRIPTION</label>
                    <textarea 
                        style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', minHeight: '120px', resize: 'none' }}
                        value={formData.description}
                        placeholder="Detail the technical specs or room features..."
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', fontSize: '1rem', fontWeight: '800' }}>
                    {submitting ? 'Registering node...' : 'Register Facility'}
                </button>

                {successMsg && (
                    <div className="animate-fade-in mt-6" style={{ padding: '1rem', background: '#dcfce7', color: '#15803d', borderRadius: '14px', textAlign: 'center', fontWeight: '700' }}>
                        {successMsg}
                    </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 40px 80px rgba(15, 23, 42, 0.12) !important;
        }
      `}</style>
    </div>
  );
};

export default FacilitiesPage;
