import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Following Single Responsibility Principle - Header only handles navigation
const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">Tymout</Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-indigo-200">Home</Link></li>
            <li><Link to="/discover" className="hover:text-indigo-200">Discover</Link></li>
            {isAuthenticated && (
              <>
                <li><Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link></li>
                <li><Link to="/create" className="hover:text-indigo-200">Create Table</Link></li>
              </>
            )}
            <li><Link to="/about" className="hover:text-indigo-200">About</Link></li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img 
                    src={user?.profilePicture || "https://via.placeholder.com/40"} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:inline">{user?.name || 'User'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/my-tables" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Tables</Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">Login</Link>
              <Link to="/signup" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100">Sign Up</Link>
            </>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-2">
          <nav>
            <ul className="space-y-2">
              <li><Link to="/" className="block py-2 hover:text-indigo-200">Home</Link></li>
              <li><Link to="/discover" className="block py-2 hover:text-indigo-200">Discover</Link></li>
              {isAuthenticated && (
                <>
                  <li><Link to="/dashboard" className="block py-2 hover:text-indigo-200">Dashboard</Link></li>
                  <li><Link to="/create" className="block py-2 hover:text-indigo-200">Create Table</Link></li>
                </>
              )}
              <li><Link to="/about" className="block py-2 hover:text-indigo-200">About</Link></li>
              {isAuthenticated ? (
                <>
                  <li><Link to="/profile" className="block py-2 hover:text-indigo-200">Profile</Link></li>
                  <li><Link to="/my-tables" className="block py-2 hover:text-indigo-200">My Tables</Link></li>
                  <li>
                    <button 
                      onClick={logout} 
                      className="block w-full text-left py-2 text-white hover:text-indigo-200"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="block py-2 hover:text-indigo-200">Login</Link></li>
                  <li><Link to="/signup" className="block py-2 hover:text-indigo-200">Sign Up</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
