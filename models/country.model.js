const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  _id: String,
  id: String,
  name: String,
  continent: String,
  countryInfo: {
    visaRequirement: String,
    currency: {
      code: String,
      name: String
    },
    officialLanguages: [String],
    telecomProviders: [{
      name: String,
      website: String
    }],
    exchangeRates: {
      sarToLocal: Number,
      usdToLocal: Number,
      lastUpdated: {
        _seconds: Number,
        _nanoseconds: Number
      }
    }
  },
  createdAt: {
    _seconds: Number,
    _nanoseconds: Number
  },
  updatedAt: {
    _seconds: Number,
    _nanoseconds: Number
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country; 