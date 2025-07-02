class ReadRepository {
  constructor(dataService) {
    this.dataService = dataService;
  }

  /**
   * Finds all entries, with localization support.
   * @param {string} [locale='en'] - The locale for the data (e.g., 'en', 'ar').
   */
  async findAll(locale = 'en') {
    return this.dataService.fetchAll(locale);
  }

  /**
   * Finds an entry by its ID, with localization support.
   * @param {*} id - The ID of the entry.
   * @param {string} [locale='en'] - The locale for the data (e.g., 'en', 'ar').
   */
  async findById(id, locale = 'en') {
    return this.dataService.fetchById(id, locale);
  }

  /**
   * Finds entries matching a query, with localization support.
   * @param {object} query - The query to match.
   * @param {string} [locale='en'] - The locale for the data (e.g., 'en', 'ar').
   */
  async find(query, locale = 'en') {
    return this.dataService.fetchByQuery(query, locale);
  }
}

module.exports = ReadRepository; 