const MongoDataSource = require('../datasources/MongoDataSource');

class CityDataService {
  constructor() {
    this.mongoDataSource = new MongoDataSource('cities');
  }

  async fetchAll(locale = 'en') {
    return this.mongoDataSource.getData(locale);
  }

  async fetchById(id, locale = 'en') {
    return this.mongoDataSource.getDataById(id, locale);
  }

  async fetchByQuery(query, locale = 'en') {
    return this.mongoDataSource.getDataByQuery(query, locale);
  }
}

module.exports = new CityDataService(); 