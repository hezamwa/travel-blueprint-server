const ReadRepository = require('./ReadRepository');
const CountryDataService = require('../services/country.service');

class CountryRepository extends ReadRepository {
  constructor(dataService = CountryDataService) {
    // dataService will be an instance of a service that can handle
    // localized data for countries (e.g., 'en' and 'ar').
    super(dataService);
  }

  // Country-specific read methods can be added here.
  // The generic methods (findAll, findById, find) from ReadRepository
  // now accept a `locale` parameter for localization.

  /**
   * Finds random countries
   * @param {number} limit - Number of random countries to return
   * @param {string} [locale='en'] - The locale for the data
   */
  async findRandom(limit = 10, locale = 'en') {
    const allCountries = await this.findAll(locale);
    const shuffled = allCountries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  /**
   * Searches countries by name
   * @param {string} query - Search query
   * @param {string} [locale='en'] - The locale for the data
   */
  async search(query, locale = 'en') {
    const allCountries = await this.findAll(locale);
    const searchTerm = query.toLowerCase();
    return allCountries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      (country.name_ar && country.name_ar.toLowerCase().includes(searchTerm))
    );
  }
}

module.exports = CountryRepository; 