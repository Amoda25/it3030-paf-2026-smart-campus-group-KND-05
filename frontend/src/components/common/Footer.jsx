import React from 'react';
import { 
  Building2, 
  Globe, 
  X, 
  Mail, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer" style={{ position: 'relative', padding: '60px 0 30px', overflow: 'hidden', background: '#0f172a' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
          <div className="footer-about">
            <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 className="text-white" size={20} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>UniHub</span>
            </Link>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', maxWidth: '320px', lineHeight: 1.5 }}>
              Pioneering the next generation of campus infrastructure management. 
              Our mission is to empower universities with intelligent tools.
            </p>
            <div className="flex gap-3" style={{ marginTop: '1.5rem' }}>
              <a href="#" style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <X size={18} />
              </a>
              <a href="#" style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <Globe size={18} />
              </a>
              <a href="#" style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Platform</h4>
            <ul className="footer-links flex flex-col gap-2" style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/courses" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>Courses</Link></li>
              <li><Link to="/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</Link></li>
              <li><Link to="/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>Integrations</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Company</h4>
            <ul className="footer-links flex flex-col gap-2" style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</Link></li>
              <li><Link to="/" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>Careers</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Stay Updated</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem', marginBottom: '1rem' }}>Subscribe for campus tech updates.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '0.6rem 0.8rem', color: 'white', fontSize: '0.85rem', outline: 'none' }}
              />
              <button className="btn btn-primary" style={{ padding: '0.6rem', border: 'none', background: 'var(--primary)', color: 'white', borderRadius: '10px' }}>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
          <p>© 2026 UniHub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
