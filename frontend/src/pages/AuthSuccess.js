import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Following Single Responsibility Principle - this component only handles auth callback
const AuthSuccess = () => {
  const { handleAuthSuccess, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Extract token from URL query parameters
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        
        if (!token) {
          console.error('No token found in URL');
          setError('Authentication failed - no token received');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        // Handle successful authentication
        await handleAuthSuccess(token);
        
        // Wait for authentication to complete
        if (!loading && isAuthenticated) {
          console.log('Authentication successful, redirecting to dashboard');
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Error processing authentication:', err);
        setError('Authentication failed - please try again');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    processAuth();
  }, [location, handleAuthSuccess, navigate, loading, isAuthenticated]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-600">{error}</h2>
          <p className="text-center text-gray-600">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Authenticating...</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
