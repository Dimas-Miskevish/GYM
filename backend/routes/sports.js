const express = require('express');
const router = express.Router();
const Sports = require('../models/sports');
const mongoose = require('mongoose');

// Create a new sport
router.post('/create', authorize([Role.Admin, Role.Atleta]), async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the sport with the given name already exists
    const existingSport = await Sports.findOne({ name });
    if (existingSport) {
      return res.status(400).json({ message: 'Sport with this name already exists.' });
    }

    // Create a new sport document
    const newSport = new Sports({_id: new mongoose.Types.ObjectId(), name });

    // Save the new sport to the database
    await newSport.save();

    res.status(201).json({ message: 'Sport created successfully.', sport: newSport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
