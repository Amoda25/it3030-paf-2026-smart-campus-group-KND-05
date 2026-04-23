import React, { useState } from 'react';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import campusHero from '../assets/campus_hero.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setError(data.message || 'Invalid email or password.');
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
            <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(242, 106, 0, 0.1)' }}>
              <Building2 style={{ color: 'var(--secondary)' }} size={24} />
            </div>
          </Link>
        </div>

        <div style={{ maxWidth: '440px', width: '100%', margin: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="flex justify-center mb-4">
               <div style={{ background: 'rgba(242, 106, 0, 0.1)', padding: '12px', borderRadius: '16px' }}>
                  <Lock style={{ color: 'var(--secondary)' }} size={48} />
               </div>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@university.edu" 
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: 'var(--text-main)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--secondary)', textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="remember" style={{ width: '1rem', height: '1rem', borderRadius: '4px', cursor: 'pointer' }} />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Remember me for 30 days</label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
              {loading ? '⏳ Signing in...' : <>Sign In <ArrowRight size={18} /></>}
            </button>

            {error && (
              <div style={{ padding: '0.875rem 1rem', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.9rem', fontWeight: '500', textAlign: 'center' }}>
                ❌ {error}
              </div>
            )}

            {success && (
              <div style={{ padding: '0.875rem 1rem', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '0.9rem', fontWeight: '500', textAlign: 'center' }}>
                ✅ {success} Redirecting...
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
              <span style={{ padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>Or Continue With</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
            </div>

            <div className="flex gap-4">
              <button type="button" className="btn btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '0.75rem', color: 'var(--text-main)', fontWeight: '600', background: 'white' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
                 Google
              </button>
            </div>
            
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none' }}>Create an account</Link>
            </p>
          </form>
        </div>
      </div>

      <div style={{ flex: '1.2', display: 'none', position: 'relative', overflow: 'hidden' }} className="lg-flex">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${campusHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(7, 19, 63, 0.85) 0%, rgba(242, 106, 0, 0.4) 100%)' }}></div>
        
        <div style={{ position: 'absolute', top: '15%', right: '15%', width: '400px', height: '400px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(120px)', opacity: '0.2', mixBlendMode: 'screen' }}></div>
        <div style={{ position: 'absolute', bottom: '15%', left: '15%', width: '350px', height: '350px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: '0.15', mixBlendMode: 'screen' }}></div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '4rem', color: 'white', textAlign: 'center' }}>
          <div style={{ padding: '3rem', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '32px', maxWidth: '540px' }}>
             <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff', lineHeight: 1.1 }}>Your Smart Campus Journey Continues</h2>
             <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
               Log in to access personalized schedules, resource bookings, and real-time campus updates.
             </p>
             <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>5k+</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.7, textTransform: 'uppercase' }}>Active Students</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>20+</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.7, textTransform: 'uppercase' }}>Campus Facilities</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>99%</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.7, textTransform: 'uppercase' }}>Uptime</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
