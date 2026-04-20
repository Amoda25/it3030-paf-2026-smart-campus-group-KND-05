import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Users,
  Laptop,
  ArrowLeft
} from 'lucide-react';

const BookingForm = () => {
  const location = useLocation();
  const preSelected = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    sid: '',
    resourceType: preSelected.resourceType || '',
    resourceName: preSelected.resourceName || '',
    bookingDate: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });

  const [step, setStep] = useState(1);
  const isPreSelected = !!(preSelected.resourceType && preSelected.resourceName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const resourceTypes = [
    { id: 'lecture-hall', name: 'Lecture Hall', icon: <Building2 size={20} /> },
    { id: 'lab', name: 'Laboratory', icon: <Users size={20} /> },
    { id: 'meeting-room', name: 'Meeting Room', icon: <Users size={20} /> },
    { id: 'equipment', name: 'Equipment', icon: <Laptop size={20} /> }
  ];

  const resources = {
    'lecture-hall': ['Main Hall', 'Auditorium A', 'Mini Theater'],
    'lab': ['Computing Lab 01', 'Electronics Lab', 'Physics Lab'],
    'meeting-room': ['Conference Room 01', 'Board Room', 'Small Meeting Room'],
    'equipment': ['Projector Set', 'Portable PA System', 'Laptops (Bulk)']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const nextStep = () => {
    if (step === 1 && (!formData.fullName || !formData.sid)) {
      setError('Please fill in all personal details');
      return;
    }
    if (step === 2 && (!formData.resourceType || !formData.resourceName)) {
      setError('Please select a resource');
      return;
    }
    
    if (step === 1 && isPreSelected) {
      setStep(3);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step === 3 && isPreSelected) {
      setStep(1);
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Backend port is 8081
      const response = await fetch('http://localhost:8081/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error('Failed to submit booking. Ensure backend is running.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="section-padding flex items-center justify-center min-vh-100">
        <div className="glass text-center p-12" style={{ borderRadius: '2rem', maxWidth: '500px' }}>
          <div className="mb-6 flex justify-center">
            <div className="flex items-center justify-center" style={{ width: '80px', height: '80px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '50%' }}>
              <CheckCircle2 size={48} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Request for <strong>{formData.resourceName}</strong> submitted.
          </p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding" style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-12">
          <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Campus Scheduler</span>
          <h1 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>Reserve a Resource</h1>
        </div>

        {isPreSelected && (
          <div className="glass mb-8 flex items-center justify-between p-6" style={{ borderRadius: '1.5rem' }}>
            <div className="flex items-center gap-4">
              <div style={{ width: '56px', height: '56px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>{formData.resourceName}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{formData.resourceType}</p>
              </div>
            </div>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => window.history.back()}>Change</button>
          </div>
        )}

        <div className="glass p-8 lg-p-12" style={{ borderRadius: '2rem' }}>
          <form onSubmit={handleSubmit}>
             {step === 1 && (
               <div className="flex flex-col gap-6">
                 <input className="px-4 py-3" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} style={{ borderRadius: '12px', border: '1px solid var(--border-light)' }} />
                 <input className="px-4 py-3" name="sid" placeholder="ID Number" value={formData.sid} onChange={handleInputChange} style={{ borderRadius: '12px', border: '1px solid var(--border-light)' }} />
                 {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}
               </div>
             )}
             
             {step === 2 && (
               <div className="grid grid-cols-2 gap-4">
                 {resourceTypes.map(type => (
                   <div key={type.id} onClick={() => setFormData(p => ({...p, resourceType: type.id, resourceName: resources[type.id][0]}))} className={`p-6 cursor-pointer border-2 transition-all ${formData.resourceType === type.id ? 'border-primary' : 'border-transparent'}`} style={{ borderRadius: '16px', background: '#f8fafc' }}>
                     <div className="flex flex-col items-center gap-2">
                       {type.icon}
                       <span>{type.name}</span>
                     </div>
                   </div>
                 ))}
               </div>
             )}

             {step === 3 && (
               <div className="flex flex-col gap-6">
                 <input type="date" className="px-4 py-3" name="bookingDate" value={formData.bookingDate} onChange={handleInputChange} style={{ borderRadius: '12px', border: '1px solid var(--border-light)' }} />
                 <div className="flex gap-4">
                   <input type="time" className="flex-1 px-4 py-3" name="startTime" value={formData.startTime} onChange={handleInputChange} style={{ borderRadius: '12px', border: '1px solid var(--border-light)' }} />
                   <input type="time" className="flex-1 px-4 py-3" name="endTime" value={formData.endTime} onChange={handleInputChange} style={{ borderRadius: '12px', border: '1px solid var(--border-light)' }} />
                 </div>
                 <textarea className="px-4 py-3" name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleInputChange} style={{ borderRadius: '12px', border: '1px solid var(--border-light)' }}></textarea>
               </div>
             )}

             <div className="flex justify-between mt-12">
               {step > 1 && <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>}
               {step < 3 ? (
                 <button type="button" className="btn btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>Next</button>
               ) : (
                 <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginLeft: 'auto' }}>{isSubmitting ? '...' : 'Confirm'}</button>
               )}
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
