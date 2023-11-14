const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { secret } = require('../config.json');

// User login
router.post('/login', async (req, res) => {
  // Validate user credentials
  const { username, password } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    // User is authenticated, create a JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      secret, // Replace with a secret key for JWT
      { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User logout (optional)
router.post('/logout', (req, res) => {
    const oldToken = req.body.token; // Assuming the client sends the old token
  
    // The server doesn't need to do anything special to "logout" the old token.
    // Clients must obtain a new token with /auth/login after the old token expires.
  
    res.status(200).json({ message: 'Logout successful. Token is invalidated.' });
  });

module.exports = router;