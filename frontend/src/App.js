import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthSuccess from './pages/AuthSuccess';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/App.css';

// Following Single Responsibility Principle - App component only handles routing
function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  {/* CreateTable component will be implemented later */}
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Create Table</h1>
                    <p>This page is under construction.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  {/* Profile component will be implemented later */}
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <p>This page is under construction.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-tables" 
              element={
                <ProtectedRoute>
                  {/* MyTables component will be implemented later */}
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">My Tables</h1>
                    <p>This page is under construction.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Other routes will be added here as we develop more pages */}
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
