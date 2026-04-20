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
  Box
} from 'lucide-react';

const FacilitiesPage = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
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
        setSuccessMsg('Facility added successfully!');
        setFormData({ name: '', type: 'Lecture Hall', capacity: '', location: '', status: 'ACTIVE', description: '', imageUrl: '' });
        fetchFacilities();
        setTimeout(() => {
          setSuccessMsg('');
          setActiveTab('inventory');
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding facility:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Lecture Hall': return <BookOpen size={18} />;
      case 'Lab': return <Cpu size={18} />;
      case 'Equipment': return <Camera size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', paddingTop: '80px' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', position: 'fixed', height: 'calc(100vh - 80px)', left: 0, zIndex: 10 }}>
        <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Member 1 Workspace</span>
            <h2 style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>Assets & Facilities</h2>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className="btn" 
            style={{ 
                justifyContent: 'flex-start', 
                background: activeTab === 'overview' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === 'overview' ? 'var(--primary)' : '#64748b',
                border: 'none',
                padding: '0.75rem 1rem'
            }}
          >
            <PieChart size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className="btn" 
            style={{ 
                justifyContent: 'flex-start', 
                background: activeTab === 'inventory' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === 'inventory' ? 'var(--primary)' : '#64748b',
                border: 'none',
                padding: '0.75rem 1rem'
            }}
          >
            <Box size={20} /> Inventory List
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className="btn" 
            style={{ 
                justifyContent: 'flex-start', 
                background: activeTab === 'add' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === 'add' ? 'var(--primary)' : '#64748b',
                border: 'none',
                padding: '0.75rem 1rem'
            }}
          >
            <PlusCircle size={20} /> Add New Facility
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem', background: '#f1f5f9', borderRadius: '12px' }}>
            <div className="flex items-center gap-3">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>System Active</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>Last sync: just now</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '2.5rem' }}>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Dashboard Overview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>Total Resources</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem' }}>{facilities.length}</div>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>Active Assets</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', color: '#10b981' }}>
                        {facilities.filter(f => f.status === 'ACTIVE').length}
                    </div>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>In Maintenance</span>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', color: '#f59e0b' }}>
                        {facilities.filter(f => f.status === 'OUT_OF_SERVICE').length}
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 style={{ fontSize: '2.5rem' }}>Resource Inventory</h1>
                <p style={{ color: '#64748b' }}>Manage your campus lecture halls, labs, and assets.</p>
              </div>
              <button onClick={() => setActiveTab('add')} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                <Plus size={20} /> Add New Facility
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {facilities.map(fac => (
                  <div key={fac.id} className="glass" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <div style={{ height: '140px', background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${fac.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c'})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '1.5rem', display: 'flex', alignItems: 'flex-end' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '6px', background: 'white', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase' }}>{fac.type}</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{fac.name}</h3>
                      <div className="flex items-center gap-2 mb-4" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        <MapPin size={14} /> {fac.location}
                      </div>
                      <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.85rem', color: fac.status === 'ACTIVE' ? '#10b981' : '#f59e0b', fontWeight: '700' }}>
                            {fac.status === 'ACTIVE' ? 'Online' : 'Restricted'}
                        </span>
                        <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Edit Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Facility Tab */}
        {activeTab === 'add' && (
          <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
            <button onClick={() => setActiveTab('inventory')} className="btn btn-outline mb-6" style={{ border: 'none', padding: 0 }}>
               <ArrowLeft size={18} /> Back to List
            </button>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Add New Resource</h1>
            <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>Fill in the details below to register a new campus facility or equipment.</p>

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Facility Name</label>
                        <input 
                            required
                            type="text" 
                            className="btn btn-outline" 
                            style={{ background: 'white', textAlign: 'left', fontWeight: '400' }}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Type</label>
                        <select 
                            className="btn btn-outline"
                            style={{ background: 'white', textAlign: 'left', fontWeight: '400' }}
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option>Lecture Hall</option>
                            <option>Lab</option>
                            <option>Meeting Room</option>
                            <option>Equipment</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Capacity</label>
                        <input 
                            required
                            type="number" 
                            className="btn btn-outline" 
                            style={{ background: 'white', textAlign: 'left', fontWeight: '400' }}
                            value={formData.capacity}
                            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Location</label>
                        <input 
                            required
                            type="text" 
                            className="btn btn-outline" 
                            style={{ background: 'white', textAlign: 'left', fontWeight: '400' }}
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Status</label>
                        <select 
                            className="btn btn-outline"
                            style={{ background: 'white', textAlign: 'left', fontWeight: '400' }}
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="ACTIVE">Active / Available</option>
                            <option value="OUT_OF_SERVICE">Out of Service / Maintenance</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Image URL (Optional)</label>
                        <input 
                            type="text" 
                            className="btn btn-outline" 
                            style={{ background: 'white', textAlign: 'left', fontWeight: '400' }}
                            value={formData.imageUrl}
                            placeholder="https://images.unsplash.com/..."
                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Description</label>
                    <textarea 
                        className="btn btn-outline" 
                        style={{ background: 'white', textAlign: 'left', fontWeight: '400', minHeight: '100px', padding: '1rem' }}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    {submitting ? 'Registering...' : 'Register Facility'}
                </button>

                {successMsg && (
                    <div className="animate-fade-in mt-4" style={{ padding: '1rem', background: '#dcfce7', color: '#15803d', borderRadius: '12px', textAlign: 'center', fontWeight: '600' }}>
                        {successMsg}
                    </div>
                )}
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default FacilitiesPage;
