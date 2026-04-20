import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import campusHero from '../assets/campus_hero.png';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student / Standard User'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side password match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        // Redirect to login after 2 seconds
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', marginTop: '80px', background: 'var(--bg-deep)' }}>
      {/* Left Form Area */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)' }}>
              <Building2 className="text-primary" size={24} />
            </div>
          </Link>
        </div>

        <div style={{ maxWidth: '440px', width: '100%', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="flex justify-center mb-4">
               <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '16px' }}>
                 {/* Academic cap icon as an SVG similar to image */}
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L2 9L12 14L22 9L12 4Z" fill="#1e40af"/>
                    <path d="M22 9L12 14V20L22 15V9Z" fill="#3b82f6"/>
                    <path d="M2 9L12 14V20L2 15V9Z" fill="#60a5fa"/>
                    <path d="M6 11V16C6 16 9 19 12 19C15 19 18 16 18 16V11" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                 </svg>
               </div>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Join UniHub</h1>
            <p style={{ color: '#64748b' }}>Global learning community</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name" 
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#0f172a', fontSize: '1rem', outline: 'none' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@university.edu" 
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#0f172a', fontSize: '1rem', outline: 'none' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#0f172a', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirm</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#0f172a', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Role</label>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '2px solid #3b82f6', background: 'white', color: '#0f172a', fontSize: '1rem', outline: 'none', appearance: 'none', cursor: 'pointer' }}
              >
                <option value="Student / Standard User">Student / Standard User</option>
                <option value="Technician / Researcher">Technician / Researcher</option>
              </select>
            </div>

             <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', borderRadius: '12px', fontSize: '1.05rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
              {loading ? '⏳ Creating Account...' : 'Create Account'}
            </button>

            {/* Error Message */}
            {error && (
              <div style={{ padding: '0.875rem 1rem', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.9rem', fontWeight: '500', textAlign: 'center' }}>
                ❌ {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div style={{ padding: '0.875rem 1rem', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '0.9rem', fontWeight: '500', textAlign: 'center' }}>
                ✅ {success} Redirecting to login...
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              <span style={{ padding: '0 1rem', color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Or Join With</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            </div>

            <div className="flex gap-4">
              <button type="button" className="btn btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem', color: '#0f172a', fontWeight: '600', background: 'white' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
                 Google Sign Up
              </button>
            </div>
            
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
              Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>Log in</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Image Area */}
      <div style={{ flex: '1', display: 'none', position: 'relative', overflow: 'hidden' }} className="lg-flex">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${campusHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}></div>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: '#3b82f6', borderRadius: '50%', filter: 'blur(100px)', opacity: '0.3', mixBlendMode: 'screen' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '250px', height: '250px', background: '#60a5fa', borderRadius: '50%', filter: 'blur(80px)', opacity: '0.2', mixBlendMode: 'screen' }}></div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '4rem', color: 'white', textAlign: 'center' }}>
          <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '24px', maxWidth: '480px' }}>
             <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#ffffff', lineHeight: 1.2 }}>Empower Your Campus Experience</h2>
             <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '2rem' }}>
               Join UniHub to manage facility requests, track maintenance tasks, and connect with peers seamlessly.
             </p>
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '600' }}>
                  Student Portal
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '600' }}>
                  Admin Controls
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
