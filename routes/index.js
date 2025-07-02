const countryRoutes = require('./country.routes');
const cityRoutes = require('./city.routes');
const attractionRoutes = require('./attraction.routes');
const metadataRoutes = require('./metadata.routes');
const exchangeRateRoutes = require('./exchangeRate.routes');

module.exports = (app) => {
  app.use('/api/countries', countryRoutes);
  app.use('/api/cities', cityRoutes);
  app.use('/api/attractions', attractionRoutes);
  app.use('/api/metadata', metadataRoutes);
  app.use('/api/exchange-rates', exchangeRateRoutes);
}; 