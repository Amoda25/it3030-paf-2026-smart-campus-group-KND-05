import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  AlertTriangle, 
  AlertCircle,
  Clock, 
  CheckCircle2, 
  XCircle, 
  Info, 
  PlusCircle, 
  Activity, 
  LayoutGrid, 
  ClipboardList, 
  TrendingUp, 
  Search, 
  MapPin, 
  Users, 
  ChevronRight, 
  ShieldCheck, 
  Zap,
  Filter,
  MoreVertical,
  ArrowUpRight,
  History,
  UploadCloud,
  ChevronDown,
  Send,
  RotateCcw,
  X
} from 'lucide-react';

const IncidentsPage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'tickets', 'report'
  const [incidents, setIncidents] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Image Upload Refs & State
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]); // {file, previewUrl}
  const [priority, setPriority] = useState('MEDIUM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Reporting Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    faculty: 'Select faculty',
    preferredTime: '',
    issueTitle: '',
    category: 'Select category',
    location: '',
    description: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchIncidents();
    fetchFacilities();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      // Trying both common ports to be safe
      const response = await fetch('http://localhost:8081/api/tickets');
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.issueTitle.trim()) newErrors.issueTitle = "Issue title is required";
    if (formData.category === 'Select category') newErrors.category = "Please select a category";
    if (!formData.location || !formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }
    const newImages = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const base64Images = await Promise.all(images.map(img => fileToBase64(img.file)));
      
      const response = await fetch('http://localhost:8081/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priority: priority,
          images: base64Images
        }),
      });

      if (response.ok) {
        const savedTicket = await response.json();
        setSubmittedTicket(savedTicket);
        setIsSubmitted(true);
        setSuccessMsg('Ticket submitted successfully!');
        
        // Reset form
        setFormData({ fullName: '', email: '', contactNumber: '', preferredTime: '', issueTitle: '', category: 'Select category', location: '', description: '' });
        setImages([]);
        fetchIncidents();
        
        setTimeout(() => {
          setSuccessMsg('');
          setIsSubmitted(false);
          setActiveView('tickets');
        }, 5000);
      }
    } catch (error) {
      console.error('Error reporting incident:', error);
      alert('Failed to submit ticket. Please check your backend connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'CRITICAL': case 'HIGH': return { bg: '#fef2f2', text: '#ef4444', border: '#fee2e2' };
      case 'MEDIUM': return { bg: '#fffbeb', text: '#f59e0b', border: '#fef3c7' };
      default: return { bg: '#eff6ff', text: '#3b82f6', border: '#dbeafe' };
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Status Center', icon: <Activity size={20} /> },
    { id: 'tickets', label: 'Active Tickets', icon: <Wrench size={20} /> },
    { id: 'report', label: 'Report Issue', icon: <PlusCircle size={20} /> },
    { id: 'archive', label: 'System Logs', icon: <History size={20} /> },
  ];

  return (
    <div className="incidents-dashboard" style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', display: 'flex' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '280px', height: 'calc(100vh - 80px)', position: 'fixed', left: 0, top: '80px', background: '#fff', borderRight: '1px solid rgba(0,0,0,0.05)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.5rem', paddingLeft: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '4px', height: '14px', background: '#f59e0b', borderRadius: '2px' }}></div>
            Maintenance HUB
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '12px', border: 'none',
                  background: activeView === item.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: activeView === item.id ? '#f59e0b' : 'var(--text-muted)',
                  fontSize: '0.95rem', fontWeight: activeView === item.id ? '700' : '500', cursor: 'pointer', transition: 'all 0.2s ease'
                }}
              >
                {item.icon} {item.label}
                {activeView === item.id && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></div>}
              </button>
            ))}
          </nav>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' }}>
             <AlertTriangle size={24} style={{ marginBottom: '1rem' }} />
             <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Critical Response</div>
             <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Emergency IT/Facility protocols active.</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '2.5rem 3rem', minWidth: 0 }}>
        <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {activeView === 'overview' && 'Status Center'}
              {activeView === 'tickets' && 'Operations Command'}
              {activeView === 'report' && 'Incident Reporting'}
              {activeView === 'archive' && 'Archived Records'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Monitor real-time system health and manage maintenance tickets.
            </p>
          </div>
        </header>

        <div className="animate-fade-in">
          {activeView === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Active Tickets', value: incidents.length, icon: <AlertCircle style={{ color: '#f59e0b' }} />, trend: 'In system', gradient: 'linear-gradient(135deg, #fff 0%, #fffbeb 100%)' },
                  { label: 'High Priority', value: incidents.filter(i => i.priority === 'HIGH' || i.priority === 'CRITICAL').length, icon: <Zap style={{ color: '#ef4444' }} />, trend: 'Immediate Action', gradient: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)' },
                  { label: 'Campus Health', value: '98.4%', icon: <Activity style={{ color: '#3b82f6' }} />, trend: 'Optimal', gradient: 'linear-gradient(135deg, #fff 0%, #eff6ff 100%)' },
                  { label: 'Avg Response', value: '45m', icon: <Clock style={{ color: '#10b981' }} />, trend: 'SLA Met', gradient: 'linear-gradient(135deg, #fff 0%, #ecfdf5 100%)' },
                ].map((stat, i) => (
                  <div key={i} className="glass card-hover" style={{ padding: '2rem', borderRadius: '2rem', background: stat.gradient, border: '1px solid rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>{stat.icon}</div>
                       <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>{stat.trend}</div>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.25rem', color: '#0f172a' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'tickets' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
               {incidents.map(incident => {
                 const style = getSeverityStyle(incident.priority);
                 return (
                   <div key={incident.id} className="glass card-hover" style={{ borderRadius: '1.5rem', overflow: 'hidden', background: '#fff', padding: '2rem', borderTop: `6px solid ${style.text}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                         <div style={{ padding: '6px 12px', borderRadius: '8px', background: style.bg, color: style.text, fontSize: '0.7rem', fontWeight: '900' }}>{incident.priority || 'MEDIUM'} PRIORITY</div>
                         <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>OPEN</span>
                      </div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>{incident.issueTitle || 'Unnamed Issue'}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        <MapPin size={14} /> {incident.location}
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.6 }}>{incident.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                         <div className="flex flex-col">
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>REPORTER</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{incident.fullName}</span>
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>
          )}

          {activeView === 'report' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem' }}>
               <div className="glass" style={{ borderRadius: '2rem', background: '#fff', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>Incident Deployment</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Report a technical discrepancy to the maintenance unit.</p>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>FULL NAME</label>
                           <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.fullName ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>EMAIL ADDRESS</label>
                           <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.email ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                        </div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>ISSUE TITLE</label>
                        <input type="text" name="issueTitle" value={formData.issueTitle} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.issueTitle ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>CATEGORY</label>
                           <select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.category ? '1px solid #ef4444' : '1px solid #e2e8f0' }}>
                              <option>Select category</option>
                              <option>Equipment Fault</option>
                              <option>Facility Damage</option>
                              <option>Network Issue</option>
                              <option>Other</option>
                           </select>
                        </div>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>PRIORITY</label>
                           <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                              <option value="LOW">LOW</option>
                              <option value="MEDIUM">MEDIUM</option>
                              <option value="HIGH">HIGH</option>
                           </select>
                        </div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>INCIDENT DESCRIPTION</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.description ? '1px solid #ef4444' : '1px solid #e2e8f0', minHeight: '120px' }} />
                     </div>
                     
                     <div className="flex flex-col gap-3">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>ATTACH EVIDENCE (MAX 3 IMAGES)</label>
                        <div onClick={() => images.length < 3 && fileInputRef.current?.click()} style={{ border: '2px dashed #e2e8f0', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
                           <UploadCloud size={32} style={{ color: '#f59e0b', margin: '0 auto 0.5rem' }} />
                           <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{images.length < 3 ? 'Click to upload images' : 'Limit reached'}</div>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} multiple accept="image/*" />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                           {images.map((img, i) => (
                             <div key={i} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden' }}>
                               <img src={img.previewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                               <button type="button" onClick={() => removeImage(i)} style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none' }}><X size={12} /></button>
                             </div>
                           ))}
                        </div>
                     </div>

                     <button type="submit" disabled={submitting} style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', background: '#f59e0b', color: '#fff', fontWeight: '800', border: 'none', marginTop: '1rem' }}>
                        {submitting ? 'Submitting...' : 'Deploy Ticket'}
                     </button>
                     {successMsg && <div style={{ color: '#10b981', fontWeight: '700', textAlign: 'center', marginTop: '1rem' }}>{successMsg}</div>}
                  </form>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#0f172a', color: '#fff' }}>
                     <h4 style={{ color: '#f59e0b', fontWeight: '800', marginBottom: '1.5rem' }}>RESPONSE PROTOCOL</h4>
                     <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6 }}>Critical tickets are dispatched immediately to on-site technicians.</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
      <style>{`
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default IncidentsPage;
