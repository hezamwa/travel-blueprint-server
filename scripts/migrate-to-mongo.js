const fs = require('fs').promises;
const path = require('path');
const connectMongo = require('../config/mongo');
const Country = require('../models/country.model');
const City = require('../models/city.model');
const Attraction = require('../models/attraction.model');
const ExchangeRate = require('../models/exchangeRate.model');
const Metadata = require('../models/metadata.model');

async function readJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, `../../database/collections/${filename}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error.message);
    return [];
  }
}

async function migrateCollection(model, englishData, arabicData = null) {
  try {
    // Clear existing data
    await model.deleteMany({});
    console.log(`✅ Cleared existing ${model.modelName} data`);

    // Merge English and Arabic data
    const mergedData = englishData.map(item => {
      const arabicItem = arabicData ? arabicData.find(ar => ar.id === item.id) : null;
      
      if (arabicItem) {
        return {
          ...item,
          name_ar: arabicItem.name,
          description_ar: arabicItem.description,
          country_ar: arabicItem.country,
          city_ar: arabicItem.city
        };
      }
      
      return item;
    });

    // Insert merged data
    if (mergedData.length > 0) {
      await model.insertMany(mergedData);
      console.log(`✅ Migrated ${mergedData.length} ${model.modelName} records`);
    } else {
      console.log(`⚠️  No data to migrate for ${model.modelName}`);
    }
  } catch (error) {
    console.error(`❌ Error migrating ${model.modelName}:`, error.message);
  }
}

async function migrateToMongo() {
  try {
    console.log('🚀 Starting migration to MongoDB...');
    
    // Connect to MongoDB
    await connectMongo();
    
    // Migrate countries
    console.log('\n📊 Migrating countries...');
    const countriesEn = await readJsonFile('countries');
    const countriesAr = await readJsonFile('countries_ar');
    await migrateCollection(Country, countriesEn, countriesAr);
    
    // Migrate cities
    console.log('\n🏙️  Migrating cities...');
    const citiesEn = await readJsonFile('cities');
    const citiesAr = await readJsonFile('cities_ar');
    await migrateCollection(City, citiesEn, citiesAr);
    
    // Migrate attractions
    console.log('\n🎯 Migrating attractions...');
    const attractionsEn = await readJsonFile('attractions');
    const attractionsAr = await readJsonFile('attractions_ar');
    await migrateCollection(Attraction, attractionsEn, attractionsAr);
    
    // Migrate exchange rates
    console.log('\n💱 Migrating exchange rates...');
    const exchangeRates = await readJsonFile('exchange_rates');
    await migrateCollection(ExchangeRate, exchangeRates);
    
    // Migrate metadata
    console.log('\n📋 Migrating metadata...');
    const metadata = await readJsonFile('metadata');
    await migrateCollection(Metadata, metadata);
    
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateToMongo();
}

module.exports = migrateToMongo; 