import React, { useState, useEffect } from 'react';
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

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('Details');
  const [resolutionNote, setResolutionNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');

  // Hardcoded technician data for demonstration
  const technicians = [
    { id: 'T1', name: 'Chaminda Perera', category: 'Projector Issue' },
    { id: 'T2', name: 'Nimal Silva', category: 'Electrical' },
    { id: 'T3', name: 'Sunil Appuhamy', category: 'Networking' },
    { id: 'T4', name: 'Kasun Rajapaksa', category: 'Plumbing' },
    { id: 'T5', name: 'Kamal Gunawardena', category: 'Projector Issue' }
  ];

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/tickets');
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const data = await response.json();
      
      // Map backend data to frontend format if needed
      const formattedTickets = data.map(ticket => ({
        ...ticket,
        displayId: ticket.ticketId,
        title: ticket.issueTitle,
        subtitle: `${ticket.category} • ${ticket.fullName}`,
      }));
      
      setTickets(formattedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/api/tickets/${selectedTicket.ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');
      const updated = await response.json();
      
      // Update both selected ticket and the main list state
      setSelectedTicket(updated);
      setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? { 
        ...t, 
        status: updated.status,
        priority: updated.priority,
        technician: updated.technician,
        comments: updated.comments 
      } : t));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please check if the backend is running.');
    }
  };

  const handlePriorityChange = async (newPriority) => {
    try {
      const response = await fetch(`http://localhost:8081/api/tickets/${selectedTicket.ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority })
      });
      if (!response.ok) throw new Error('Failed to update priority');
      const updated = await response.json();
      
      setSelectedTicket(updated);
      setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? { ...t, priority: updated.priority } : t));
    } catch (error) {
      console.error('Error updating priority:', error);
      alert('Error updating priority.');
    }
  };

  const handleSaveResolution = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/tickets/${selectedTicket.ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolutionNote })
      });
      if (!response.ok) throw new Error('Failed to save resolution');
      const updated = await response.json();
      
      setSelectedTicket(prev => ({ ...prev, resolutionNote: updated.resolutionNote }));
      setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? { ...t, resolutionNote: updated.resolutionNote } : t));
      
      alert('Resolution note saved successfully!');
    } catch (error) {
      console.error('Error saving resolution:', error);
      alert('Error saving resolution note.');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch(`http://localhost:8081/api/tickets/${selectedTicket.ticketId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: 'ADMIN', text: newComment })
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const updated = await response.json();
      
      setSelectedTicket(prev => ({ ...prev, comments: updated.comments }));
      setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? { ...t, comments: updated.comments } : t));
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment.');
    }
  };

  const handleAssign = (ticket) => {
    setSelectedTicket(ticket);
    setSelectedTechnician('');
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssignment = async () => {
    if (!selectedTechnician) return;

    try {
      const response = await fetch(`http://localhost:8081/api/tickets/${selectedTicket.ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          technician: selectedTechnician,
          status: 'IN_PROGRESS' // Auto move to In Progress when assigned
        })
      });
      if (!response.ok) throw new Error('Failed to assign technician');
      const updated = await response.json();
      
      setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? { 
        ...t, 
        technician: updated.technician,
        status: updated.status 
      } : t));
      setIsAssignModalOpen(false);
      alert(`Ticket assigned to ${selectedTechnician} successfully!`);
    } catch (error) {
      console.error('Error assigning technician:', error);
      alert('Error assigning technician.');
    }
  };

  const handleReject = (ticket) => {
    setSelectedTicket(ticket);
    setRejectionReason('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmRejection = async () => {
    if (!rejectionReason.trim()) return;

    try {
      const response = await fetch(`http://localhost:8081/api/tickets/${selectedTicket.ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'REJECTED',
          rejectionReason: rejectionReason 
        })
      });
      if (!response.ok) throw new Error('Failed to reject ticket');
      const updated = await response.json();
      
      setTickets(prev => prev.map(t => t.ticketId === updated.ticketId ? { 
        ...t, 
        status: updated.status,
        rejectionReason: updated.rejectionReason 
      } : t));
      
      setIsRejectModalOpen(false);
      alert(`Ticket rejected successfully.`);
    } catch (error) {
      console.error('Error rejecting ticket:', error);
      alert('Error rejecting ticket.');
    }
  };

  const stats = [
    { label: 'Open Tickets', count: tickets.filter(t => t.status === 'OPEN').length, color: '#3b82f6' },
    { label: 'In Progress', count: tickets.filter(t => t.status === 'IN_PROGRESS').length, color: '#8b5cf6' },
    { label: 'Resolved', count: tickets.filter(t => t.status === 'RESOLVED').length, color: '#10b981' }
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
      case 'CLOSED': return { background: '#f1f5f9', color: '#64748b' };
      default: return { background: '#f8fafc', color: '#94a3b8' };
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
                    ticket.displayId.toLowerCase().includes(searchLower) ||
                    ticket.title.toLowerCase().includes(searchLower) ||
                    ticket.location.toLowerCase().includes(searchLower);
                  if (!matchesSearch) return false;

                  // Status Dropdown Filtering
                  if (statusFilter !== 'All Status' && ticket.status !== statusFilter) return false;

                  return true;
                })
                .map((ticket, index, filteredArray) => (
                <tr key={index} style={{ borderBottom: index === filteredArray.length - 1 ? 'none' : '1px solid #f1f5f9', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.5rem', fontWeight: '700', color: '#1e293b' }}>{ticket.displayId}</td>
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
                        <button 
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setResolutionNote(ticket.resolutionNote || '');
                            setIsModalOpen(true);
                            setActiveModalTab('Details');
                          }}
                          style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                        >
                          View
                        </button>
                      )}
                      <button 
                        onClick={() => handleAssign(ticket)}
                        style={{ background: '#fef3c7', color: '#d97706', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.95)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                      >
                        Assign
                      </button>
                      {activeTab !== 'Assign Technician' && (
                        <button 
                          onClick={() => handleReject(ticket)}
                          style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.95)'}
                          onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                        >
                          Reject
                        </button>
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
              const matchesSearch = ticket.displayId.toLowerCase().includes(searchLower) || ticket.title.toLowerCase().includes(searchLower) || ticket.location.toLowerCase().includes(searchLower);
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

      {/* Assign Technician Modal */}
      {isAssignModalOpen && selectedTicket && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', animation: 'modalSlideUp 0.3s ease-out' }}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ color: '#d97706', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Assign Technician</div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>{selectedTicket.issueTitle || selectedTicket.title}</h2>
                  <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>{selectedTicket.ticketId} • {selectedTicket.location}</div>
                </div>
                <button onClick={() => setIsAssignModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '12px', color: '#475569', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Close</button>
              </div>

              <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#f8fafc', marginBottom: '2rem' }}>
                <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '1rem' }}>Select any technician and assign this ticket for: <strong style={{ color: '#0f172a' }}>{selectedTicket.category || 'Maintenance Issue'}</strong></p>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Select Technician</label>
                  <select 
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.95rem', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                  >
                    <option value="">Choose a technician</option>
                    {technicians.map(tech => (
                      <option key={tech.id} value={tech.name}>
                        {tech.name} - ({tech.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  onClick={() => setIsAssignModalOpen(false)} 
                  style={{ padding: '0.85rem 2rem', borderRadius: '14px', border: 'none', background: '#f1f5f9', color: '#475569', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmAssignment}
                  disabled={!selectedTechnician}
                  style={{ 
                    padding: '0.85rem 2rem', 
                    borderRadius: '14px', 
                    border: 'none', 
                    background: selectedTechnician ? '#fef08a' : '#e2e8f0', 
                    color: selectedTechnician ? '#854d0e' : '#94a3b8', 
                    fontWeight: '700', 
                    cursor: selectedTechnician ? 'pointer' : 'not-allowed',
                    boxShadow: selectedTechnician ? '0 4px 12px rgba(254, 240, 138, 0.4)' : 'none'
                  }}
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Ticket Modal */}
      {isRejectModalOpen && selectedTicket && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', animation: 'modalSlideUp 0.3s ease-out' }}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Reject Ticket</div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>{selectedTicket.issueTitle || selectedTicket.title}</h2>
                  <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>{selectedTicket.ticketId}</div>
                </div>
                <button onClick={() => setIsRejectModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '12px', color: '#475569', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Close</button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem' }}>Reason for rejection</label>
                <textarea 
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason"
                  style={{ width: '100%', height: '120px', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button 
                  onClick={() => setIsRejectModalOpen(false)} 
                  style={{ padding: '0.85rem 2rem', borderRadius: '14px', border: 'none', background: '#f1f5f9', color: '#475569', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmRejection}
                  disabled={!rejectionReason.trim()}
                  style={{ 
                    padding: '0.85rem 2rem', 
                    borderRadius: '14px', 
                    border: 'none', 
                    background: rejectionReason.trim() ? '#fee2e2' : '#e2e8f0', 
                    color: rejectionReason.trim() ? '#b91c1c' : '#94a3b8', 
                    fontWeight: '700', 
                    cursor: rejectionReason.trim() ? 'pointer' : 'not-allowed',
                    boxShadow: rejectionReason.trim() ? '0 4px 12px rgba(239, 68, 68, 0.2)' : 'none'
                  }}
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {isModalOpen && selectedTicket && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '900px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflow: 'hidden' }}>
            {/* Modal Header */}
            <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', position: 'relative' }}>
              <div style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Ticket Details</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.25rem' }}>{selectedTicket.issueTitle}</h2>
              <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>{selectedTicket.displayId} • {selectedTicket.location}</div>
              
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.6rem 1.2rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
              >
                Close
              </button>
            </div>

            {/* Modal Tabs */}
            <div style={{ display: 'flex', gap: '1rem', padding: '0 2rem', marginTop: '1.5rem' }}>
              {['Details', 'Workflow', 'Comments'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveModalTab(tab)}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeModalTab === tab ? '#2563eb' : '#f1f5f9',
                    color: activeModalTab === tab ? '#fff' : '#64748b',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {/* Common Status/Priority Tags */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', alignItems: 'center' }}>
                <span style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', ...getPriorityStyle(selectedTicket.priority) }}>{selectedTicket.priority}</span>
                <span style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', ...getStatusStyle(selectedTicket.status) }}>{selectedTicket.status}</span>
                <div style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>Ticket ID: {selectedTicket.displayId}</div>
              </div>

              {activeModalTab === 'Details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Info Table */}
                  <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden' }}>
                    {[
                      { label: 'Student', value: selectedTicket.fullName },
                      { label: 'Contact', value: selectedTicket.contactNumber },
                      { label: 'Preferred Time', value: selectedTicket.preferredTime },
                      { label: 'Category', value: selectedTicket.category },
                      { label: 'Location', value: selectedTicket.location },
                      { label: 'Submitted', value: new Date(selectedTicket.submittedAt).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' }) },
                      { label: 'Technician', value: selectedTicket.technician }
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', padding: '1rem 1.5rem', borderBottom: i === 6 ? 'none' : '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <div style={{ flex: 1, color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>{row.label}</div>
                        <div style={{ flex: 2, color: '#1e293b', fontWeight: '700', fontSize: '0.9rem', textAlign: 'right' }}>{row.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Issue Description */}
                  <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fff' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Issue Description</h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedTicket.description}</p>
                  </div>

                  {/* Attached Images (Mock) */}
                  <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fff' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Attached Images</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1, height: '150px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.8rem', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, height: '150px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.8rem', overflow: 'hidden' }}>
                         <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>

                  {/* Resolution Note */}
                  <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fff' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Resolution Note</h3>
                    <textarea 
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      placeholder="Add technician resolution note"
                      style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', minHeight: '100px', outline: 'none', marginBottom: '1rem' }}
                    />
                    <button 
                      onClick={handleSaveResolution}
                      style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                    >
                      Save Resolution Note
                    </button>
                  </div>
                </div>
              )}

              {activeModalTab === 'Workflow' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Ticket size={18} /> Workflow Actions
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button 
                        onClick={() => handleStatusUpdate('IN_PROGRESS')} 
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', background: '#f3e8ff', color: '#a855f7', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                      >
                        <Clock size={16} /> Mark In Progress
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate('RESOLVED')} 
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', background: '#dcfce7', color: '#10b981', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                      >
                        <UserCheck size={16} /> Mark Resolved
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate('CLOSED')} 
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', background: '#f1f5f9', color: '#64748b', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                      >
                        <XCircle size={16} /> Close Ticket
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate('REJECTED')} 
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', background: '#fee2e2', color: '#ef4444', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                      >
                        Reject Ticket
                      </button>
                    </div>
                  </div>

                  {/* Quick Controls Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#fff' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Assign Technician</h3>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          placeholder="Technician Name"
                          id="techInput"
                          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem', outline: 'none' }}
                        />
                        <button 
                          onClick={() => handleAssign(selectedTicket.ticketId, document.getElementById('techInput').value)}
                          style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Assign
                        </button>
                      </div>
                    </div>

                    <div style={{ padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#fff' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>Change Priority</h3>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                          <button
                            key={p}
                            onClick={() => handlePriorityChange(p)}
                            style={{
                              flex: 1,
                              padding: '0.75rem',
                              borderRadius: '10px',
                              border: 'none',
                              background: selectedTicket.priority === p ? '#3b82f6' : '#f1f5f9',
                              color: selectedTicket.priority === p ? '#fff' : '#64748b',
                              fontWeight: '700',
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div style={{ 
                      padding: '1.5rem', 
                      borderRadius: '16px', 
                      border: `1px solid ${getStatusStyle(selectedTicket.status).color}40`, 
                      background: `${getStatusStyle(selectedTicket.status).background}` 
                    }}>
                      <div style={{ color: getStatusStyle(selectedTicket.status).color, fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Current Status</div>
                      <div style={{ color: getStatusStyle(selectedTicket.status).color, fontSize: '1.2rem', fontWeight: '800' }}>{selectedTicket.status}</div>
                    </div>
                    <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #fef3c7', background: '#fffbeb' }}>
                      <div style={{ color: '#d97706', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Priority</div>
                      <div style={{ color: '#78350f', fontSize: '1.2rem', fontWeight: '800' }}>{selectedTicket.priority}</div>
                    </div>
                    <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fff' }}>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Assigned Technician</div>
                      <div style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '800' }}>{selectedTicket.technician}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'Comments' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fff' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Comments & Updates</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                      {(selectedTicket.comments || []).length === 0 ? (
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>No comments yet.</div>
                      ) : (
                        selectedTicket.comments.map((comment, i) => (
                          <div key={i} style={{ padding: '1rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.7rem', fontWeight: '800', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{comment.author}</div>
                            <div style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: '500' }}>{comment.text}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '0.5rem', textAlign: 'right' }}>{new Date(comment.timestamp).toLocaleString()}</div>
                          </div>
                        ))
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a admin comment or update"
                        style={{ flex: 1, padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                      />
                      <button 
                        onClick={handleAddComment}
                        style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.85rem 1.5rem', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentManagement;
