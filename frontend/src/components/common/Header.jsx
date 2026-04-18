import React, { useState, useEffect } from 'react';
import { Building2, LogIn, UserPlus, Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between items-center relative" style={{ height: '100%', width: '100%' }}>
        <a href="/" className="nav-logo flex items-center gap-3">
          <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)' }}>
            <Building2 className="text-primary" size={24} />
          </div>
          <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800' }}>UniHub</span>
        </a>

        <nav className="hidden lg-flex items-center gap-8" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="/" className="nav-link" style={{ fontWeight: '600' }}>Home</a>
          <a href="#features" className="nav-link" style={{ fontWeight: '600' }}>Features</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md-flex items-center gap-3">
             <a href="/login" className="btn btn-outline" style={{ border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-main)', borderRadius: '99px' }}>
                Login
             </a>
             <a href="/register" className="btn btn-primary" style={{ borderRadius: '99px' }}>
                Register
             </a>
          </div>
          
          <button 
            className="lg-hidden flex items-center justify-center"
            style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 0, 0, 0.1)', color: 'var(--text-main)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg-hidden fixed ${isMobileMenuOpen ? 'flex' : 'hidden'}`} style={{ top: '80px', left: 0, right: 0, padding: '1rem', background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)', zIndex: 999 }}>
        <div className="glass flex flex-col gap-6" style={{ width: '100%', padding: '2rem', borderRadius: '1.5rem' }}>
          <nav className="flex flex-col gap-4">
            <a href="#features" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#solutions" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Solutions</a>
            <a href="#about" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
          </nav>
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <div className="flex flex-col gap-3">
             <a href="/login" className="btn btn-outline" style={{ width: '100%' }}>Login</a>
             <a href="/register" className="btn btn-white" style={{ width: '100%' }}>Register</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
