import React, { useState, useEffect } from 'react';
import { Building2, Menu, X, ArrowRight, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
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
          <Link to="/facilities-dashboard" className="nav-link" style={{ fontWeight: '600' }}>Facilities & Assets</Link>
          <Link to="/dashboard" className="nav-link" style={{ fontWeight: '600' }}>Dashboard</Link>
          <Link to="/profile" className="nav-link" style={{ fontWeight: '600' }}>Profile</Link>
          <Link to="/about" className="nav-link" style={{ fontWeight: '600' }}>About Us</Link>
          <Link to="/contact" className="nav-link" style={{ fontWeight: '600' }}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md-flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-medium">{user.email.split('@')[0]}</span>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                  <LogOut size={14} className="mr-2" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>
                Login
              </Link>
            )}
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
            <Link to="/facilities-dashboard" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Facilities & Assets</Link>
            <Link to="/dashboard" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/profile" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
            <Link to="/about" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="nav-link" style={{ fontSize: '1.1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </nav>
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <div className="flex flex-col gap-3">
            {isAuthenticated && (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="btn btn-outline" style={{ width: '100%' }}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
