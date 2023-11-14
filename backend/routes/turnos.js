const express = require('express');
const router = express.Router();
const Turnos = require('../models/turnos');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');
const mongoose = require('mongoose');

// CRUD operations for turnos
// Implement create, read, update, and delete operations

// Create a new turno
router.post('/create', authorize([Role.Admin, Role.Atleta]),async (req, res) => {
    const { startdate, user, sport } = req.body;
  
    try {
      // Create a new turno document
      const newTurno = new Turnos({
        _id: new mongoose.Types.ObjectId(),
        startdate,
        sport,
      });
  
      // Save the new turno to the database
      await newTurno.save();
  
      res.status(201).json({ message: 'Turno created successfully.', turno: newTurno });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
