const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields related to sports if needed
});

module.exports = mongoose.model('Sports', sportsSchema);
