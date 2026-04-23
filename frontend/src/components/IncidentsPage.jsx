import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Wrench, 
  ShieldAlert, 
  Cpu, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  MapPin, 
  Layers,
  UploadCloud,
  ChevronDown,
  Send,
  RotateCcw,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';

const IncidentsPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const [priority, setPriority] = useState('MEDIUM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]); // {file, previewUrl}
  const [formData, setFormData] = useState({
    fullName: '',
    faculty: 'Select faculty',
    email: '',
    contactNumber: '',
    preferredTime: '',
    issueTitle: '',
    category: 'Select category',
    location: '',
    description: ''
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = "Phone number must be exactly 10 digits";
    }
    
    if (!formData.issueTitle.trim()) {
      newErrors.issueTitle = "Issue title is required";
    } else if (formData.issueTitle.length < 5) {
      newErrors.issueTitle = "Title should be at least 5 characters";
    }
    
    if (formData.category === 'Select category') newErrors.category = "Please select a category";
    if (formData.faculty === 'Select faculty') newErrors.faculty = "Please select your faculty";
    if (!formData.location || !formData.location.trim()) newErrors.location = "Location is required";
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Please provide more details (min 10 chars)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Live validation for the specific field
    let fieldError = null;
    if (name === 'fullName' && !value.trim()) fieldError = "Full name is required";
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) fieldError = "Email is required";
      else if (!emailRegex.test(value)) fieldError = "Please enter a valid email address";
    }
    if (name === 'contactNumber') {
      const phoneRegex = /^\d{10}$/;
      if (!value.trim()) fieldError = "Contact number is required";
      else if (!phoneRegex.test(value)) fieldError = "Phone number must be exactly 10 digits";
    }
    if (name === 'issueTitle') {
      if (!value.trim()) fieldError = "Issue title is required";
      else if (value.length < 5) fieldError = "Title should be at least 5 characters";
    }
    if (name === 'description') {
      if (!value.trim()) fieldError = "Description is required";
      else if (value.length < 10) fieldError = "Please provide more details (min 10 chars)";
    }
    if (name === 'category' && value === 'Select category') fieldError = "Please select a category";
    if (name === 'faculty' && value === 'Select faculty') fieldError = "Please select your faculty";
    if (name === 'location' && (!value || !value.trim())) fieldError = "Location is required";

    setErrors(prev => ({ ...prev, [name]: fieldError }));
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
    // Reset file input value to allow the same file to be selected again if removed
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

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      fullName: '',
      faculty: 'Select faculty',
      email: '',
      contactNumber: '',
      preferredTime: '',
      issueTitle: '',
      category: 'Select category',
      location: '',
      description: ''
    });
    setPriority('MEDIUM');
    setIsSubmitted(false);
    setErrors({});
    
    // Clear images
    images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8081/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          priority: priority
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      const savedTicket = await response.json();
      
      const ticketInfo = {
        id: savedTicket.ticketId,
        category: savedTicket.category,
        location: savedTicket.location,
        submittedAt: new Date(savedTicket.submittedAt).toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true 
        }).replace(/\//g, '-')
      };

      setSubmittedTicket(ticketInfo);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('There was an error submitting your ticket. Please try again.');
    }
  };

  return (
    <div className="incidents-page" style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .btn-hover:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
          }
          .btn-hover:active {
            transform: translateY(0);
          }
          .input-focus:focus {
            border-color: #3b82f6 !important;
            background: #fff !important;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          }
        `}
      </style>      

      {/* Success Modal Pop-up */}
      {isSubmitted && submittedTicket && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(15, 23, 42, 0.4)', 
            backdropFilter: 'blur(8px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div 
            style={{ 
              background: '#f0fdf4', 
              width: '100%',
              maxWidth: '650px', 
              borderRadius: '24px', 
              padding: '2.5rem', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              border: '1px solid #dcfce7',
              animation: 'slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              margin: 'auto'
            }}
          >
            {/* Dismiss Button */}
            <button 
              onClick={() => setIsSubmitted(false)}
              className="btn-hover"
              style={{ 
                position: 'absolute', 
                top: '2rem', 
                right: '2rem', 
                padding: '0.6rem 1.25rem', 
                borderRadius: '12px', 
                background: 'white', 
                border: '1px solid rgba(0,0,0,0.05)', 
                color: '#0f172a', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Dismiss
            </button>

            <div style={{ maxHeight: '95vh', overflowY: 'visible' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#059669', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>TICKET SUBMITTED SUCCESSFULLY</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#064e3b', marginBottom: '0.5rem', lineHeight: 1.2 }}>Your request has been created successfully.</h2>
                <p style={{ color: '#065f46', fontSize: '0.95rem', lineHeight: 1.4, maxWidth: '600px', opacity: 0.8 }}>
                  You can now track the ticket status, assigned technician updates, and resolution from your dashboard.
                </p>
              </div>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid #dcfce7', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)' }}>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.2rem' }}>Ticket ID</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>{submittedTicket.id}</div>
                </div>
                <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid #dcfce7', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)' }}>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.2rem' }}>Status</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>OPEN</div>
                </div>
                <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid #dcfce7', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)' }}>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.2rem' }}>Category</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>{submittedTicket.category}</div>
                </div>
                <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid #dcfce7', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)' }}>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.2rem' }}>Location</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>{submittedTicket.location}</div>
                </div>
                <div style={{ gridColumn: 'span 2', background: 'white', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid #dcfce7', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)' }}>
                  <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.2rem' }}>Submitted At</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111827' }}>{submittedTicket.submittedAt}</div>
                </div>
              </div>

              {/* Bottom Buttons - Aligned Left */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-start' }}>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="btn-hover"
                  style={{ 
                    background: '#059669', 
                    color: 'white', 
                    padding: '0.75rem 1.75rem', 
                    borderRadius: '12px', 
                    border: 'none', 
                    fontWeight: '700', 
                    fontSize: '0.85rem', 
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Details
                </button>
                <button 
                  onClick={(e) => { handleReset(e); setIsSubmitted(false); }}
                  className="btn-hover"
                  style={{ 
                    background: 'white', 
                    color: '#059669', 
                    padding: '0.75rem 1.75rem', 
                    borderRadius: '12px', 
                    border: '1px solid #059669', 
                    fontWeight: '700', 
                    fontSize: '0.85rem', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Raise Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrated Ticket Card - Centered Rounded Box */}
      <div style={{ 
        maxWidth: '1150px', 
        width: '100%', 
        background: '#ffffff', 
        borderRadius: '32px', 
        display: 'flex', 
        overflow: 'hidden', 
        boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.08), 0 30px 60px -30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0,0,0,0.03)',
        minHeight: '750px',
        position: 'relative'
      }}>
        
        {/* Left Sidebar - Information */}
        <div style={{ 
          width: '38%', 
          background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)', 
          padding: '4rem 3.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'relative',
          borderRight: '1px solid rgba(0,0,0,0.03)'
        }}>
          {/* Badge */}

          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            color: '#0f172a'
          }}>
            Raise a campus <br />
            maintenance ticket
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            color: '#475569', 
            lineHeight: 1.6, 
            fontWeight: '500',
            marginBottom: '4rem'
          }}>
            Report projector faults, network issues, classroom damage, electrical problems, and more. 
            Submit your request with priority, location, contact details, and image evidence.
          </p>

        </div>

        {/* Right Area - Form */}
        <div style={{ flex: 1, padding: '4rem', overflowY: 'auto' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Your Information Section */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb', marginBottom: '1.5rem' }}>Your Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <input 
                    className="input-focus"
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1.25rem', 
                      borderRadius: '14px', 
                      border: errors.fullName ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                      background: errors.fullName ? '#fef2f2' : '#f8fafc', 
                      fontSize: '0.95rem', 
                      color: '#0f172a', 
                      transition: 'all 0.2s ease' 
                    }}
                  />
                  {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', paddingLeft: '0.5rem' }}>{errors.fullName}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ position: 'relative' }}>
                    <select 
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      style={{ 
                        width: '100%', 
                        padding: '1rem 1.25rem', 
                        borderRadius: '14px', 
                        border: errors.faculty ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                        background: errors.faculty ? '#fef2f2' : '#f8fafc', 
                        fontSize: '0.95rem', 
                        color: '#0f172a', 
                        appearance: 'none', 
                        cursor: 'pointer' 
                      }}
                    >
                      <option>Select faculty</option>
                      <option>Faculty of Computing</option>
                      <option>Faculty of Business</option>
                      <option>Faculty of Engineering</option>
                      <option>Faculty of Humanities & Sciences</option>
                      <option>Faculty of Graduate Studies</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                  </div>
                  {errors.faculty && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', paddingLeft: '0.5rem' }}>{errors.faculty}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <input 
                    className="input-focus"
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1.25rem', 
                      borderRadius: '14px', 
                      border: errors.email ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                      background: errors.email ? '#fef2f2' : '#f8fafc', 
                      fontSize: '0.95rem', 
                      color: '#0f172a', 
                      transition: 'all 0.2s ease' 
                    }}
                  />
                  {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', paddingLeft: '0.5rem' }}>{errors.email}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <input 
                    className="input-focus"
                    type="text" 
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Contact Number (10 digits)" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1.25rem', 
                      borderRadius: '14px', 
                      border: errors.contactNumber ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                      background: errors.contactNumber ? '#fef2f2' : '#f8fafc', 
                      fontSize: '0.95rem', 
                      color: '#0f172a', 
                      transition: 'all 0.2s ease' 
                    }}
                  />
                  {errors.contactNumber && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', paddingLeft: '0.5rem' }}>{errors.contactNumber}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <input 
                    className="input-focus"
                    type="text" 
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    placeholder="Preferred Contact Time (Ex: AM/PM)" 
                    style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', transition: 'all 0.2s ease' }}
                  />
                </div>
              </div>
            </div>

            {/* Issue Details Section */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb', marginBottom: '1.5rem' }}>Issue Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <input 
                    className="input-focus"
                    type="text" 
                    name="issueTitle"
                    value={formData.issueTitle}
                    onChange={handleInputChange}
                    placeholder="Issue Title (Ex: Projector issue)" 
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1.25rem', 
                      borderRadius: '14px', 
                      border: errors.issueTitle ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                      background: errors.issueTitle ? '#fef2f2' : '#f8fafc', 
                      fontSize: '0.95rem', 
                      color: '#0f172a', 
                      transition: 'all 0.2s ease' 
                    }}
                  />
                  {errors.issueTitle && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', paddingLeft: '0.5rem' }}>{errors.issueTitle}</span>}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ position: 'relative' }}>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{ 
                          width: '100%', 
                          padding: '1rem 1.25rem', 
                          borderRadius: '14px', 
                          border: errors.category ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                          background: errors.category ? '#fef2f2' : '#f8fafc', 
                          fontSize: '0.95rem', 
                          color: '#0f172a', 
                          appearance: 'none', 
                          cursor: 'pointer' 
                        }}
                      >
                        <option>Select category</option>
                        <option>Equipment Fault</option>
                        <option>Facility Damage</option>
                        <option>Network Issue</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                    </div>
                    {errors.category && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600', paddingLeft: '0.2rem' }}>{errors.category}</span>}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <input 
                      className="input-focus"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Select location"
                      style={{ 
                        width: '100%', 
                        padding: '1rem 1.25rem', 
                        borderRadius: '14px', 
                        border: errors.location ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                        background: errors.location ? '#fef2f2' : '#f8fafc', 
                        fontSize: '0.95rem', 
                        color: '#0f172a', 
                        transition: 'all 0.2s ease' 
                      }}
                    />
                    {errors.location && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '600', paddingLeft: '0.2rem' }}>{errors.location}</span>}
                  </div>

                  <div style={{ position: 'relative' }}>
                    <select 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', background: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="LOW">LOW Priority</option>
                      <option value="MEDIUM">MEDIUM Priority</option>
                      <option value="HIGH">HIGH Priority</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <textarea 
                    className="input-focus"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed Description of the incident" 
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      borderRadius: '14px', 
                      border: errors.description ? '1px solid #ef4444' : '1px solid rgba(0,0,0,0.08)', 
                      background: errors.description ? '#fef2f2' : '#f8fafc', 
                      fontSize: '0.95rem', 
                      color: '#0f172a', 
                      minHeight: '120px', 
                      resize: 'vertical' 
                    }}
                  />
                  {errors.description && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', paddingLeft: '0.5rem' }}>{errors.description}</span>}
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
              />
              
              {/* Image Previews */}
              {images.length > 0 && (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {images.map((img, index) => (
                    <div key={index} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                      <img src={img.previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div 
                onClick={() => images.length < 3 && fileInputRef.current?.click()}
                style={{ 
                  border: '2px dashed rgba(59, 130, 246, 0.2)', 
                  borderRadius: '20px', 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'rgba(59, 130, 246, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: images.length < 3 ? 'pointer' : 'not-allowed',
                  opacity: images.length < 3 ? 1 : 0.6
                }}
              >
                <UploadCloud size={32} style={{ color: '#2563eb' }} />
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
                  {images.length < 3 ? 'Upload Images (Max 3)' : 'Maximum Images Uploaded'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {images.length}/3 images selected
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="button" 
                onClick={handleReset}
                className="btn-hover"
                style={{ 
                  flex: 1, 
                  padding: '1.1rem', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(0,0,0,0.1)', 
                  background: 'white', 
                  color: '#0f172a', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <RotateCcw size={18} />
                Reset Form
              </button>
              <button 
                type="submit" 
                className="btn-hover"
                style={{ 
                  flex: 2, 
                  padding: '1.1rem', 
                  borderRadius: '16px', 
                  border: 'none', 
                  background: '#2563eb', 
                  color: 'white', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Send size={18} />
                Submit Maintenance Ticket
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default IncidentsPage;
