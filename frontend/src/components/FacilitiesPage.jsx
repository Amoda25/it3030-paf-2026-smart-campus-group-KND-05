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
  Tag,
  AlignLeft,
  Image as ImageIcon,
  FileText,
  Dumbbell,
  CheckCircle2,
  AlertCircle,
  Inbox,
  XCircle,
  User
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
  const [bookings, setBookings] = useState([]);
  const [fetchingBookings, setFetchingBookings] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Facility name is required";
    else if (formData.name.length < 3) newErrors.name = "Facility name must be at least 3 characters long";
    
    if (!formData.capacity) newErrors.capacity = "Capacity is required";
    else if (formData.capacity < 0) newErrors.capacity = "Capacity cannot be negative";
    else if (formData.capacity == 0) newErrors.capacity = "Capacity must be greater than 0";
    
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.imageUrl && !formData.imageUrl.startsWith('http') && !formData.imageUrl.startsWith('data:')) newErrors.imageUrl = "Please enter a valid URL";

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('imageUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchFacilities();
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setFetchingBookings(true);
    try {
      const response = await fetch('http://localhost:8081/api/bookings');
      if (response.ok) {
        const data = await response.json();
        // Sort by newest first
        setBookings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setFetchingBookings(false);
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8081/api/bookings/${id}/status?status=${status}`, {
        method: 'PUT'
      });
      if (response.ok) {
        // Update local state
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

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
                {item.id === 'bookings' && bookings.filter(b => b.status === 'PENDING').length > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#f59e0b', color: '#fff', borderRadius: '99px', fontSize: '0.65rem', fontWeight: '900', padding: '2px 8px', minWidth: '20px', textAlign: 'center' }}>
                    {bookings.filter(b => b.status === 'PENDING').length}
                  </span>
                )}
                {activeView === item.id && item.id !== 'bookings' && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
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
              {activeView === 'bookings' && 'Booking Requests'}
              {activeView === 'add' && 'Facility Registration'}
              {activeView === 'maintenance' && 'Maintenance Log'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {activeView === 'overview' && 'Monitor and manage campus resources in real-time.'}
              {activeView === 'inventory' && 'Search and browse through all registered campus assets.'}
              {activeView === 'bookings' && 'Review and action incoming student reservation requests.'}
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '800', background: fac.status === 'ACTIVE' ? '#dcfce7' : '#fef3c7', color: fac.status === 'ACTIVE' ? '#15803d' : '#92400e' }}>
                            {fac.status}
                          </div>
                          <Link 
                            to="/book" 
                            state={{ resourceName: fac.name, resourceType: fac.type }}
                            style={{ 
                              padding: '4px 12px', 
                              borderRadius: '8px', 
                              background: 'var(--primary)', 
                              color: '#fff', 
                              fontSize: '0.7rem', 
                              fontWeight: '700',
                              textDecoration: 'none'
                            }}
                          >
                            Book Now
                          </Link>
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
            <div className="animate-fade-in">
              {/* Category Filter */}
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '1rem', scrollbarWidth: 'none' }}>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.5rem', 
                      borderRadius: '14px', 
                      border: selectedCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.08)',
                      background: selectedCategory === cat ? 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)' : '#fff',
                      color: selectedCategory === cat ? '#fff' : '#64748b',
                      fontSize: '0.85rem',
                      fontWeight: selectedCategory === cat ? '800' : '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      boxShadow: selectedCategory === cat ? '0 10px 20px -10px rgba(59, 130, 246, 0.5)' : 'none'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="loading-spinner" style={{ border: '4px solid #f8fafc', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '48px', height: '48px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                  <p style={{ color: '#64748b', fontWeight: '600', fontSize: '1.1rem' }}>Synchronizing Asset Database...</p>
                </div>
              ) : filteredFacilities.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {filteredFacilities.map(fac => (
                    <div key={fac.id} className="glass card-hover" style={{ 
                        borderRadius: '24px', 
                        overflow: 'hidden', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        background: '#fff', 
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 20px 40px -20px rgba(0,0,0,0.05)'
                    }}>
                      {/* Image Header */}
                      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        <img 
                          src={fac.imageUrl || getDefaultImage(fac.type)} 
                          alt={fac.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
                        
                        <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                           {getIcon(fac.type)} {fac.type}
                        </div>

                        <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', display: 'flex', gap: '0.5rem' }}>
                           <div style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', background: fac.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)', color: '#fff', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></div>
                             {fac.status}
                           </div>
                        </div>

                        <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                           <button className="btn-hover" style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                             <MoreVertical size={18} />
                           </button>
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.2 }}>{fac.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>
                            <MapPin size={14} className="text-primary" /> {fac.location}
                          </div>
                        </div>
                        
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.5rem', flex: 1 }}>
                            {fac.description || "Premium campus facility equipped with modern infrastructure to support academic and operational needs."}
                        </p>
                        
                        <div className="flex justify-between items-center" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', marginTop: 'auto' }}>
                          <div className="flex items-center gap-3">
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Users size={16} className="text-primary" />
                            </div>
                            <div>
                               <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a', lineHeight: 1 }}>{fac.capacity}</div>
                               <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em', marginTop: '2px' }}>Capacity</div>
                            </div>
                          </div>
                          
                          <Link 
                            to="/book" 
                            state={{ resourceName: fac.name, resourceType: fac.type }}
                            className="btn-hover"
                            style={{ 
                              padding: '0.6rem 1.25rem', 
                              borderRadius: '10px', 
                              fontSize: '0.85rem', 
                              fontWeight: '700',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.4rem',
                              background: '#f8fafc',
                              color: 'var(--primary)',
                              border: '1px solid rgba(59, 130, 246, 0.2)',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = 'var(--primary)'; }}
                          >
                            <Settings size={14} /> Manage
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                      <Package size={32} className="text-muted" style={{ opacity: 0.5 }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>No Assets Found</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto' }}>We couldn't locate any facilities matching your current filter criteria. Try adjusting the category or search term.</p>
                </div>
              )}
            </div>
          )}

          {activeView === 'bookings' && (
            <div className="glass animate-fade-in" style={{ borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {/* Panel Header */}
              <div style={{ padding: '2.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, #fff, #f8fafc)' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>Student Booking Requests</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Review and manage incoming facility reservation requests.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(234, 179, 8, 0.1)', color: '#b45309', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></div>
                    {bookings.filter(b => b.status === 'PENDING').length} PENDING
                  </div>
                  <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#047857', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                    {bookings.filter(b => b.status === 'APPROVED').length} APPROVED
                  </div>
                  <button onClick={fetchBookings} style={{ padding: '8px 16px', borderRadius: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', color: '#475569' }}>↻ Refresh</button>
                </div>
              </div>

              <div style={{ padding: '1.5rem 2.5rem 2.5rem' }}>
                {fetchingBookings ? (
                  <div style={{ textAlign: 'center', padding: '60px' }}>
                    <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                    <p style={{ color: 'var(--text-muted)' }}>Loading requests...</p>
                  </div>
                ) : bookings.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                      <tr style={{ textAlign: 'left' }}>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Student</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Facility & Time</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Purpose</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Requirements</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Status</th>
                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} style={{ background: '#f8fafc' }}>
                          {/* Student */}
                          <td style={{ padding: '1.25rem 1rem', borderRadius: '12px 0 0 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), #1e40af)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                <User size={18} />
                              </div>
                              <div>
                                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' }}>{booking.userName || '—'}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>ID: {booking.userId || '—'}</div>
                                {booking.userFaculty && <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{booking.userFaculty}</div>}
                              </div>
                            </div>
                          </td>
                          {/* Facility & Time */}
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                              <Building2 size={14} style={{ color: 'var(--secondary)' }} />
                              {booking.facilityName || '—'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {booking.startTime ? new Date(booking.startTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Date N/A'}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                              {booking.startTime ? new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              {booking.endTime ? ` – ${new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                            </div>
                          </td>
                          {/* Purpose */}
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={{ padding: '5px 12px', borderRadius: '8px', background: '#eff6ff', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '800' }}>
                              {booking.purpose || '—'}
                            </span>
                            {booking.participantsCount > 0 && (
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Users size={12} /> {booking.participantsCount} participants
                              </div>
                            )}
                          </td>
                          {/* Requirements */}
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {booking.projectorNeeded && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#f0fdf4', color: '#15803d', fontSize: '0.65rem', fontWeight: '800' }}>📽 Projector</span>}
                              {booking.microphoneNeeded && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#fdf4ff', color: '#7e22ce', fontSize: '0.65rem', fontWeight: '800' }}>🎤 Mic</span>}
                              {booking.acNeeded && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#eff6ff', color: '#1d4ed8', fontSize: '0.65rem', fontWeight: '800' }}>❄ AC</span>}
                              {!booking.projectorNeeded && !booking.microphoneNeeded && !booking.acNeeded && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>None</span>}
                            </div>
                          </td>
                          {/* Status */}
                          <td style={{ padding: '1.25rem 1rem' }}>
                            <span style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '0.7rem',
                              fontWeight: '800',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: booking.status === 'PENDING' ? '#fffbeb' : booking.status === 'APPROVED' ? '#ecfdf5' : '#fef2f2',
                              color: booking.status === 'PENDING' ? '#b45309' : booking.status === 'APPROVED' ? '#047857' : '#991b1b'
                            }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                              {booking.status}
                            </span>
                          </td>
                          {/* Actions */}
                          <td style={{ padding: '1.25rem 1rem', borderRadius: '0 12px 12px 0' }}>
                            {booking.status === 'PENDING' ? (
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'APPROVED')}
                                  style={{ padding: '8px 14px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', border: '1px solid #bbf7d0', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                                  title="Approve"
                                >
                                  <CheckCircle2 size={15} /> Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'REJECTED')}
                                  style={{ padding: '8px 14px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                                  title="Reject"
                                >
                                  <XCircle size={15} /> Reject
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ textAlign: 'center', padding: '80px' }}>
                    <Inbox size={56} style={{ color: '#cbd5e1', margin: '0 auto 1rem', display: 'block' }} />
                    <h4 style={{ color: '#64748b', fontWeight: '700', fontSize: '1.2rem' }}>No Booking Requests Yet</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>When students submit booking requests, they will appear here for your review.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'add' && (
            <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="animate-fade-in">
              <form onSubmit={handleSubmit} className="glass" style={{ 
                borderRadius: '32px', 
                background: '#fff', 
                border: '1px solid rgba(0,0,0,0.05)',
                padding: '3.5rem',
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.08)'
              }}>
                
                {/* Form Header */}
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#fff',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.5)'
                    }}>
                        <Plus size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Deploy New Asset</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Configure and register a new operational node to the campus infrastructure.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    {/* Left Column: Identification */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <Tag size={18} className="text-primary" />
                            <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a' }}>Identification</h3>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.02em' }}>FACILITY NAME</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Advanced AI Robotics Lab"
                                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '14px', border: errors.name ? '1px solid #ef4444' : '1px solid #e2e8f0', background: errors.name ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem', transition: 'all 0.2s' }}
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                                <Box size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            </div>
                            {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.name}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.02em' }}>RESOURCE TYPE</label>
                            <div style={{ position: 'relative' }}>
                                <select 
                                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '14px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', fontSize: '0.9rem', height: '48px', appearance: 'none', cursor: 'pointer' }}
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                >
                                    <option>Lecture Hall</option>
                                    <option>Lab</option>
                                    <option>Meeting Room</option>
                                    <option>Studios</option>
                                    <option>Equipment</option>
                                </select>
                                <LayoutGrid size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                                <ChevronRight size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', color: '#94a3b8', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.02em' }}>CAPACITY & OCCUPANCY</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="number" 
                                    placeholder="0"
                                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '14px', border: errors.capacity ? '1px solid #ef4444' : '1px solid #e2e8f0', background: errors.capacity ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                                    value={formData.capacity}
                                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                                />
                                <Users size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            </div>
                            {errors.capacity && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.capacity}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.02em' }}>CAMPUS LOCATION</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type="text" 
                                    placeholder="e.g. West Wing, Floor 2"
                                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '14px', border: errors.location ? '1px solid #ef4444' : '1px solid #e2e8f0', background: errors.location ? '#fef2f2' : '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                />
                                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            </div>
                            {errors.location && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.location}</span>}
                        </div>
                    </div>

                    {/* Right Column: Configuration & Media */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <ImageIcon size={18} className="text-primary" />
                            <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a' }}>Media & Details</h3>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.02em' }}>VISUAL REPRESENTATION</label>
                            <div 
                                style={{ 
                                    border: '2px dashed #e2e8f0', 
                                    borderRadius: '20px', 
                                    padding: '1.5rem', 
                                    textAlign: 'center', 
                                    background: '#f8fafc',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '160px',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                                onClick={() => document.getElementById('facility-image-input').click()}
                            >
                                {formData.imageUrl ? (
                                    <>
                                        <img src={formData.imageUrl} alt="Preview" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
                                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '90px', height: '90px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginBottom: '0.75rem', border: '3px solid #fff' }}>
                                                <img src={formData.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.8rem' }}>Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                                            <Camera size={24} />
                                        </div>
                                        <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.85rem' }}>Choose File</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PNG, JPG or JPEG up to 2MB</div>
                                    </>
                                )}
                                <input id="facility-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.02em' }}>DETAILED DESCRIPTION</label>
                            <div style={{ position: 'relative' }}>
                                <textarea 
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 2.75rem', borderRadius: '14px', border: errors.description ? '1px solid #ef4444' : '1px solid #e2e8f0', background: errors.description ? '#fef2f2' : '#f8fafc', outline: 'none', minHeight: '148px', resize: 'none', fontSize: '0.9rem', transition: 'all 0.2s' }}
                                    value={formData.description}
                                    placeholder="Detail the technical specs or room features..."
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                                <AlignLeft size={18} style={{ position: 'absolute', left: '1rem', top: '1.25rem', color: '#94a3b8' }} />
                            </div>
                            {errors.description && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600' }}>{errors.description}</span>}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center' }}>
                    <button 
                        type="submit" 
                        disabled={submitting} 
                        className="btn-hover"
                        style={{ 
                            width: '100%', 
                            maxWidth: '400px',
                            padding: '1.25rem', 
                            borderRadius: '16px', 
                            fontSize: '1.1rem', 
                            fontWeight: '800', 
                            background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            boxShadow: '0 15px 35px -10px rgba(59, 130, 246, 0.4)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        {submitting ? (
                            <>
                                <div className="loading-spinner" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                                Deploying Node...
                            </>
                        ) : (
                            <>
                                <ShieldCheck size={22} />
                                Complete Registration
                            </>
                        )}
                    </button>
                </div>
              </form>
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
