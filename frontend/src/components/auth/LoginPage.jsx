import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';

const LoginPage = () => {
  return (
    <div className="login-page" style={{ 
      minHeight: 'calc(100vh - 52px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-deep)',
      padding: '2rem'
    }}>
      <div className="glass" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem', 
        borderRadius: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div className="flex items-center justify-center mb-6" style={{ 
          width: '52px', 
          height: '52px', 
          borderRadius: '14px', 
          background: 'rgba(242, 106, 0, 0.1)',
          color: 'var(--secondary)'
        }}>
          <ShieldCheck size={26} />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Enter your credentials to access your campus portal.
        </p>

        <form className="w-full flex flex-col gap-5" style={{ width: '100%', textAlign: 'left' }}>
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. name@university.edu" 
              className="glass"
              style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--border-light)', outline: 'none' }}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
              <Link to="/" style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '600' }}>Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="glass"
              style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--border-light)', outline: 'none' }}
            />
          </div>

          <button className="btn btn-primary" style={{ padding: '0.8rem', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
        </div>

        <div className="w-full" style={{ width: '100%' }}>
          <GoogleLoginButton />
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', width: '100%' }}>
          <Link to="/" className="flex items-center justify-center gap-2 text-sm font-semibold hover:text-orange-600 transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
