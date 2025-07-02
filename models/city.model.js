const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  _id: String,
  id: String,
  name: String,
  country: String,
  continent: String,
  topAttraction: String,
  avgTemp: String,
  airportName: String,
  airportCode: String,
  attractionCount: Number,
  createdAt: {
    _seconds: Number,
    _nanoseconds: Number
  },
  updatedAt: {
    _seconds: Number,
    _nanoseconds: Number
  },
  bestTimeToVisit: [String]
});

const City = mongoose.model('City', citySchema);

module.exports = City; 