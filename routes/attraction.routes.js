const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/attraction.controller');

router.get('/', AttractionController.getAllAttractions);
router.get('/:id', AttractionController.getAttractionById);

module.exports = router; 