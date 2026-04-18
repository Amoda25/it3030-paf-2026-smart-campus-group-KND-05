import React from 'react';
import { 
  Building2, 
  Globe, 
  X, 
  Mail, 
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="main-footer" style={{ position: 'relative', padding: '100px 0 40px', overflow: 'hidden', background: '#0f172a' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
          <div className="footer-about">
            <a href="/" className="flex items-center gap-3" style={{ textDecoration: 'none', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 className="text-white" size={24} />
              </div>
              <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white' }}>UniHub</span>
            </a>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem', maxWidth: '320px', lineHeight: 1.6 }}>
              Pioneering the next generation of campus infrastructure management. 
              Our mission is to empower universities with intelligent, data-driven 
              operational tools.
            </p>
            <div className="flex gap-4" style={{ marginTop: '2rem' }}>
              <a href="#" style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <X size={20} />
              </a>
              <a href="#" style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <Globe size={20} />
              </a>
              <a href="#" style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.25rem' }}>Platform</h4>
            <ul className="footer-links flex flex-col gap-3" style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#features" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontWeight: 500 }}>Features</a></li>
              <li><a href="#solutions" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontWeight: 500 }}>Solutions</a></li>
              <li><a href="#integrations" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontWeight: 500 }}>Integrations</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.25rem' }}>Company</h4>
            <ul className="footer-links flex flex-col gap-3" style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#about" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontWeight: 500 }}>About Us</a></li>
              <li><a href="#careers" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontWeight: 500 }}>Careers</a></li>
              <li><a href="#blog" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontWeight: 500 }}>Latest News</a></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Stay Updated</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Join our newsletter for latest updates on campus tech.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'white', outline: 'none' }}
              />
              <button className="btn btn-primary" style={{ padding: '0.75rem', border: 'none', background: 'var(--primary)', color: 'white', borderRadius: '12px' }}>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', fontWeight: '600' }}>
          <p>© 2026 UniHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
