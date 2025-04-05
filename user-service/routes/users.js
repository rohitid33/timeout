const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Middleware for authentication (in a real app, this would verify JWT tokens)
// Following Single Responsibility Principle - auth middleware only handles authentication
const auth = (req, res, next) => {
  // Mock authentication for demonstration
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // In a real app, this would verify the token
    req.user = { id: '1' }; // Mock user ID
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    bio: 'I love meeting new people and exploring new interests.',
    interests: ['Coffee', 'Technology', 'Books'],
    profilePicture: 'user1.jpg',
    verified: true
  }
];

// @route   GET /users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, (req, res) => {
  try {
    const user = mockUsers.find(user => user.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Don't send password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const user = mockUsers.find(user => user.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Only send public information
    const publicUser = {
      id: user.id,
      name: user.name,
      bio: user.bio,
      interests: user.interests,
      profilePicture: user.profilePicture,
      verified: user.verified
    };

    res.json(publicUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    [
      body('name', 'Name is required').not().isEmpty(),
      body('bio', 'Bio cannot exceed 500 characters').isLength({ max: 500 }),
      body('interests', 'Interests must be an array').isArray()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userIndex = mockUsers.findIndex(user => user.id === req.user.id);
      
      if (userIndex === -1) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const { name, bio, interests } = req.body;

      // Update user (in a real app, this would update the database)
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        name: name || mockUsers[userIndex].name,
        bio: bio || mockUsers[userIndex].bio,
        interests: interests || mockUsers[userIndex].interests
      };

      res.json(mockUsers[userIndex]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST /users/verify
// @desc    Submit verification request
// @access  Private
router.post('/verify', auth, (req, res) => {
  try {
    const userIndex = mockUsers.findIndex(user => user.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // In a real app, this would initiate a verification process
    // For now, just mark the user as verified
    mockUsers[userIndex].verified = true;

    res.json({ msg: 'Verification request submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
