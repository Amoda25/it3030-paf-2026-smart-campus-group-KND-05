import React from 'react';
import { Wrench, Construction } from 'lucide-react';

const IncidentsPage = () => (
  <div style={{ padding: '150px 0', textAlign: 'center', minHeight: '100vh', background: 'var(--bg-deep)' }}>
    <div className="container">
        <div className="glass" style={{ padding: '4rem', borderRadius: '32px', maxWidth: '600px', margin: '0 auto' }}>
            <Wrench size={64} className="text-primary mb-6" style={{ margin: '0 auto 1.5rem auto' }} />
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Incident Management</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>This module is currently under development (Member 3).</p>
            <div className="flex items-center justify-center gap-2" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                <Construction size={20} />
                Coming Soon
            </div>
        </div>
    </div>
  </div>
);

export default IncidentsPage;
