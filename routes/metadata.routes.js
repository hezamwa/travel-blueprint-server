const express = require('express');
const router = express.Router();
const MetadataController = require('../controllers/metadata.controller');

router.get('/', MetadataController.getAllMetadata);
router.get('/:id', MetadataController.getMetadataById);

module.exports = router; 