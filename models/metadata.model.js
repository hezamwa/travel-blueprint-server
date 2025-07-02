const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  _id: String,
  createdAt: {
    _seconds: Number,
    _nanoseconds: Number
  },
  description: String,
  totalCountries: Number,
  totalCities: Number,
  totalAttractions: Number,
  totalExchangeRates: Number,
  lastUpdated: {
    _seconds: Number,
    _nanoseconds: Number
  },
  migrationCompleted: {
    _seconds: Number,
    _nanoseconds: Number
  }
});

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata; 