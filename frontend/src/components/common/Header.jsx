import React, { useState, useEffect } from 'react';
import { Building2, LogIn, UserPlus, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <Link to="/" className="nav-logo flex items-center gap-3">
          <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(242, 106, 0, 0.1)' }}>
            <Building2 style={{ color: 'var(--secondary)' }} size={24} />
          </div>
          <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800' }}>UniHub</span>
        </Link>

        <nav className="hidden lg-flex items-center gap-8" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Link to="/" className="nav-link" style={{ fontWeight: '600' }}>Home</Link>
          <Link to="/courses" className="nav-link" style={{ fontWeight: '600' }}>Courses</Link>
          <Link to="/facilities" className="nav-link" style={{ fontWeight: '600' }}>Facilities</Link>
          <Link to="/incidents" className="nav-link" style={{ fontWeight: '600' }}>Ticket</Link>
          <Link to="/book" className="nav-link" style={{ fontWeight: '600' }}>Book Resource</Link>
          <Link to="/my-bookings" className="nav-link" style={{ fontWeight: '600' }}>My Bookings</Link>
          <Link to="/dashboard" className="nav-link" style={{ fontWeight: '600' }}>Dashboard</Link>
          <Link to="/profile" className="nav-link" style={{ fontWeight: '600' }}>Profile</Link>
          <Link to="/about" className="nav-link" style={{ fontWeight: '600' }}>About Us</Link>
          <Link to="/contact" className="nav-link" style={{ fontWeight: '600' }}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md-flex items-center gap-3">
             <Link to="/login" className="btn btn-outline" style={{ border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-main)', borderRadius: '99px' }}>
                Login
             </Link>
             <Link to="/register" className="btn btn-primary" style={{ borderRadius: '99px' }}>
                Register
             </Link>
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
      <div className={`lg-hidden fixed ${isMobileMenuOpen ? 'flex' : 'hidden'}`} style={{ top: '52px', left: 0, right: 0, padding: '1rem', background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)', zIndex: 999 }}>
        <div className="glass flex flex-col gap-6" style={{ width: '100%', padding: '2rem', borderRadius: '1.5rem' }}>
          <nav className="flex flex-col gap-4">
            <Link to="/" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/courses" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
            <Link to="/facilities" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Facilities</Link>
            <Link to="/incidents" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Ticket</Link>
            <Link to="/book" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Book Resource</Link>
            <Link to="/my-bookings" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>My Bookings</Link>
            <Link to="/dashboard" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/profile" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
            <Link to="/about" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </nav>
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <div className="flex flex-col gap-3">
             <Link to="/login" className="btn btn-outline" style={{ width: '100%' }} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
             <Link to="/register" className="btn btn-white" style={{ width: '100%' }} onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
