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
  const [activeView, setActiveView] = useState('report'); // 'tickets', 'report'
  // Image Upload Refs & State
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]); // {file, previewUrl}
  const [priority, setPriority] = useState('MEDIUM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Reporting Form State
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
  
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Component is now focused on reporting only
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.issueTitle.trim()) newErrors.issueTitle = "Issue title is required";
    if (formData.category === 'Select category') newErrors.category = "Please select a category";
    if (formData.faculty === 'Select faculty') newErrors.faculty = "Please select your faculty";
    if (!formData.location || !formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    if (formData.contactNumber) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.contactNumber)) {
        newErrors.contactNumber = "Phone number must be exactly 10 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Live validation
    let fieldError = null;
    if (name === 'contactNumber' && value.trim()) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) fieldError = "Phone number must be exactly 10 digits";
    }
    if (name === 'issueTitle' && value.trim() && value.length < 5) {
      fieldError = "Title should be at least 5 characters";
    }
    if (name === 'description' && value.trim() && value.length < 10) {
      fieldError = "Please provide more details (min 10 chars)";
    }
    if (name === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) fieldError = "Please enter a valid email address";
    }
    if (name === 'category' && value === 'Select category') fieldError = "Please select a category";
    if (name === 'faculty' && value === 'Select faculty') fieldError = "Please select your faculty";

    if (fieldError) {
      setErrors(prev => ({ ...prev, [name]: fieldError }));
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

  const handleReset = (e) => {
    if (e) e.preventDefault();
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
    setImages([]);
    setErrors({});
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
        handleReset();
        
        setTimeout(() => {
          setSuccessMsg('');
          setIsSubmitted(false);
          setActiveView('tickets');
        }, 5000);
      } else {
        throw new Error('Server responded with an error');
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

  return (
    <div className="incidents-dashboard" style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', display: 'flex' }}>
      <main style={{ flex: 1, padding: '2.5rem 3rem', minWidth: 0 }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Incident Reporting</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Report a technical discrepancy to the maintenance unit.</p>
        </header>

        <div className="animate-fade-in">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="glass" style={{ borderRadius: '2rem', background: '#fff', padding: '3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Incident Deployment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '3rem' }}>Report a technical discrepancy to the maintenance unit.</p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Form fields stay the same */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>FULL NAME</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.fullName ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                    {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.fullName}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>FACULTY</label>
                    <div style={{ position: 'relative' }}>
                      <select name="faculty" value={formData.faculty} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.faculty ? '1px solid #ef4444' : '1px solid #e2e8f0', appearance: 'none' }}>
                        <option>Select faculty</option>
                        <option>Faculty of Computing</option>
                        <option>Faculty of Business</option>
                        <option>Faculty of Engineering</option>
                        <option>Faculty of Humanities & Sciences</option>
                        <option>Faculty of Graduate Studies</option>
                      </select>
                      <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
                    </div>
                    {errors.faculty && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.faculty}</span>}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>EMAIL ADDRESS</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.email ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                    {errors.email && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>CONTACT NUMBER</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="10 Digits" style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.contactNumber ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                    {errors.contactNumber && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.contactNumber}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>ISSUE TITLE</label>
                  <input type="text" name="issueTitle" value={formData.issueTitle} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.issueTitle ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                  {errors.issueTitle && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.issueTitle}</span>}
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
                    {errors.category && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.category}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>LOCATION</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Ex: Lab 02, Block A" style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.location ? '1px solid #ef4444' : '1px solid #e2e8f0' }} />
                    {errors.location && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.location}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.6 }}>INCIDENT DESCRIPTION</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: '#f8fafc', border: errors.description ? '1px solid #ef4444' : '1px solid #e2e8f0', minHeight: '120px' }} />
                  {errors.description && <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '700' }}>{errors.description}</span>}
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
          </div>
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
