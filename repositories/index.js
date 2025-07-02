const CountryRepository = require('./country.repository');
const CityRepository = require('./city.repository');
const AttractionRepository = require('./attraction.repository');
const MetadataRepository = require('./metadata.repository');
const ExchangeRateRepository = require('./exchangeRate.repository');

// Export repositories with their services already wired up
module.exports = {
  CountryRepository: new CountryRepository(),
  CityRepository: new CityRepository(),
  AttractionRepository: new AttractionRepository(),
  MetadataRepository: new MetadataRepository(),
  ExchangeRateRepository: new ExchangeRateRepository()
}; 