const express = require('express');
const router = express.Router();
const TurnoAsignacion = require('../models/turnos_asignaciones');
const Turnos = require('../models/turnos');
const User = require('../models/user');
const mongoose = require('mongoose');

// Create a new turno_asignacion
router.post('/create', authorize([Role.Admin, Role.Atleta]), async (req, res) => {
  const { userId, turnoId } = req.body;

  try {
    // Check if the user and turno exist
    const user = await User.findById(userId);
    const turno = await Turnos.findById(turnoId);

    if (!user || !turno) {
      return res.status(400).json({ message: 'User or turno not found.' });
    }

    // Check if the turno is already assigned to the user
    const existingAsignacion = await TurnoAsignacion.findOne({ user: userId, turno: turnoId });
    if (existingAsignacion) {
      return res.status(400).json({ message: 'Turno is already assigned to the user.' });
    }

    // Create a new turno_asignacion document
    const newAsignacion = new TurnoAsignacion({_id: new mongoose.Types.ObjectId(),
        user: userId, turno: turnoId });

    // Save the new turno_asignacion to the database
    await newAsignacion.save();

    res.status(201).json({ message: 'Turno asignacion created successfully.', asignacion: newAsignacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/user/:userId', authorize([Role.Admin, Role.Atleta]), async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find all turno_asignacion records for the specified user
      const userTurnoAsignaciones = await TurnoAsignacion.find({ user: userId })
      .populate('turno');

      res.status(200).json(userTurnoAsignaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
