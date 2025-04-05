const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Following Single Responsibility Principle - this file only handles Google authentication routes

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'tymout_jwt_secret_key_change_in_production';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3010';

// @route   GET /auth/google
// @desc    Authenticate with Google
// @access  Public
router.get(
  '/',
  (req, res, next) => {
    console.log('Google auth route accessed');
    next();
  },
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'consent' 
  })
);

// @route   GET /auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get(
  '/callback',
  (req, res, next) => {
    console.log('Google auth callback route accessed');
    console.log('Query parameters:', req.query);
    next();
  },
  passport.authenticate('google', { 
    failureRedirect: `${FRONTEND_URL}/login?error=auth_failed`,
    session: true
  }),
  (req, res) => {
    try {
      console.log('Google auth callback successful');
      console.log('User authenticated:', req.user ? req.user.id : 'No user');
      
      if (!req.user) {
        console.error('No user found after authentication');
        return res.redirect(`${FRONTEND_URL}/login?error=no_user`);
      }

      // Create JWT with user ID
      const token = jwt.sign(
        { id: req.user.id },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      console.log('JWT token created, redirecting to frontend');
      
      // Redirect to frontend with token
      res.redirect(`${FRONTEND_URL}/auth/success?token=${token}`);
    } catch (err) {
      console.error('Error in Google callback:', err);
      res.redirect(`${FRONTEND_URL}/login?error=server_error`);
    }
  }
);

// @route   GET /auth/google/current
// @desc    Get current user from Google auth
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  try {
    // Return user without sensitive information
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error('Error getting current user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
