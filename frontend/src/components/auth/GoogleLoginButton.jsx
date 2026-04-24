import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LogIn } from 'lucide-react';

const GoogleLoginButton = () => {
    const handleLogin = () => {
        // Redirect to Spring Boot backend Google OAuth endpoint
        window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'}/oauth2/authorization/google`;
    };

    return (
        <button 
            onClick={handleLogin}
            className="btn btn-outline flex items-center justify-center gap-3 w-full"
            style={{ 
                width: '100%',
                background: 'white', 
                border: '1px solid var(--border-light)',
                padding: '0.8rem',
                borderRadius: '12px',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                fontWeight: '600',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
        >
            <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                style={{ width: '18px', height: '18px' }} 
            />
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
