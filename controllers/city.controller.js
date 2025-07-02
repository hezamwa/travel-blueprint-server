const { CityRepository } = require('../repositories');

class CityController {
  async getAllCities(req, res) {
    const { locale, country, continent, select } = req.query;
    try {
      let cities;
      if (country || continent) {
        const query = {};
        if (country) query.country = country;
        if (continent) query.continent = continent;
        cities = await CityRepository.find(query, locale);
      } else {
        cities = await CityRepository.findAll(locale);
      }
      if (select === 'name,id') {
        cities = cities.map(city => ({ id: city.id, name: city.name }));
      }
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cities', error });
    }
  }

  async getCityById(req, res) {
    const { id } = req.params;
    const { locale } = req.query;
    try {
      const city = await CityRepository.findById(id, locale);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ message: 'City not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching city', error });
    }
  }

  async getRandomCities(req, res) {
    const { locale, limit = 10 } = req.query;
    try {
      const cities = await CityRepository.findRandom(parseInt(limit), locale);
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching random cities', error });
    }
  }

  async searchCities(req, res) {
    const { locale, query } = req.query;
    try {
      const cities = await CityRepository.search(query, locale);
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: 'Error searching cities', error });
    }
  }
}

module.exports = new CityController(); 