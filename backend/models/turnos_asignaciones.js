const mongoose = require('mongoose');

const turnoAsignacionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  turno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turnos', // Reference to the Turnos model
    required: true,
  },
});

module.exports = mongoose.model('TurnoAsignacion', turnoAsignacionSchema);
