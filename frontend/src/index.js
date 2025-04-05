import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './styles/index.css';
import App from './App';

// Set up axios defaults for API requests
axios.defaults.baseURL = 'http://localhost:3000'; // API Gateway URL is on port 3000
axios.defaults.withCredentials = true; // Enable cookies for cross-origin requests

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
