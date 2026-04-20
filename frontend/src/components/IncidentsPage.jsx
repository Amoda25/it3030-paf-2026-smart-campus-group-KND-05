import React, { useState, useEffect } from 'react';
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
  History
} from 'lucide-react';

const IncidentsPage = () => {
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'tickets', 'report'
  const [incidents, setIncidents] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reporting Form State
  const [formData, setFormData] = useState({
    facilityId: '',
    issueType: 'IT',
    severity: 'MEDIUM',
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
    try {
      const response = await fetch('http://localhost:8080/api/incidents');
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
      const response = await fetch('http://localhost:8080/api/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.facilityId) newErrors.facilityId = 'Please select the affected facility.';
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const selectedFacility = facilities.find(f => f.id === formData.facilityId);
      const incidentData = {
        ...formData,
        facilityName: selectedFacility?.name || 'Unknown',
        reporterName: 'John Doe', // Static for now
        status: 'OPEN'
      };

      const response = await fetch('http://localhost:8080/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentData)
      });

      if (response.ok) {
        setSuccessMsg('Incident reported successfully. Technicians have been notified.');
        setFormData({ facilityId: '', issueType: 'IT', severity: 'MEDIUM', description: '' });
        fetchIncidents();
        setTimeout(() => {
          setSuccessMsg('');
          setActiveView('tickets');
        }, 2000);
      }
    } catch (error) {
      console.error('Error reporting incident:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:8080/api/incidents/${id}/status?status=${newStatus}`, {
        method: 'PATCH'
      });
      fetchIncidents();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'CRITICAL': return { bg: '#fef2f2', text: '#ef4444', border: '#fee2e2' };
      case 'HIGH': return { bg: '#fff7ed', text: '#f97316', border: '#ffedd5' };
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
    <div className="incidents-dashboard" style={{ 
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
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: '900', 
            color: '#f59e0b', 
            textTransform: 'uppercase', 
            letterSpacing: '0.12em', 
            marginBottom: '1.5rem', 
            paddingLeft: '0.75rem',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '4px', height: '14px', background: '#f59e0b', borderRadius: '2px' }}></div>
            Maintenance HUB
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
                  background: activeView === item.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: activeView === item.id ? '#f59e0b' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: activeView === item.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon}
                {item.label}
                {activeView === item.id && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}></div>}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#fff' }}>
             <AlertTriangle size={24} style={{ marginBottom: '1rem' }} />
             <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Critical Response</div>
             <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Emergency IT/Facility protocols active for Zone A.</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        marginLeft: '280px', 
        padding: '2.5rem 3rem',
        minWidth: 0 
      }}>
        
        {/* Dynamic Header */}
        <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {activeView === 'overview' && 'Status Center'}
              {activeView === 'tickets' && 'Operations Command'}
              {activeView === 'report' && 'Incident Reporting'}
              {activeView === 'archive' && 'Archived Records'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {activeView === 'overview' && 'Monitor real-time system health and open ticket throughput.'}
              {activeView === 'tickets' && 'Manage active maintenance cycles and technical responses.'}
              {activeView === 'report' && 'Deploy a new maintenance ticket into the technical stack.'}
              {activeView === 'archive' && 'Review historic resolved states and resolution cycles.'}
            </p>
          </div>
        </header>

        {/* Content Views */}
        <div className="animate-fade-in">
          {activeView === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Active Tickets', value: incidents.filter(i => i.status !== 'CLOSED').length, icon: <AlertCircle style={{ color: '#f59e0b' }} />, trend: 'In system', gradient: 'linear-gradient(135deg, #fff 0%, #fffbeb 100%)' },
                  { label: 'CRITICAL', value: incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'CLOSED').length, icon: <Zap style={{ color: '#ef4444' }} />, trend: 'Immediate Action', gradient: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)' },
                  { label: 'Resolved Today', value: incidents.filter(i => i.status === 'RESOLVED').length, icon: <CheckCircle2 style={{ color: '#10b981' }} />, trend: 'Cycle Complete', gradient: 'linear-gradient(135deg, #fff 0%, #ecfdf5 100%)' },
                  { label: 'Avg Uptime', value: '99.4%', icon: <Activity style={{ color: '#3b82f6' }} />, trend: 'System Stability', gradient: 'linear-gradient(135deg, #fff 0%, #eff6ff 100%)' },
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
                         {stat.trend}
                       </div>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.25rem', color: '#0f172a', letterSpacing: '-1px' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Recent Critical Nodes</h3>
                    <button onClick={() => setActiveView('tickets')} className="text-primary" style={{ background: 'none', border: 'none', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', color: '#f59e0b' }}>View Command Center</button>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {incidents.slice(0, 3).map(incident => {
                      const style = getSeverityStyle(incident.severity);
                      return (
                        <div key={incident.id} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', borderRadius: '16px', background: '#f8fafc' }}>
                           <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: style.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: style.text, border: `1px solid ${style.border}` }}>
                              <AlertTriangle size={20} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '800', fontSize: '1rem' }}>{incident.facilityName} - {incident.issueType}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{incident.description.slice(0, 80)}...</div>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: style.text }}>{incident.severity}</span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(incident.createdAt).toLocaleDateString()}</span>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
            </div>
          )}

          {activeView === 'tickets' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
               {incidents.map(incident => {
                 const style = getSeverityStyle(incident.severity);
                 return (
                   <div key={incident.id} className="glass card-hover" style={{ borderRadius: '1.5rem', overflow: 'hidden', background: '#fff', padding: '2rem', borderTop: `6px solid ${style.text}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                         <div style={{ padding: '6px 12px', borderRadius: '8px', background: style.bg, color: style.text, fontSize: '0.7rem', fontWeight: '900' }}>
                            {incident.severity} PRIORITY
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: incident.status === 'OPEN' ? '#f59e0b' : incident.status === 'IN_PROGRESS' ? '#3b82f6' : '#10b981' }}></div>
                            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>{incident.status}</span>
                         </div>
                      </div>

                      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>{incident.facilityName}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.6 }}>{incident.description}</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                         <div className="flex flex-col">
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>REPORTER</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{incident.reporterName}</span>
                         </div>
                         <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {incident.status === 'OPEN' && (
                               <button onClick={() => updateStatus(incident.id, 'IN_PROGRESS')} style={{ padding: '8px 16px', borderRadius: '8px', background: '#f59e0b', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>START</button>
                            )}
                            {incident.status === 'IN_PROGRESS' && (
                               <button onClick={() => updateStatus(incident.id, 'RESOLVED')} style={{ padding: '8px 16px', borderRadius: '8px', background: '#10b981', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>RESOLVE</button>
                            )}
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
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>Incident Deployment</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Report a technical discrepancy to the maintenance orchestration unit.</p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>AFFECTED RESOURCE</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.5 }} />
                          <select 
                            style={{ width: '100%', padding: '1rem 1rem 1rem 2.8rem', borderRadius: '14px', background: '#f8fafc', border: errors.facilityId ? '2px solid #ef4444' : '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
                            value={formData.facilityId}
                            onChange={(e) => setFormData({...formData, facilityId: e.target.value})}
                          >
                             <option value="">Select location...</option>
                             {facilities.map(f => (
                               <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
                             ))}
                          </select>
                        </div>
                        {errors.facilityId && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.facilityId}</span>}
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>ISSUE CLASSIFICATION</label>
                           <select 
                             style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
                             value={formData.issueType}
                             onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                           >
                              <option>IT</option>
                              <option>ELECTRICAL</option>
                              <option>PLUMBING</option>
                              <option>CLEANING</option>
                              <option>SECURITY</option>
                           </select>
                        </div>
                        <div className="flex flex-col gap-2">
                           <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>SEVERITY LEVEL</label>
                           <select 
                             style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
                             value={formData.severity}
                             onChange={(e) => setFormData({...formData, severity: e.target.value})}
                           >
                              <option>LOW</option>
                              <option>MEDIUM</option>
                              <option>HIGH</option>
                              <option>CRITICAL</option>
                           </select>
                        </div>
                     </div>

                     <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e293b', opacity: 0.6 }}>INCIDENT DESCRIPTION</label>
                        <textarea 
                           placeholder="Detail the technical failure or discrepancy observed..."
                           style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.description ? '2px solid #ef4444' : '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', minHeight: '140px', resize: 'none' }}
                           value={formData.description}
                           onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                        {errors.description && <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '600' }}>{errors.description}</span>}
                     </div>

                     <button 
                        type="submit" 
                        disabled={submitting}
                        style={{ 
                          width: '100%', 
                          padding: '1.25rem', 
                          borderRadius: '16px', 
                          background: '#f59e0b', 
                          color: '#fff', 
                          border: 'none', 
                          fontWeight: '800', 
                          fontSize: '1rem',
                          marginTop: '1rem',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          boxShadow: '0 10px 20px rgba(245, 158, 11, 0.2)'
                        }}
                     >
                        {submitting ? (
                           <>
                             <div className="animate-spin" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></div>
                             Reporting...
                           </>
                        ) : (
                           <>
                             <Wrench size={20} /> Deploy Ticket
                           </>
                        )}
                     </button>

                     {successMsg && (
                        <div className="animate-fade-in mt-6" style={{ padding: '1rem', background: '#ecfdf5', color: '#059669', borderRadius: '12px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem', border: '1px solid #10b981' }}>
                           {successMsg}
                        </div>
                     )}
                  </form>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: '#fff' }}>
                     <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>RESPONSE PROTOCOL</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                           { label: 'Critical Response (SLA)', desc: 'Response within 30 minutes for life-safety or security breaches.' },
                           { label: 'Standard Maintenance', desc: 'Resolution within 24-48 business hours for non-critical hubs.' },
                           { label: 'System Validation', desc: 'Technicians must provide evidence of resolution before closure.' }
                        ].map((rule, i) => (
                           <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', fontWeight: '900' }}>
                                 {i + 1}
                              </div>
                              <div>
                                 <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{rule.label}</div>
                                 <div style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.5 }}>{rule.desc}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Zap size={20} className="text-primary" style={{ color: '#f59e0b' }} />
                        <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Instant Dispatch</span>
                     </div>
                     <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        Severity "CRITICAL" triggers an automated notification to the on-call engineer for Zone B.
                     </p>
                  </div>
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
        .animate-spin {
          animation: spin 1s linear infinite;
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

export default IncidentsPage;
}>
                    <input 
                      type="text" 
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      placeholder="Ex: 9.00 AM - 12.00 PM" 
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Issue Title */}
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Issue Title</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    name="issueTitle"
                    value={formData.issueTitle}
                    onChange={handleInputChange}
                    placeholder="Ex: Projector display not visible" 
                    required
                    style={{ width: '100%', padding: '1rem 1.25rem 1rem 3rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a' }}
                  />
                </div>
              </div>

              {/* Row 4: Cat & Loc */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Category</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', appearance: 'none' }}
                    >
                      <option>Select category</option>
                      <option>Equipment Fault</option>
                      <option>Facility Damage</option>
                      <option>Network Issue</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', appearance: 'none' }}
                    >
                      <option>Select location</option>
                      <option>Main Hall</option>
                      <option>Lab A</option>
                      <option>Library</option>
                      <option>Cafeteria</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Priority Selector */}
              <div className="flex flex-col gap-3">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Priority</label>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setPriority('LOW')}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.75rem', 
                      borderRadius: '12px', 
                      border: priority === 'LOW' ? '1px solid #93c5fd' : '1px solid rgba(0,0,0,0.05)', 
                      background: priority === 'LOW' ? '#dbeafe' : '#f8fafc', 
                      color: priority === 'LOW' ? '#1e40af' : '#64748b', 
                      fontWeight: '700', 
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    LOW
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPriority('MEDIUM')}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.75rem', 
                      borderRadius: '12px', 
                      border: priority === 'MEDIUM' ? '1px solid #fde68a' : '1px solid rgba(0,0,0,0.05)', 
                      background: priority === 'MEDIUM' ? '#fef3c7' : '#f8fafc', 
                      color: priority === 'MEDIUM' ? '#92400e' : '#64748b', 
                      fontWeight: '700', 
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    MEDIUM
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPriority('HIGH')}
                    className="btn-hover"
                    style={{ 
                      padding: '0.6rem 1.75rem', 
                      borderRadius: '12px', 
                      border: priority === 'HIGH' ? '1px solid #fca5a5' : '1px solid rgba(0,0,0,0.05)', 
                      background: priority === 'HIGH' ? '#fee2e2' : '#f8fafc', 
                      color: priority === 'HIGH' ? '#b91c1c' : '#64748b', 
                      fontWeight: '700', 
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    HIGH
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Clearly describe the issue, when it happened, and any visible damage or symptoms." 
                  style={{ width: '100%', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', minHeight: '150px', resize: 'vertical' }}
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-3">
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>Upload Images (Max 3)</label>
                <div 
                  style={{ 
                    border: '2px dashed rgba(59, 130, 246, 0.2)', 
                    borderRadius: '20px', 
                    padding: '3rem', 
                    textAlign: 'center',
                    background: 'rgba(59, 130, 246, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <UploadCloud size={40} style={{ color: '#2563eb' }} />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Click to upload images</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>PNG, JPG or JPEG files • up to 3 files</div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions and Info Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', gap: '3rem' }}>
                
                {/* Info Note Box (Left) */}
                <div 
                  style={{ 
                    flex: 1,
                    padding: '1.25rem 1.75rem',
                    background: 'rgba(37, 99, 235, 0.04)',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.1)',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Info size={24} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: '1rem', fontWeight: '800', color: '#2563eb' }}>Please Note</span>
                      <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.4 }}>
                          After submission, your ticket will be reviewed by our team. You will receive updates via email or notifications.
                      </p>
                  </div>
                </div>

                {/* Form Buttons (Right) */}
                <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="btn btn-hover" 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 1.75rem', 
                      borderRadius: '12px', 
                      background: '#ffffff', 
                      border: '1px solid rgba(0,0,0,0.1)', 
                      color: '#0f172a',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-hover" 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 2rem', 
                      borderRadius: '12px', 
                      background: '#2563eb',
                      border: 'none',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '1rem',
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Send size={18} />
                    Submit Ticket
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
>>>>>>> main
    </div>
  );
};

export default IncidentsPage;
