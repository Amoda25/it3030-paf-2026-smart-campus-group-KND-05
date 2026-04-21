import React, { useState } from 'react';
import { 
  Ticket, 
  Clock, 
  UserPlus, 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  Eye, 
  UserCheck, 
  XCircle,
  ShieldCheck,
  MoreVertical,
  LayoutGrid
} from 'lucide-react';
import { Link } from 'react-router-dom';

const IncidentManagement = () => {
  const [activeTab, setActiveTab] = useState('All Tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Sample Ticket Data
  const [tickets] = useState([
    {
      id: 'INC-1001',
      title: 'Projector not working',
      subtitle: 'Projector Issue • Nethmi',
      location: 'Lab 02',
      priority: 'HIGH',
      status: 'OPEN',
      technician: 'Not Assigned'
    },
    {
      id: 'INC-1002',
      title: 'Air conditioning fault',
      subtitle: 'Air Conditioning Issue • Kasun',
      location: 'Lecture Hall A',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      technician: 'Amal Perera'
    },
    {
      id: 'INC-1003',
      title: 'Network connectivity issue',
      subtitle: 'Internet Issue • Kamal',
      location: 'Staff Room',
      priority: 'HIGH',
      status: 'RESOLVED',
      technician: 'Sunil Shantha'
    }
  ]);

  const stats = [
    { label: 'Open Tickets', count: 2, color: '#3b82f6' },
    { label: 'In Progress', count: 2, color: '#8b5cf6' },
    { label: 'Resolved', count: 1, color: '#10b981' }
  ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'HIGH': return { background: '#fee2e2', color: '#ef4444' };
      case 'MEDIUM': return { background: '#fef3c7', color: '#f59e0b' };
      case 'LOW': return { background: '#dcfce7', color: '#10b981' };
      default: return {};
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'OPEN': return { background: '#dbeafe', color: '#3b82f6' };
      case 'IN_PROGRESS': return { background: '#f3e8ff', color: '#a855f7' };
      case 'RESOLVED': return { background: '#dcfce7', color: '#10b981' };
      default: return {};
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', paddingTop: '80px', position: 'relative' }}>
      {/* Sidebar - Sticky positioning */}
      <aside style={{ 
        width: '280px', 
        background: '#fff', 
        borderRight: '1px solid #e2e8f0', 
        padding: '2rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        position: 'sticky', 
        top: '80px', 
        height: 'calc(100vh - 80px)',
        flexShrink: 0,
        zIndex: 10
      }}>
        <div>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>Incident Control</h2>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { name: 'All Tickets', icon: <Ticket size={20} /> },
              { name: 'Open Tickets', icon: <Clock size={20} /> },
              { name: 'Assign Technician', icon: <UserPlus size={20} /> }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeTab === item.name ? '#eff6ff' : 'transparent',
                  color: activeTab === item.name ? '#2563eb' : '#64748b',
                  fontWeight: activeTab === item.name ? '700' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                {item.icon}
                {item.name}
                {activeTab === item.name && (
                  <div style={{ position: 'absolute', right: '12px', width: '6px', height: '6px', background: '#2563eb', borderRadius: '50%' }} />
                )}
              </button>
            ))}
            
            <Link 
              to="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                color: '#64748b',
                fontWeight: '600',
                textDecoration: 'none',
                marginTop: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ArrowLeft size={20} />
              Back to Main Dashboard
            </Link>
          </nav>
        </div>

        {/* Admin Status Card */}
        <div style={{ marginTop: 'auto', background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', borderRadius: '24px', padding: '1.5rem', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Status</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.4 }}>System operations mode active</p>
          </div>
          <ShieldCheck size={80} style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.1, transform: 'rotate(-15deg)' }} />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem', minWidth: 0 }}>
        {/* Dynamic Page Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 800, 
            color: '#1e293b', 
            letterSpacing: '-0.025em',
            margin: 0
          }}>
            {activeTab}
          </h1>
          <p style={{ color: '#64748b', marginTop: '0.5rem', fontWeight: '500' }}>
            {activeTab === 'All Tickets' && 'Overview of all system incidents and tickets'}
            {activeTab === 'Open Tickets' && 'Manage and monitor all currently active incidents'}
            {activeTab === 'Assign Technician' && 'Allocate technical staff to pending tickets'}
          </p>
        </div>

        {/* Stats Grid - Hidden when not on All Tickets */}
        {activeTab === 'All Tickets' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ background: '#fff', padding: '1.5rem 2rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.5rem' }}>{stat.label}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b' }}>{stat.count}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters & Search */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by ticket ID, title, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>
          <div style={{ position: 'relative', width: '200px' }}>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none', appearance: 'none', cursor: 'pointer' }}
            >
              <option>All Status</option>
              <option>OPEN</option>
              <option>IN_PROGRESS</option>
              <option>RESOLVED</option>
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Tickets Table */}
        <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Ticket ID</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Title</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Location</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Priority</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Technician</th>
                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets
                .filter(ticket => {
                  // Sidebar Filtering
                  if (activeTab === 'Open Tickets' && ticket.status !== 'OPEN') return false;
                  if (activeTab === 'Assign Technician' && ticket.technician !== 'Not Assigned') return false;
                  
                  // Search Filtering
                  const searchLower = searchQuery.toLowerCase();
                  const matchesSearch = 
                    ticket.id.toLowerCase().includes(searchLower) ||
                    ticket.title.toLowerCase().includes(searchLower) ||
                    ticket.location.toLowerCase().includes(searchLower);
                  if (!matchesSearch) return false;

                  // Status Dropdown Filtering
                  if (statusFilter !== 'All Status' && ticket.status !== statusFilter) return false;

                  return true;
                })
                .map((ticket, index, filteredArray) => (
                <tr key={index} style={{ borderBottom: index === filteredArray.length - 1 ? 'none' : '1px solid #f1f5f9', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.5rem', fontWeight: '700', color: '#1e293b' }}>{ticket.id}</td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>{ticket.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ticket.subtitle}</div>
                  </td>
                  <td style={{ padding: '1.5rem', color: '#64748b', fontWeight: '500' }}>{ticket.location}</td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '8px', 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      ...getPriorityStyle(ticket.priority)
                    }}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '8px', 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      ...getStatusStyle(ticket.status)
                    }}>
                      {ticket.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem', color: '#64748b', fontWeight: '600' }}>{ticket.technician}</td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {activeTab !== 'Assign Technician' && (
                        <button style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>View</button>
                      )}
                      <button style={{ background: '#fef3c7', color: '#d97706', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Assign</button>
                      {activeTab !== 'Assign Technician' && (
                        <button style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Reject</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tickets.filter(ticket => {
              if (activeTab === 'Open Tickets' && ticket.status !== 'OPEN') return false;
              if (activeTab === 'Assign Technician' && ticket.technician !== 'Not Assigned') return false;
              const searchLower = searchQuery.toLowerCase();
              const matchesSearch = ticket.id.toLowerCase().includes(searchLower) || ticket.title.toLowerCase().includes(searchLower) || ticket.location.toLowerCase().includes(searchLower);
              if (!matchesSearch) return false;
              if (statusFilter !== 'All Status' && ticket.status !== statusFilter) return false;
              return true;
          }).length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
              No tickets found matching your selection.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IncidentManagement;
