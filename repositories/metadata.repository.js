const ReadRepository = require('./ReadRepository');
const MetadataDataService = require('../services/metadata.service');

class MetadataRepository extends ReadRepository {
  constructor(dataService = MetadataDataService) {
    // dataService will be an instance of MetadataDataService (to be created)
    super(dataService);
  }

  // Metadata-specific read methods can be added here.
}

module.exports = MetadataRepository; 