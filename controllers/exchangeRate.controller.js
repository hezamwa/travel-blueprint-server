const { ExchangeRateRepository } = require('../repositories');

class ExchangeRateController {
  async getAllExchangeRates(req, res) {
    try {
      const rates = await ExchangeRateRepository.findAll();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exchange rates', error });
    }
  }

  async getExchangeRateById(req, res) {
    const { id } = req.params;
    try {
      const rate = await ExchangeRateRepository.findById(id);
      if (rate) {
        res.json(rate);
      } else {
        res.status(404).json({ message: 'Exchange rate not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exchange rate', error });
    }
  }
}

module.exports = new ExchangeRateController(); 