const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  const connectionString = process.env.MONGODB_URI || process.env.MONGO_URI || '';
  const connectionStringRead = !!connectionString;
  let connectionStatus = 'disconnected';
  let error = null;

  if (mongoose.connection.readyState === 1) {
    connectionStatus = 'connected';
  } else if (mongoose.connection.readyState === 2) {
    connectionStatus = 'connecting';
  } else if (mongoose.connection.readyState === 3) {
    connectionStatus = 'disconnecting';
  } else {
    connectionStatus = 'disconnected';
  }

  if (mongoose.connection._hasError) {
    error = mongoose.connection._hasError;
  } else if (mongoose.connection.lastError) {
    error = mongoose.connection.lastError;
  }

  res.json({
    connectionStringRead,
    connectionStringPreview: connectionString ? connectionString.substring(0, 10) : '',
    connectionStatus,
    error: error ? error.toString() : null
  });
});

module.exports = router;
