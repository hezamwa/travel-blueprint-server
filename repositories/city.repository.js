const ReadRepository = require('./ReadRepository');
const CityDataService = require('../services/city.service');

class CityRepository extends ReadRepository {
  constructor(dataService = CityDataService) {
    // dataService will be an instance of a service that can handle
    // localized data for cities (e.g., 'en' and 'ar').
    super(dataService);
  }

  // City-specific read methods can be added here.
  // The generic methods (findAll, findById, find) from ReadRepository
  // now accept a `locale` parameter for localization.

  /**
   * Finds random cities
   * @param {number} limit - Number of random cities to return
   * @param {string} [locale='en'] - The locale for the data
   */
  async findRandom(limit = 10, locale = 'en') {
    const allCities = await this.findAll(locale);
    const shuffled = allCities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  /**
   * Searches cities by name
   * @param {string} query - Search query
   * @param {string} [locale='en'] - The locale for the data
   */
  async search(query, locale = 'en') {
    const allCities = await this.findAll(locale);
    const searchTerm = query.toLowerCase();
    return allCities.filter(city => 
      city.name.toLowerCase().includes(searchTerm) ||
      (city.name_ar && city.name_ar.toLowerCase().includes(searchTerm))
    );
  }
}

module.exports = CityRepository; 