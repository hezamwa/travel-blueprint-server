const express = require('express');
const router = express.Router();
const CityController = require('../controllers/city.controller');

router.get('/', CityController.getAllCities);
router.get('/random', CityController.getRandomCities);
router.get('/search', CityController.searchCities);
router.get('/:id', CityController.getCityById);

module.exports = router; 