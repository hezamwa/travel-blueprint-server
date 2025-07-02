const Country = require('../models/country.model');
const City = require('../models/city.model');
const Attraction = require('../models/attraction.model');
const ExchangeRate = require('../models/exchangeRate.model');
const Metadata = require('../models/metadata.model');
const mongoose = require('mongoose');

class MongoDataSource {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.model = this._getModel(collectionName);
  }

  _getModel(collectionName) {
    const models = {
      'countries': Country,
      'cities': City,
      'attractions': Attraction,
      'exchange_rates': ExchangeRate,
      'metadata': Metadata
    };
    return models[collectionName];
  }

  async getData(locale = 'en') {
    // If Arabic, use the _ar collection directly
    if (locale === 'ar') {
      const arCollection = `${this.collectionName}_ar`;
      const collection = mongoose.connection.collection(arCollection);
      try {
        const data = await collection.find({}).toArray();
        return data;
      } catch (error) {
        console.error(`Error fetching data from MongoDB for ${arCollection}:`, error);
        return [];
      }
    }
    // Default: use Mongoose model
    if (!this.model) {
      throw new Error(`Model not found for collection: ${this.collectionName}`);
    }
    try {
      const data = await this.model.find({});
      return data;
    } catch (error) {
      console.error(`Error fetching data from MongoDB for ${this.collectionName}:`, error);
      return [];
    }
  }

  async getDataById(id, locale = 'en') {
    if (locale === 'ar') {
      const arCollection = `${this.collectionName}_ar`;
      const collection = mongoose.connection.collection(arCollection);
      try {
        const data = await collection.findOne({ id });
        return data;
      } catch (error) {
        console.error(`Error fetching data by ID from MongoDB for ${arCollection}:`, error);
        return null;
      }
    }
    if (!this.model) {
      throw new Error(`Model not found for collection: ${this.collectionName}`);
    }
    try {
      const data = await this.model.findById(id);
      return data;
    } catch (error) {
      console.error(`Error fetching data by ID from MongoDB for ${this.collectionName}:`, error);
      return null;
    }
  }

  async getDataByQuery(query, locale = 'en') {
    if (locale === 'ar') {
      const arCollection = `${this.collectionName}_ar`;
      const collection = mongoose.connection.collection(arCollection);
      try {
        const data = await collection.find(query).toArray();
        return data;
      } catch (error) {
        console.error(`Error fetching data by query from MongoDB for ${arCollection}:`, error);
        return [];
      }
    }
    if (!this.model) {
      throw new Error(`Model not found for collection: ${this.collectionName}`);
    }
    try {
      const data = await this.model.find(query);
      return data;
    } catch (error) {
      console.error(`Error fetching data by query from MongoDB for ${this.collectionName}:`, error);
      return [];
    }
  }

  _localizeData(data, locale) {
    if (!Array.isArray(data)) return data;
    
    return data.map(item => this._localizeItem(item, locale));
  }

  _localizeItem(item, locale) {
    if (!item) return item;
    
    const localizedItem = { ...item.toObject ? item.toObject() : item };
    
    // Handle common localization patterns
    if (item.name_ar && locale === 'ar') {
      localizedItem.name = item.name_ar;
    }
    
    if (item.description_ar && locale === 'ar') {
      localizedItem.description = item.description_ar;
    }
    
    if (item.country_ar && locale === 'ar') {
      localizedItem.country = item.country_ar;
    }
    
    if (item.city_ar && locale === 'ar') {
      localizedItem.city = item.city_ar;
    }
    
    return localizedItem;
  }
}

module.exports = MongoDataSource; 