require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongo');
const app = express();
const port = 3001;

// Connect to MongoDB
connectMongo();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
require('./routes')(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;