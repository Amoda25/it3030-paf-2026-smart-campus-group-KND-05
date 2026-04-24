import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            login(token);
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, [location, login, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl font-semibold">Processing login...</div>
        </div>
    );
};

export default OAuth2RedirectHandler;
