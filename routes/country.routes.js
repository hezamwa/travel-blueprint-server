const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/country.controller');

router.get('/', CountryController.getAllCountries);
router.get('/random', CountryController.getRandomCountries);
router.get('/search', CountryController.searchCountries);
router.get('/:id', CountryController.getCountryById);

module.exports = router; 