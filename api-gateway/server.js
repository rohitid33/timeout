const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');

// Load environment variables
dotenv.config({ path: '../.env' });

// Following Single Responsibility Principle - server.js only handles server setup and routing
const app = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

// Get service ports from environment variables
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT || 3001;
const EVENT_SERVICE_PORT = process.env.EVENT_SERVICE_PORT || 3002;
const DISCOVERY_SERVICE_PORT = process.env.DISCOVERY_SERVICE_PORT || 3003;
const REQUEST_SERVICE_PORT = process.env.REQUEST_SERVICE_PORT || 3004;
const NOTIFICATION_SERVICE_PORT = process.env.NOTIFICATION_SERVICE_PORT || 3005;
const FEEDBACK_SERVICE_PORT = process.env.FEEDBACK_SERVICE_PORT || 3006;
const SAFETY_SERVICE_PORT = process.env.SAFETY_SERVICE_PORT || 3007;
const PAYMENT_SERVICE_PORT = process.env.PAYMENT_SERVICE_PORT || 3008;
const PARTNERSHIP_SERVICE_PORT = process.env.PARTNERSHIP_SERVICE_PORT || 3009;

// Middleware
app.use(
  session({
    secret: process.env.COOKIE_KEY || 'tymout_cookie_secret_key_change_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3010',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet()); // Security headers
app.use(express.json());
app.use(morgan('dev')); // Logging

// Routes to microservices
app.use('/api/users', createProxyMiddleware({ 
  target: `http://localhost:${USER_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/users': ''},
  // Enable cookies for Google OAuth
  cookieDomainRewrite: {
    '*': 'localhost'
  },
  onProxyRes: (proxyRes, req, res) => {
    // Handle redirects from the user service
    if (proxyRes.headers.location) {
      // Rewrite the location header to include /api/users prefix
      const location = proxyRes.headers.location;
      if (location.startsWith('/auth')) {
        proxyRes.headers.location = `/api/users${location}`;
      } else if (location.includes('/auth/success')) {
        // Make sure the success redirect goes to the correct frontend URL
        proxyRes.headers.location = location.replace('http://localhost:3000', process.env.FRONTEND_URL);
      }
    }
  }
}));

app.use('/api/events', createProxyMiddleware({ 
  target: `http://localhost:${EVENT_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/events': ''}
}));

app.use('/api/discovery', createProxyMiddleware({ 
  target: `http://localhost:${DISCOVERY_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/discovery': ''}
}));

app.use('/api/requests', createProxyMiddleware({ 
  target: `http://localhost:${REQUEST_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/requests': ''}
}));

app.use('/api/notifications', createProxyMiddleware({ 
  target: `http://localhost:${NOTIFICATION_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/notifications': ''}
}));

app.use('/api/feedback', createProxyMiddleware({ 
  target: `http://localhost:${FEEDBACK_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/feedback': ''}
}));

app.use('/api/safety', createProxyMiddleware({ 
  target: `http://localhost:${SAFETY_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/safety': ''}
}));

app.use('/api/payments', createProxyMiddleware({ 
  target: `http://localhost:${PAYMENT_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/payments': ''}
}));

app.use('/api/partnerships', createProxyMiddleware({ 
  target: `http://localhost:${PARTNERSHIP_SERVICE_PORT}`, 
  changeOrigin: true,
  pathRewrite: {'^/api/partnerships': ''}
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'api-gateway' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
