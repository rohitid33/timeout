import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create Auth Context
export const AuthContext = createContext();

// Following Single Responsibility Principle - this component only manages auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token in localStorage on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Set axios default headers and credentials
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.withCredentials = true;
        
        // Get user data from API
        const res = await axios.get('/api/users/user/current');
        
        setUser(res.data);
        setError(null);
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
        setError('Failed to authenticate user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = useCallback((token) => {
    console.log('Authentication successful, token received');
    
    if (!token) {
      console.error('No token received');
      setError('Authentication failed - no token received');
      setLoading(false);
      return;
    }

    localStorage.setItem('token', token);
    
    // Set axios defaults
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.withCredentials = true;
    
    // Load user data after successful auth
    const loadUserAfterAuth = async () => {
      try {
        console.log('Fetching user data after authentication');
        const res = await axios.get('/api/users/user/current');
        console.log('User data received:', res.data);
        setUser(res.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Error loading user after auth:', err);
        localStorage.removeItem('token');
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    loadUserAfterAuth();
  }, []);

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  // Context value
  const value = {
    user,
    loading,
    error,
    handleAuthSuccess,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
