const { CountryRepository } = require('../repositories');

class CountryController {
  async getAllCountries(req, res) {
    const { locale, continent, select } = req.query;
    try {
      let countries;
      if (continent) {
        countries = await CountryRepository.find({ continent }, locale);
      } else {
        countries = await CountryRepository.findAll(locale);
      }
      if (select === 'name,id') {
        countries = countries.map(country => ({ id: country.id, name: country.name }));
      }
      res.json(countries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching countries', error });
    }
  }

  async getCountryById(req, res) {
    const { id } = req.params;
    const { locale } = req.query;
    try {
      const country = await CountryRepository.findById(id, locale);
      if (country) {
        res.json(country);
      } else {
        res.status(404).json({ message: 'Country not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching country', error });
    }
  }

  async getRandomCountries(req, res) {
    const { locale, limit = 10 } = req.query;
    try {
      const countries = await CountryRepository.findRandom(parseInt(limit), locale);
      res.json(countries);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching random countries', error });
    }
  }

  async searchCountries(req, res) {
    const { locale, query } = req.query;
    try {
      const countries = await CountryRepository.search(query, locale);
      res.json(countries);
    } catch (error) {
      res.status(500).json({ message: 'Error searching countries', error });
    }
  }
}

module.exports = new CountryController(); 