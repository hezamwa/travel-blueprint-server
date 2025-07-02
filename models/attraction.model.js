const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  _id: String,
  cityId: String,
  city: String,
  id: String,
  name: String,
  type: String,
  description: String,
  country: String,
  continent: String,
  createdAt: {
    _seconds: Number,
    _nanoseconds: Number
  },
  updatedAt: {
    _seconds: Number,
    _nanoseconds: Number
  }
});

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction; 