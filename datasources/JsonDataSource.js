const fs = require('fs').promises;
const path = require('path');

class JsonDataSource {
  constructor(collectionName) {
    this.filePath = path.join(__dirname, `../../database/collections/${collectionName}.json`);
    this.data = null;
  }

  async getData() {
    if (this.data) {
      return this.data;
    }
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf-8');
      this.data = JSON.parse(fileContent);
      return this.data;
    } catch (error) {
      console.error(`Error reading or parsing ${this.filePath}`, error);
      // Return an empty array or handle the error as appropriate
      return [];
    }
  }
}

module.exports = JsonDataSource; 