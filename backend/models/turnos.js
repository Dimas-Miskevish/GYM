const mongoose = require('mongoose');

const turnosSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startdate: {
    type: Date,
    required: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sports', // Reference to the Sports model
    required: true,
  }
});

module.exports = mongoose.model('Turnos', turnosSchema);
