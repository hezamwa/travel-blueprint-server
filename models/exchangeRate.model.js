const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  _id: String,
  currencyCode: String,
  sarToLocal: Number,
  usdToLocal: Number,
  lastUpdated: {
    _seconds: Number,
    _nanoseconds: Number
  }
});

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

module.exports = ExchangeRate; 