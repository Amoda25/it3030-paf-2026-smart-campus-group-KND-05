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
  MoreVertical,
  Activity,
  Package,
  Clock,
  ArrowUpRight,
  ClipboardList,
  Building2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FacilitiesPage = () => {
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'inventory', 'add'
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
        setTimeout(() => {
          setSuccessMsg('');
          setActiveView('inventory');
        }, 2000);
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

  // Sidebar Items
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <Activity size={20} /> },
    { id: 'inventory', label: 'Assets Inventory', icon: <Package size={20} /> },
    { id: 'add', label: 'Add New Facility', icon: <PlusCircle size={20} /> },
    { id: 'maintenance', label: 'Maintenance Log', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="facilities-dashboard" style={{ 
      background: '#f8fafc', 
      minHeight: '100vh', 
      paddingTop: '80px',
      display: 'flex'
    }}>
      {/* Sidebar Navigation */}
      <aside style={{ 
        width: '280px', 
        height: 'calc(100vh - 80px)', 
        position: 'fixed', 
        left: 0, 
        top: '80px', 
        background: '#fff', 
        borderRight: '1px solid rgba(0,0,0,0.05)',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', paddingLeft: '0.75rem' }}>
            Resource Control
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeView === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: activeView === item.id ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: activeView === item.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon}
                {item.label}
                {activeView === item.id && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', color: '#fff' }}>
             <ShieldCheck size={24} style={{ marginBottom: '1rem' }} />
             <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Admin Status</div>
             <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>System Operations Mode Active</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        marginLeft: '280px', 
        padding: '2.5rem 3rem',
        minWidth: 0 // Prevents grid blowout
      }}>
        
        {/* Dynamic Header */}
        <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {activeView === 'overview' && 'Facilities Overview'}
              {activeView === 'inventory' && 'Asset Inventory'}
              {activeView === 'add' && 'Facility Registration'}
              {activeView === 'maintenance' && 'Maintenance Log'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {activeView === 'overview' && 'Monitor and manage campus resources in real-time.'}
              {activeView === 'inventory' && 'Search and browse through all registered campus assets.'}
              {activeView === 'add' && 'Deploy new operational nodes to the campus network.'}
              {activeView === 'maintenance' && 'Track and schedule facility maintenance cycles.'}
            </p>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
             {activeView === 'inventory' && (
               <div style={{ position: 'relative', width: '300px' }}>
                 <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                 <input 
                   type="text" 
                   placeholder="Search assets..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   style={{ 
                     width: '100%', 
                     padding: '0.75rem 1rem 0.75rem 2.5rem', 
                     borderRadius: '12px', 
                     border: '1px solid rgba(0,0,0,0.05)', 
                     background: '#fff',
                     outline: 'none',
                     fontSize: '0.9rem'
                   }}
                 />
               </div>
             )}
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '12px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <Clock size={16} className="text-primary" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{new Date().toLocaleDateString()}</span>
             </div>
          </div>
        </header>

        {/* Content Views */}
        <div className="animate-fade-in">
          {activeView === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Total Facilities', value: facilities.length, icon: <Building2 className="text-primary" />, trend: '+2 this month' },
                  { label: 'Active Assets', value: facilities.filter(f => f.status === 'ACTIVE').length, icon: <Zap style={{ color: '#10b981' }} />, trend: '100% Uptime' },
                  { label: 'Maintenance', value: facilities.filter(f => f.status !== 'ACTIVE').length, icon: <Settings style={{ color: '#f59e0b' }} />, trend: '2 Pending' },
                  { label: 'Utilization', value: '84%', icon: <PieChart style={{ color: '#8b5cf6' }} />, trend: 'High demand' },
                ].map((stat, i) => (
                  <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {stat.icon}
                       </div>
                       <ArrowUpRight size={18} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                    <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: stat.trend.includes('+') || stat.trend.includes('100%') ? '#10b981' : 'var(--text-muted)', fontWeight: '700' }}>
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Layout Content Bottom */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="flex justify-between items-center mb-8">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Recent Assets</h3>
                    <button onClick={() => setActiveView('inventory')} className="text-primary" style={{ background: 'none', border: 'none', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>View All</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {facilities.slice(0, 4).map(fac => (
                      <div key={fac.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', background: '#f8fafc' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {getIcon(fac.type)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{fac.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fac.type} • {fac.location}</div>
                        </div>
                        <div style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '800', background: fac.status === 'ACTIVE' ? '#dcfce7' : '#fef3c7', color: fac.status === 'ACTIVE' ? '#15803d' : '#92400e' }}>
                          {fac.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: '#fff' }}>
                  <TrendingUp size={32} style={{ marginBottom: '1.5rem', color: 'var(--primary)' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem' }}>Upgrade System</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
                    Access advanced asset tracking and predictive maintenance features with our premium module pack.
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%', borderRadius: '12px' }}>Explore Pro Features</button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'inventory' && (
            <div>
              {/* Category Filter */}
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '1rem' }}>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{ 
                      padding: '0.6rem 1.25rem', 
                      borderRadius: '10px', 
                      border: '1px solid',
                      borderColor: selectedCategory === cat ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                      background: selectedCategory === cat ? 'var(--primary)' : '#fff',
                      color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                  <div className="loading-spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                  <p className="text-muted">Orchestrating resources...</p>
                </div>
              ) : filteredFacilities.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {filteredFacilities.map(fac => (
                    <div key={fac.id} className="glass card-hover" style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)', background: '#fff' }}>
                      <div style={{ position: 'relative', height: '180px' }}>
                        <img 
                          src={fac.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c"} 
                          alt={fac.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255, 255, 255, 0.9)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                           {getIcon(fac.type)} {fac.type}
                        </div>
                      </div>
                      
                      <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.25rem', color: '#0f172a' }}>{fac.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.8rem' }}>
                          <MapPin size={14} /> {fac.location}
                        </div>
                        
                        <div className="flex justify-between items-center" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary" />
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{fac.capacity}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Capacity</span>
                          </div>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: fac.status === 'ACTIVE' ? '#10b981' : '#f59e0b' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '2rem' }}>
                  <Info size={48} className="text-muted mx-auto mb-4" style={{ opacity: 0.3 }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>No facilities found</h3>
                  <p className="text-muted">Try adjusting your search filters or categories.</p>
                </div>
              )}
            </div>
          )}

          {activeView === 'add' && (
            <div style={{ maxWidth: '900px' }}>
              <form onSubmit={handleSubmit} className="glass p-10" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>FACILITY NAME</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. Innovation Hall A"
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>RESOURCE TYPE</label>
                        <select 
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
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
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>CAPACITY (PEOPLE/UNITS)</label>
                        <input 
                            required
                            type="number" 
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.capacity}
                            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>CAMPUS LOCATION</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. West Wing, Floor 2"
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>RESOURCE DESCRIPTION</label>
                    <textarea 
                        style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', minHeight: '100px', resize: 'none', fontSize: '0.9rem' }}
                        value={formData.description}
                        placeholder="Detail the technical specs or room features..."
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '800' }}>
                    {submitting ? 'Registering node...' : 'Register Facility'}
                </button>

                {successMsg && (
                    <div className="animate-fade-in mt-6" style={{ padding: '1rem', background: '#dcfce7', color: '#15803d', borderRadius: '10px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                        {successMsg}
                    </div>
                )}
              </form>
            </div>
          )}

          {activeView === 'maintenance' && (
            <div className="glass" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Scheduled Maintenance</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <div style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 'bold' }}>3 ACTIVE</div>
                   <div style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.1)', color: '#92400e', fontSize: '0.75rem', fontWeight: 'bold' }}>1 PENDING</div>
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                      <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Asset</th>
                      <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Issue Type</th>
                      <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Serviced</th>
                      <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '1rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { asset: 'Innovation Lab A', issue: 'Network Reset', date: '2026-04-10', status: 'In Progress' },
                      { asset: 'Lecture Theatre 02', issue: 'Projector Service', date: '2026-03-25', status: 'Pending' },
                      { asset: 'Level 4 Server Room', issue: 'AC Maintenance', date: '2026-04-18', status: 'In Progress' },
                    ].map((log, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                         <td style={{ padding: '1.25rem 0.5rem', fontSize: '0.9rem', fontWeight: '700' }}>{log.asset}</td>
                         <td style={{ padding: '1.25rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.issue}</td>
                         <td style={{ padding: '1.25rem 0.5rem', fontSize: '0.85rem' }}>{log.date}</td>
                         <td style={{ padding: '1.25rem 0.5rem' }}>
                           <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold', background: log.status === 'Pending' ? '#fef3c7' : '#dbeafe', color: log.status === 'Pending' ? '#92400e' : '#1e40af' }}>
                             {log.status}
                           </span>
                         </td>
                         <td style={{ padding: '1.25rem 0.5rem' }}>
                           <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}>Details</button>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
};

export default FacilitiesPage;

