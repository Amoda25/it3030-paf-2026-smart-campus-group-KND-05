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
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
