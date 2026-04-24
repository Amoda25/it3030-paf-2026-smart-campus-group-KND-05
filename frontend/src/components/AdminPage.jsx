import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  Activity, 
  ClipboardList, 
  Info, 
  PlusCircle, 
  LayoutGrid, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  ShieldAlert, 
  Zap,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Database,
  Lock,
  History,
  MoreHorizontal
} from 'lucide-react';

const AdminPage = () => {
  const [activeView, setActiveView] = useState('control-panel'); // 'control-panel', 'users', 'settings', 'logs'
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFacilities: 0,
    activeBookings: 0,
    openIncidents: 0,
    activeTechnicians: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await fetch(`http://localhost:8081/api/admin/users/${userId}/role?role=${newRole}`, {
        method: 'PATCH'
      });
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'control-panel', label: 'Operations Control', icon: <Activity size={20} /> },
    { id: 'users', label: 'User Directory', icon: <Users size={20} /> },
    { id: 'settings', label: 'Platform Settings', icon: <Settings size={20} /> },
    { id: 'logs', label: 'Audit Logs', icon: <History size={20} /> },
  ];

  return (
    <div className="admin-dashboard" style={{ 
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
            color: '#4f46e5', 
            textTransform: 'uppercase', 
            letterSpacing: '0.12em', 
            marginBottom: '1.5rem', 
            paddingLeft: '0.75rem',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '4px', height: '14px', background: '#4f46e5', borderRadius: '2px' }}></div>
            Governance Engine
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
                  background: activeView === item.id ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                  color: activeView === item.id ? '#4f46e5' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: activeView === item.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon}
                {item.label}
                {activeView === item.id && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#4f46e5' }}></div>}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: '#fff' }}>
             <ShieldAlert size={24} style={{ marginBottom: '1rem' }} />
             <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Secure Environment</div>
             <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>UniHub platform is running under Admin-level encryption.</div>
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
              {activeView === 'control-panel' && 'Operations Command'}
              {activeView === 'users' && 'User Governance'}
              {activeView === 'settings' && 'Platform Schema'}
              {activeView === 'logs' && 'Audit Intelligence'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {activeView === 'control-panel' && 'Aggregated intelligence from all smart campus modules.'}
              {activeView === 'users' && 'Manage access control and identity lifecycle for campus members.'}
              {activeView === 'settings' && 'Configure core platform parameters and module thresholds.'}
              {activeView === 'logs' && 'Review decentralized event logs and traceability records.'}
            </p>
          </div>
          {activeView === 'users' && (
            <div style={{ position: 'relative' }}>
               <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
               <input 
                 type="text" 
                 placeholder="Search members..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 style={{ padding: '0.85rem 1rem 0.85rem 3rem', borderRadius: '14px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.9rem', width: '300px', outline: 'none' }}
               />
            </div>
          )}
        </header>

        {/* Content Views */}
        <div className="animate-fade-in">
          {activeView === 'control-panel' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Total Members', value: stats.totalUsers, icon: <Users style={{ color: '#4f46e5' }} />, trend: 'Across 4 roles' },
                  { label: 'Campus Assets', value: stats.totalFacilities, icon: <Database style={{ color: '#10b981' }} />, trend: 'Operational' },
                  { label: 'Open Incidents', value: stats.openIncidents, icon: <ShieldAlert style={{ color: '#ef4444' }} />, trend: incidents.status === 'CRITICAL' ? 'Immediate' : 'In Queue' },
                  { label: 'Active Sessions', value: stats.activeBookings, icon: <Zap style={{ color: '#f59e0b' }} />, trend: 'Current load' },
                ].map((stat, i) => (
                  <div key={i} className="glass card-hover" style={{ 
                    padding: '2rem', 
                    borderRadius: '2rem', 
                    background: '#fff', 
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                       <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(79, 70, 229, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {stat.icon}
                       </div>
                       <ChevronRight size={18} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.25rem', color: '#0f172a', letterSpacing: '-1px' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Advanced Analytics Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                 <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>System Throughput</h3>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: '700' }}>
                           <option>Last 7 Days</option>
                           <option>Last 30 Days</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ height: '300px', width: '100%', background: 'linear-gradient(to bottom, #f8fafc, #fff)', borderRadius: '16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', opacity: 0.4 }}>
                          <Cpu size={48} style={{ margin: '0 auto 1rem auto' }} />
                          <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Live Performance Feed (Conceptual)</div>
                        </div>
                    </div>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#fff' }}>
                       <Lock size={32} style={{ marginBottom: '1.5rem', color: '#818cf8' }} />
                       <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem' }}>Global Lockdown</h3>
                       <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                         Restrict all facility access and switch platform to READ-ONLY mode.
                       </p>
                       <button style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: '800', cursor: 'pointer' }}>ENGAGE PROTOCOL</button>
                    </div>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                          <ShieldCheck size={20} style={{ color: '#10b981' }} />
                          <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Security Status: OPTIMAL</span>
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                             <div style={{ width: '92%', height: '100%', background: '#10b981' }}></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                             <span>INTEGRITY CHECK</span>
                             <span>92% COMPLETE</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeView === 'users' && (
            <div className="glass" style={{ borderRadius: '2rem', background: '#fff', overflow: 'hidden' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                       <th style={{ padding: '1.5rem', fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Member Identity</th>
                       <th style={{ padding: '1.5rem', fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Security Tier</th>
                       <th style={{ padding: '1.5rem', fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Creation Trace</th>
                       <th style={{ padding: '1.5rem', fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                         <td style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800' }}>
                                 {user.fullName.charAt(0)}
                               </div>
                               <div>
                                 <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{user.fullName}</div>
                                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                               </div>
                            </div>
                         </td>
                         <td style={{ padding: '1.5rem' }}>
                            <select 
                              value={user.role || 'USER'}
                              onChange={(e) => updateUserRole(user.id, e.target.value)}
                              style={{ 
                                padding: '6px 12px', 
                                borderRadius: '8px', 
                                fontSize: '0.75rem', 
                                fontWeight: '800', 
                                border: '1px solid #e2e8f0', 
                                background: user.role === 'ADMIN' ? '#eff6ff' : '#f8fafc',
                                color: user.role === 'ADMIN' ? '#4f46e5' : '#1e293b',
                                cursor: 'pointer'
                              }}
                            >
                               <option value="USER">USER</option>
                               <option value="TECHNICIAN">TECHNICIAN</option>
                               <option value="ADMIN">ADMIN</option>
                            </select>
                         </td>
                         <td style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Initial Boot'}
                         </td>
                         <td style={{ padding: '1.5rem' }}>
                            <button style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                               <MoreHorizontal size={20} />
                            </button>
                         </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               {filteredUsers.length === 0 && (
                 <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No members detected under the current query.
                 </div>
               )}
            </div>
          )}

          {(activeView === 'settings' || activeView === 'logs') && (
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
               <ShieldCheck size={64} className="text-primary mb-6" style={{ margin: '0 auto 1.5rem auto', color: '#4f46e5', opacity: 0.2 }} />
               <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Module Expansion Pending</h3>
               <p style={{ color: 'var(--text-muted)' }}>This node is locked under current development cycle constraints.</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;
