import React, { useState } from 'react';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import api from '../services/api'; // We will override this locally below
import campusHero from '../assets/campus_hero.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setSuccess('');

    try {
      // BRUTE FORCE FIX: Hardcoded absolute URL to bypass the api.js configuration
      const response = await api.post('http://localhost:8080/api/v1/auth/login', formData);
      const { token, user } = response.data;

      dispatch(loginSuccess({
        token,
        user: user.email,
        role: user.role
      }));

      setSuccess('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Login Success - Credential Received:", credentialResponse);
    dispatch(loginStart());
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded JWT Payload:", decoded);

      console.log("Sending token to backend: http://localhost:8080/api/v1/auth/google");

      // BRUTE FORCE FIX: Hardcoded absolute URL for Google Auth as well
      const response = await api.post('http://localhost:8080/api/v1/auth/google', {
        email: decoded.email,
        name: decoded.name,
        token: credentialResponse.credential
      });

      console.log("Backend Auth Response:", response.data);
      const { token, user } = response.data;

      dispatch(loginSuccess({
        token,
        user: user.email,
        role: user.role
      }));

      setSuccess('Google Login successful!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error("Backend Auth Error:", err);
      if (err.response) {
        console.error("Error Status:", err.response.status);
        console.error("Error Data:", err.response.data);
      }
      dispatch(loginFailure(err.response?.data?.message || 'Google backend authentication failed'));
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', marginTop: '80px', background: 'var(--bg-deep)' }}>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
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
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'white', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
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

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={(error) => {
                  console.error("Google Login Library Error:", error);
                  dispatch(loginFailure('Google login library failed to initialize or authenticate'));
                }}
                useOneTap
                theme="filled_blue"
                shape="pill"
              />
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
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '4rem', color: 'white', textAlign: 'center' }}>
          <div style={{ padding: '3rem', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '32px', maxWidth: '540px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#ffffff', lineHeight: 1.1 }}>Your Smart Campus Journey Continues</h2>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Log in to access personalized schedules, resource bookings, and real-time campus updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;