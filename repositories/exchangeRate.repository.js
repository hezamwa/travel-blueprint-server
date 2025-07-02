const ReadRepository = require('./ReadRepository');
const ExchangeRateDataService = require('../services/exchangeRate.service');

class ExchangeRateRepository extends ReadRepository {
  constructor(dataService = ExchangeRateDataService) {
    // dataService will be an instance of ExchangeRateDataService (to be created)
    super(dataService);
  }

  // ExchangeRate-specific read methods can be added here.
}

module.exports = ExchangeRateRepository; 