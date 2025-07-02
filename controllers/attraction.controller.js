const { AttractionRepository } = require('../repositories');

class AttractionController {
  async getAllAttractions(req, res) {
    const { locale, country, city, cityId, continent, type, page = 1, pageSize = 100 } = req.query;
    try {
      let attractions;
      if (country || city || cityId || continent || type) {
        const query = {};
        if (country) query.country = country;
        if (city) query.city = city;
        if (cityId) query.cityId = cityId;
        if (continent) query.continent = continent;
        if (type) query.type = type;
        attractions = await AttractionRepository.find(query, locale);
      } else {
        attractions = await AttractionRepository.findAll(locale);
      }
      const pageInt = parseInt(page, 10) || 1;
      const pageSizeInt = parseInt(pageSize, 10) || 100;
      const start = (pageInt - 1) * pageSizeInt;
      const pagedAttractions = attractions.slice(start, start + pageSizeInt);
      res.json({
        data: pagedAttractions,
        total: attractions.length,
        page: pageInt,
        pageSize: pageSizeInt
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attractions', error });
    }
  }

  async getAttractionById(req, res) {
    const { id } = req.params;
    const { locale } = req.query;
    try {
      const attraction = await AttractionRepository.findById(id, locale);
      if (attraction) {
        res.json(attraction);
      } else {
        res.status(404).json({ message: 'Attraction not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attraction', error });
    }
  }

  async getRandomAttractions(req, res) {
    const { locale, limit = 10 } = req.query;
    try {
      const attractions = await AttractionRepository.findRandom(parseInt(limit), locale);
      res.json(attractions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching random attractions', error });
    }
  }

  async searchAttractions(req, res) {
    const { locale, query } = req.query;
    try {
      const attractions = await AttractionRepository.search(query, locale);
      res.json(attractions);
    } catch (error) {
      res.status(500).json({ message: 'Error searching attractions', error });
    }
  }
}

module.exports = new AttractionController(); 