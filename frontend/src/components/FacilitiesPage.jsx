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
  Zap,
  Dumbbell,
  CheckCircle2,
  AlertCircle
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
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Facility name is required";
    else if (formData.name.length < 3) newErrors.name = "Facility name must be at least 3 characters long";
    
    if (!formData.capacity) newErrors.capacity = "Capacity is required";
    else if (formData.capacity < 0) newErrors.capacity = "Capacity cannot be negative";
    else if (formData.capacity == 0) newErrors.capacity = "Capacity must be greater than 0";
    
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.imageUrl && !formData.imageUrl.startsWith('http')) newErrors.imageUrl = "Please enter a valid URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    let newErrors = { ...errors };
    
    if (field === 'capacity') {
      if (value < 0) newErrors.capacity = "Negative values are not allowed";
      else if (value == 0) newErrors.capacity = "Capacity must be greater than 0";
      else delete newErrors.capacity;
    } else if (errors[field]) {
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/facilities');
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
    console.log("Submit button clicked", formData);
    if (!validateForm()) {
      alert("Please fix the errors in the form first.");
      return;
    }
    
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        availabilityWindows: ["08:00-17:00"] // Default availability as expected by backend
      };
      
      const response = await fetch('http://localhost:8081/api/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("🎉 Success! Facility registered correctly.");
        setShowSuccessModal(true);
        setFormData({ 
          name: '', 
          type: 'Lecture Hall', 
          capacity: '', 
          location: '', 
          status: 'ACTIVE', 
          description: '', 
          imageUrl: '' 
        });
        setErrors({});
        fetchFacilities();
        setTimeout(() => {
          setShowSuccessModal(false);
          setActiveView('inventory');
        }, 5000);
      } else {
        let errorMessage = 'Failed to register facility';
        try {
          const errorText = await response.text();
          if (errorText) errorMessage = errorText;
        } catch (e) { }
        alert("❌ Failed to register: " + errorMessage);
      }
    } catch (error) {
      console.error('Error adding facility:', error);
      alert("CRITICAL ERROR: " + error.message + "\n\n1. Ensure your backend is running on port 8081.");
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', 'Lecture Hall', 'Lab', 'Gym', 'Meeting Room', 'Studios', 'Equipment'];

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
      case 'Gym': return <Dumbbell size={18} />;
      case 'Meeting Room': return <Users size={18} />;
      case 'Equipment': return <Mic2 size={18} />;
      case 'Studios': return <Camera size={18} />;
      default: return <Box size={18} />;
    }
  };

  const getDefaultImage = (type) => {
    switch (type) {
      case 'Gym': return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop";
      case 'Lecture Hall': return "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop";
      case 'Lab': return "https://images.unsplash.com/photo-1581091226875-a30884e7e17c?q=80&w=2070&auto=format&fit=crop";
      case 'Meeting Room': return "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop";
      case 'Studios': return "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop";
      default: return "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop";
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
      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="glass" style={{
            background: '#fff',
            padding: '3rem',
            borderRadius: '2.5rem',
            textAlign: 'center',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: 'scale(1)',
            animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#dcfce7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#10b981'
            }}>
              <ShieldCheck size={40} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>Success!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              The new facility has been successfully registered and is now live on the campus network.
            </p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setActiveView('inventory');
              }}
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: '15px', padding: '1rem', fontWeight: '700', cursor: 'pointer' }}
            >
              Back to Inventory
            </button>
          </div>
        </div>
      )}
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
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: '900', 
            color: 'var(--primary)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.12em', 
            marginBottom: '1.5rem', 
            paddingLeft: '0.75rem',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '4px', height: '14px', background: 'var(--primary)', borderRadius: '2px' }}></div>

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
                  { label: 'Total Facilities', value: facilities.length, icon: <Building2 size={24} style={{ color: '#3b82f6' }} />, trend: '+2 this month', gradient: 'linear-gradient(135deg, #fff 0%, #eff6ff 100%)' },
                  { label: 'Active Assets', value: facilities.filter(f => f.status === 'ACTIVE').length, icon: <Zap size={24} style={{ color: '#10b981' }} />, trend: '100% Uptime', gradient: 'linear-gradient(135deg, #fff 0%, #ecfdf5 100%)' },
                  { label: 'Maintenance', value: facilities.filter(f => f.status !== 'ACTIVE').length, icon: <Settings size={24} style={{ color: '#f59e0b' }} />, trend: '2 Pending', gradient: 'linear-gradient(135deg, #fff 0%, #fffbeb 100%)' },
                  { label: 'System Health', value: '98.2%', icon: <Activity size={24} style={{ color: '#8b5cf6' }} />, trend: 'Optimal', gradient: 'linear-gradient(135deg, #fff 0%, #f5f3ff 100%)' },
                ].map((stat, i) => (
                  <div key={i} className="glass card-hover" style={{ 
                    padding: '2rem', 
                    borderRadius: '2rem', 
                    background: stat.gradient, 
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                         {stat.icon}
                       </div>
                       <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>
                         REAL-TIME
                       </div>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.25rem', color: '#0f172a', letterSpacing: '-1px' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '70%', height: '100%', borderRadius: '2px', background: stat.trend.includes('+') || stat.trend.includes('100%') || stat.trend === 'Optimal' ? '#10b981' : '#f59e0b' }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: stat.trend.includes('+') || stat.trend.includes('100%') || stat.trend === 'Optimal' ? '#059669' : '#b45309', fontWeight: '800' }}>
                        {stat.trend}
                      </span>
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
                    <div key={fac.id} className="glass card-hover" style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)', background: '#fff', position: 'relative' }}>
                      <div style={{ position: 'relative', height: '200px' }}>
                        <img 
                          src={fac.imageUrl || getDefaultImage(fac.type)} 
                          alt={fac.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255, 255, 255, 0.95)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                           {getIcon(fac.type)} {fac.type}
                        </div>
                        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                           <button className="glass" style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', border: 'none' }}>
                             <MoreVertical size={18} />
                           </button>
                        </div>
                      </div>
                      
                      <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>{fac.name}</h3>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: fac.status === 'ACTIVE' ? '#10b981' : '#f59e0b', marginTop: '6px' }}></div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                          <MapPin size={14} /> {fac.location}
                        </div>
                        
                        <div className="flex justify-between items-center" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                          <div className="flex items-center gap-3">
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Users size={16} className="text-primary" />
                            </div>
                            <div>
                               <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0f172a' }}>{fac.capacity}</div>
                               <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Capacity</div>
                            </div>
                          </div>
                          
                          <button style={{ 
                            padding: '6px 12px', 
                            borderRadius: '8px', 
                            background: '#f8fafc', 
                            border: '1px solid #e2e8f0', 
                            fontSize: '0.75rem', 
                            fontWeight: '700', 
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                          }}>
                            Details
                          </button>
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
<<<<<<< HEAD
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem' }}>
              <div className="glass" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '2.5rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Resource Registration</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fill in the specifications to deploy a new campus asset.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="flex flex-col gap-2">
                       <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>FACILITY NAME</label>
                       <div style={{ position: 'relative' }}>
                          <Info size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.5 }} />
                          <input 
                              type="text" 
                              placeholder="e.g. Spartan Gym Cluster"
                              style={{ 
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 2.5rem', 
                                borderRadius: '12px', 
                                border: errors.name ? '2px solid #ef4444' : '1px solid #e2e8f0', 
                                background: '#f8fafc', 
                                outline: 'none', 
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease'
                              }}
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       {errors.name && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>RESOURCE TYPE</label>
                        <div style={{ position: 'relative' }}>
                          <Box size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.5 }} />
                          <select 
                              style={{ 
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 2.5rem', 
                                borderRadius: '12px', 
                                border: '1px solid #e2e8f0', 
                                background: '#f8fafc', 
                                outline: 'none', 
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                              }}
                              value={formData.type}
                              onChange={(e) => setFormData({...formData, type: e.target.value})}
                          >
                              <option>Lecture Hall</option>
                              <option>Lab</option>
                              <option>Gym</option>
                              <option>Meeting Room</option>
                              <option>Studios</option>
                              <option>Equipment</option>
                          </select>
                        </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>MAX CAPACITY</label>
                        <div style={{ position: 'relative' }}>
                          <Users size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.5 }} />
                          <input 
                              type="number" 
                              placeholder="0"
                              style={{ 
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 2.5rem', 
                                borderRadius: '12px', 
                                border: errors.capacity ? '2px solid #ef4444' : '1px solid #e2e8f0', 
                                background: '#f8fafc', 
                                outline: 'none', 
                                fontSize: '0.9rem'
                              }}
                              value={formData.capacity}
                              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                          />
                        </div>
                        {errors.capacity && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.capacity}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>CAMPUS LOCATION</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.5 }} />
                          <input 
                              type="text" 
                              placeholder="e.g. Sports Complex, Level 2"
                              style={{ 
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 2.5rem', 
                                borderRadius: '12px', 
                                border: errors.location ? '2px solid #ef4444' : '1px solid #e2e8f0', 
                                background: '#f8fafc', 
                                outline: 'none', 
                                fontSize: '0.9rem'
                              }}
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                          />
                        </div>
                        {errors.location && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.location}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>IMAGE RESOURCE LINK (OPTIONAL)</label>
                    <div style={{ position: 'relative' }}>
                      <Globe size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.5 }} />
                      <input 
                          type="text" 
                          placeholder="https://images.unsplash.com/photo-..."
                          style={{ 
                            width: '100%',
                            padding: '0.85rem 1rem 0.85rem 2.5rem', 
                            borderRadius: '12px', 
                            border: '1px solid #e2e8f0', 
                            background: '#f8fafc', 
                            outline: 'none', 
                            fontSize: '0.9rem'
                          }}
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>TECHNICAL DESCRIPTION</label>
                    <textarea 
                        style={{ 
                          padding: '1rem', 
                          borderRadius: '12px', 
                          border: errors.description ? '2px solid #ef4444' : '1px solid #e2e8f0', 
                          background: '#f8fafc', 
                          outline: 'none', 
                          minHeight: '120px', 
                          resize: 'none', 
                          fontSize: '0.9rem' 
                        }}
                        value={formData.description}
                        placeholder="Detail the technical specs, amenities, or special equipment available..."
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    {errors.description && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.description}</span>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="btn btn-primary" 
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      borderRadius: '16px', 
                      fontSize: '1rem', 
                      fontWeight: '800',
                      marginTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></div>
                        Deploying Asset...
                      </>
                    ) : (
                      <>
                        <Zap size={20} /> Deploy Facility
                      </>
                    )}
                  </button>

                  {successMsg && (
                      <div className="animate-fade-in mt-6" style={{ padding: '1rem', background: '#ecfdf5', color: '#059669', borderRadius: '12px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid #10b981' }}>
                          <CheckCircle2 size={18} /> {successMsg}
                      </div>
                  )}
                </form>
              </div>

              {/* Live Preview Side */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ padding: '1rem 0' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>VIRTUAL TWIN PREVIEW</h4>
                    <div className="glass card-hover" style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)', background: '#fff', opacity: formData.name ? 1 : 0.5, transition: 'opacity 0.3s ease' }}>
                        <div style={{ position: 'relative', height: '200px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                            <img 
                              src={formData.imageUrl || getDefaultImage(formData.type)} 
                              alt="Background" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                            />
                          </div>
                          <div style={{ position: 'relative', zIndex: 1, color: '#fff', textAlign: 'center' }}>
                             {getIcon(formData.type)}
                             <div style={{ fontSize: '0.75rem', fontWeight: '700', marginTop: '0.5rem', opacity: 0.8 }}>SYSTEM RENDERING</div>
                          </div>
                          <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                             {formData.type}
                          </div>
                        </div>
                        
                        <div style={{ padding: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>{formData.name || "Untitled Facility"}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                            <MapPin size={16} /> {formData.location || "Assign a location"}
                          </div>
                          
                          <div className="flex justify-between items-center" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                            <div className="flex items-center gap-3">
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Users size={16} className="text-primary" />
                              </div>
                              <div>
                                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#1e293b' }}>{formData.capacity || "0"}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase' }}>Allowed Node Usage</div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)' }}></div>
                               <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#10b981' }}>SYSTEM ONLINE</span>
                            </div>
                          </div>
                        </div>
                    </div>
                 </div>

                 <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: '#fff', border: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                       <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <AlertCircle size={20} className="text-primary" />
                       </div>
                       <div style={{ fontWeight: '700', fontSize: '1rem' }}>Registration Protocol</div>
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.6 }}>
                       All new facilities must undergo a safety certification before operational activation. Deploying a node here will trigger a maintenance review cycle.
                    </p>
                 </div>
              </div>
=======
            <div style={{ maxWidth: '900px' }}>
              <form onSubmit={handleSubmit} className="glass p-10" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>FACILITY NAME</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Innovation Hall A"
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: errors.name ? '1px solid #ef4444' : '1px solid #ebeef2', background: errors.name ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>RESOURCE TYPE</label>
                        <select 
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #ebeef2', background: '#f8fafc', outline: 'none', fontSize: '0.9rem', height: '46px' }}
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
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
                            type="number" 
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: errors.capacity ? '1px solid #ef4444' : '1px solid #ebeef2', background: errors.capacity ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.capacity}
                            onChange={(e) => handleInputChange('capacity', e.target.value)}
                        />
                        {errors.capacity && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.capacity}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>CAMPUS LOCATION</label>
                        <input 
                            type="text" 
                            placeholder="e.g. West Wing, Floor 2"
                            style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: errors.location ? '1px solid #ef4444' : '1px solid #ebeef2', background: errors.location ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                        {errors.location && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.location}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>FACILITY IMAGE URL</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input 
                            type="text" 
                            placeholder="https://images.unsplash.com/..."
                            style={{ flex: 1, padding: '0.85rem 1rem', borderRadius: '10px', border: errors.imageUrl ? '1px solid #ef4444' : '1px solid #ebeef2', background: errors.imageUrl ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                            value={formData.imageUrl}
                            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        />
                        {formData.imageUrl && (
                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ebeef2' }}>
                                <img src={formData.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>
                    {errors.imageUrl && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.imageUrl}</span>}
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Provide a direct link to an image (Unsplash, Imgur, etc.)</p>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>RESOURCE DESCRIPTION</label>
                    <textarea 
                        style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: errors.description ? '1px solid #ef4444' : '1px solid #ebeef2', background: errors.description ? '#fef2f2' : '#f8fafc', outline: 'none', minHeight: '100px', resize: 'none', fontSize: '0.9rem' }}
                        value={formData.description}
                        placeholder="Detail the technical specs or room features..."
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    {errors.description && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.description}</span>}
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '800' }}>
                    {submitting ? 'Registering node...' : 'Register Facility'}
                </button>
              </form>
