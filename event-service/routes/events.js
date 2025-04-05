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

// Mock events (tables) for demonstration
const mockEvents = [
  {
    id: '1',
    title: 'Coffee & Conversation',
    description: 'Join us for a casual coffee meetup to discuss various topics and meet new people.',
    host: {
      id: '1',
      name: 'Priya M.'
    },
    location: 'Brew Haven Café, Mumbai',
    date: '2025-04-10T10:30:00Z',
    maxAttendees: 8,
    attendees: [
      { id: '1', name: 'Priya M.' },
      { id: '2', name: 'Rahul S.' }
    ],
    tags: ['Coffee', 'Casual', 'Networking'],
    entryFee: 0,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Tech Enthusiasts Meetup',
    description: 'A gathering for tech enthusiasts to discuss the latest trends and innovations.',
    host: {
      id: '2',
      name: 'Rahul S.'
    },
    location: 'Digital Hub, Bangalore',
    date: '2025-04-11T14:00:00Z',
    maxAttendees: 10,
    attendees: [
      { id: '2', name: 'Rahul S.' },
      { id: '3', name: 'Ananya K.' }
    ],
    tags: ['Technology', 'Networking', 'Learning'],
    entryFee: 100,
    status: 'upcoming'
  }
];

// @route   GET /events
// @desc    Get all events
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json(mockEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const event = mockEvents.find(event => event.id === req.params.id);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /events
// @desc    Create a new event
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('description', 'Description is required').not().isEmpty(),
      body('location', 'Location is required').not().isEmpty(),
      body('date', 'Date is required').isISO8601(),
      body('maxAttendees', 'Maximum attendees must be a positive number').isInt({ min: 1 }),
      body('tags', 'Tags must be an array').isArray()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, location, date, maxAttendees, tags, entryFee = 0 } = req.body;

      // Create new event (in a real app, this would save to the database)
      const newEvent = {
        id: Date.now().toString(),
        title,
        description,
        host: {
          id: req.user.id,
          name: 'Test User' // In a real app, this would be fetched from the user service
        },
        location,
        date,
        maxAttendees,
        attendees: [
          { id: req.user.id, name: 'Test User' } // Host is automatically an attendee
        ],
        tags,
        entryFee,
        status: 'upcoming'
      };

      mockEvents.push(newEvent);

      res.json(newEvent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /events/:id
// @desc    Update an event
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      body('title', 'Title is required').optional().not().isEmpty(),
      body('description', 'Description is required').optional().not().isEmpty(),
      body('location', 'Location is required').optional().not().isEmpty(),
      body('date', 'Date is required').optional().isISO8601(),
      body('maxAttendees', 'Maximum attendees must be a positive number').optional().isInt({ min: 1 }),
      body('tags', 'Tags must be an array').optional().isArray()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const eventIndex = mockEvents.findIndex(event => event.id === req.params.id);
      
      if (eventIndex === -1) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      // Check if user is the host
      if (mockEvents[eventIndex].host.id !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to update this event' });
      }

      const { title, description, location, date, maxAttendees, tags, entryFee, status } = req.body;

      // Update event (in a real app, this would update the database)
      mockEvents[eventIndex] = {
        ...mockEvents[eventIndex],
        title: title || mockEvents[eventIndex].title,
        description: description || mockEvents[eventIndex].description,
        location: location || mockEvents[eventIndex].location,
        date: date || mockEvents[eventIndex].date,
        maxAttendees: maxAttendees || mockEvents[eventIndex].maxAttendees,
        tags: tags || mockEvents[eventIndex].tags,
        entryFee: entryFee !== undefined ? entryFee : mockEvents[eventIndex].entryFee,
        status: status || mockEvents[eventIndex].status
      };

      res.json(mockEvents[eventIndex]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /events/:id
// @desc    Delete an event
// @access  Private
router.delete('/:id', auth, (req, res) => {
  try {
    const eventIndex = mockEvents.findIndex(event => event.id === req.params.id);
    
    if (eventIndex === -1) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is the host
    if (mockEvents[eventIndex].host.id !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this event' });
    }

    // Remove event from array (in a real app, this would delete from the database)
    mockEvents.splice(eventIndex, 1);

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /events/:id/join
// @desc    Request to join an event
// @access  Private
router.post('/:id/join', auth, (req, res) => {
  try {
    const eventIndex = mockEvents.findIndex(event => event.id === req.params.id);
    
    if (eventIndex === -1) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if event is full
    if (mockEvents[eventIndex].attendees.length >= mockEvents[eventIndex].maxAttendees) {
      return res.status(400).json({ msg: 'Event is already full' });
    }

    // Check if user is already an attendee
    if (mockEvents[eventIndex].attendees.some(attendee => attendee.id === req.user.id)) {
      return res.status(400).json({ msg: 'Already joined this event' });
    }

    // In a real app, this would create a join request in the request service
    // For now, just add the user to attendees
    mockEvents[eventIndex].attendees.push({
      id: req.user.id,
      name: 'Test User' // In a real app, this would be fetched from the user service
    });

    res.json({ msg: 'Successfully joined the event', event: mockEvents[eventIndex] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /events/:id/leave
// @desc    Leave an event
// @access  Private
router.post('/:id/leave', auth, (req, res) => {
  try {
    const eventIndex = mockEvents.findIndex(event => event.id === req.params.id);
    
    if (eventIndex === -1) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is the host
    if (mockEvents[eventIndex].host.id === req.user.id) {
      return res.status(400).json({ msg: 'Host cannot leave the event' });
    }

    // Check if user is an attendee
    const attendeeIndex = mockEvents[eventIndex].attendees.findIndex(attendee => attendee.id === req.user.id);
    if (attendeeIndex === -1) {
      return res.status(400).json({ msg: 'Not an attendee of this event' });
    }

    // Remove user from attendees
    mockEvents[eventIndex].attendees.splice(attendeeIndex, 1);

    res.json({ msg: 'Successfully left the event', event: mockEvents[eventIndex] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
