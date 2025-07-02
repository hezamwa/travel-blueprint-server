const { MetadataRepository } = require('../repositories');

class MetadataController {
  async getAllMetadata(req, res) {
    try {
      const metadata = await MetadataRepository.findAll();
      res.json(metadata);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching metadata', error });
    }
  }

  async getMetadataById(req, res) {
    const { id } = req.params;
    try {
      const item = await MetadataRepository.findById(id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: 'Metadata item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching metadata item', error });
    }
  }
}

module.exports = new MetadataController(); 