>>>>>>> Amo/dashboard
            </div>
          )}

          {activeView === 'maintenance' && (
            <div className="glass animate-fade-in" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, #fff, #f8fafc)' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>Maintenance Protocol Log</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Real-time monitoring of campus asset health and service cycles.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                   <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div> 3 ACTIVE
                   </div>
                   <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.1)', color: '#b45309', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></div> 1 PENDING
                   </div>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem 2.5rem 2.5rem 2.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left' }}>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Asset Node</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Service Type</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Cycle Date</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Operations Status</th>
                      <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Trace</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { asset: 'Innovation Lab A', type: 'Lab', issue: 'Network Optimization', date: '2026-04-20', status: 'In Progress', priority: 'High' },
                      { asset: 'Spartan Gym Cluster', type: 'Gym', issue: 'Equipment Calibration', date: '2026-04-19', status: 'Pending', priority: 'Medium' },
                      { asset: 'Lecture Theatre 02', type: 'Lecture Hall', issue: 'Optics Service', date: '2026-04-15', status: 'Completed', priority: 'Low' },
                      { asset: 'Level 4 Server Room', type: 'Equipment', issue: 'Thermal Review', date: '2026-04-18', status: 'In Progress', priority: 'Critical' },
                    ].map((log, i) => (
                      <tr key={i} className="card-hover" style={{ background: '#f8fafc', borderRadius: '12px' }}>
                         <td style={{ padding: '1.25rem 1rem', borderRadius: '12px 0 0 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                               <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                 {getIcon(log.type)}
                               </div>
                               <div>
                                 <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#1e293b' }}>{log.asset}</div>
                                 <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>ID: RES-882{i}</div>
                               </div>
                            </div>
                         </td>
                         <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                               <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>{log.issue}</span>
                               <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>System Routine</span>
                            </div>
                         </td>
                         <td style={{ padding: '1.25rem 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>{log.date}</td>
                         <td style={{ padding: '1.25rem 1rem' }}>
                           <span style={{ 
                             padding: '6px 12px', 
                             borderRadius: '8px', 
                             fontSize: '0.7rem', 
                             fontWeight: '800', 
                             background: log.status === 'Pending' ? '#fffbeb' : log.status === 'In Progress' ? '#eff6ff' : '#ecfdf5', 
                             color: log.status === 'Pending' ? '#92400e' : log.status === 'In Progress' ? '#1e40af' : '#047857',
                             display: 'inline-flex',
                             alignItems: 'center',
                             gap: '6px'
                           }}>
                             <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                             {log.status.toUpperCase()}
                           </span>
                         </td>
                         <td style={{ padding: '1.25rem 1rem', borderRadius: '0 12px 12px 0' }}>
                           <button style={{ color: 'var(--primary)', background: '#fff', border: '1px solid #e2e8f0', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                             DETAILS
                           </button>
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
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FacilitiesPage;

