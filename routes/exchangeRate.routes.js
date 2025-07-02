const express = require('express');
const router = express.Router();
const ExchangeRateController = require('../controllers/exchangeRate.controller');

router.get('/', ExchangeRateController.getAllExchangeRates);
router.get('/:id', ExchangeRateController.getExchangeRateById);

module.exports = router; 