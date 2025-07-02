const ReadRepository = require('./ReadRepository');
const AttractionDataService = require('../services/attraction.service');

class AttractionRepository extends ReadRepository {
  constructor(dataService = AttractionDataService) {
    // dataService will be an instance of a service that can handle
    // localized data for attractions (e.g., 'en' and 'ar').
    super(dataService);
  }

  // Attraction-specific read methods can be added here.
  // The generic methods (findAll, findById, find) from ReadRepository
  // now accept a `locale` parameter for localization.
}

module.exports = AttractionRepository; 