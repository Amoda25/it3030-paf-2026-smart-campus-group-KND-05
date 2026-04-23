import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Users, 
  BookOpen, 
  Monitor, 
  Mic2, 
  Box, 
  Star, 
  ArrowRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/facilities');
      const data = await response.json();
      // Filter only active facilities for public view
      setFacilities(data.filter(f => f.status === 'ACTIVE'));
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
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
      case 'Lecture Hall': return <BookOpen size={20} />;
      case 'Lab': return <Monitor size={20} />;
      case 'Meeting Room': return <Users size={20} />;
      case 'Equipment': return <Mic2 size={20} />;
      default: return <Box size={20} />;
    }
  };

  return (
    <div style={{ padding: '140px 0 100px 0', minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col md-flex-row justify-between items-start md-items-end mb-12 gap-6">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Sparkles size={18} />
                Campus Resources
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.04em' }}>
                Explore <span className="gradient-text">Facilities</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px' }}>
              Discover and book world-class learning spaces and state-of-the-art equipment across our campus.
            </p>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1.2rem 1.5rem 1.2rem 3.5rem', 
                borderRadius: '20px', 
                border: '1px solid rgba(0,0,0,0.05)', 
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '2rem', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'glass'}`}
              style={{ 
                padding: '0.8rem 1.5rem', 
                borderRadius: '15px', 
                whiteSpace: 'nowrap',
                fontWeight: '700',
                fontSize: '0.9rem',
                border: selectedCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.05)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="loading-spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Loading available resources...</p>
          </div>
        ) : filteredFacilities.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {filteredFacilities.map(fac => (
              <div key={fac.id} className="feature-card glass animate-fade-in" style={{ padding: 0, overflow: 'hidden', borderRadius: '30px' }}>
                <div style={{ height: '250px', position: 'relative' }}>
                  <img 
                    src={fac.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c"} 
                    alt={fac.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '0.6rem 1.2rem', borderRadius: '14px', fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                     {getIcon(fac.type)} {fac.type}
                  </div>
                </div>
                
                <div style={{ padding: '2.5rem' }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>{fac.name}</h3>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800' }}>AVAILABLE</div>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                      <MapPin size={18} className="text-primary" />
                      <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{fac.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                      <Users size={18} className="text-primary" />
                      <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{fac.capacity} Capacity</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {fac.description || "Premium campus space equipped with modern amenities for an enhanced learning experience."}
                  </p>
                  
                  <div className="flex gap-4">
                    <Link to="/book" state={{ resourceType: fac.type, resourceName: fac.name }} className="btn btn-primary" style={{ flex: 1, padding: '1rem', borderRadius: '15px', fontWeight: '800' }}>
                        Book Now
                    </Link>
                    <button className="btn glass" style={{ width: '54px', height: '54px', padding: 0, borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '120px 20px', background: '#fff', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.02)' }}>
            <Box size={80} style={{ margin: '0 auto 2rem', color: 'var(--text-muted)', opacity: 0.2 }} />
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>No facilities match your search</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
              We couldn't find any resources matching your current filters. Try adjusting your search term or category.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UserFacilities;
