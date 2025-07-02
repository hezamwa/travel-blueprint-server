# MongoDB Setup for Travel Blueprint Server

This guide will help you set up MongoDB support for the Travel Blueprint Server.

## Prerequisites

1. **MongoDB installed locally** or a MongoDB Atlas account
2. **Node.js and npm** installed
3. **Mongoose** package (already installed)

## Setup Instructions

### 1. Install MongoDB Locally (Optional)

If you want to run MongoDB locally:

**Windows:**
- Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
```

### 2. Environment Configuration

Create a `.env` file in the `travel-blueprint-server` directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/travel-blueprint

# Server Configuration
PORT=3001

# Optional: MongoDB Atlas (cloud) connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-blueprint?retryWrites=true&w=majority
```

### 3. Install dotenv (Optional)

If you want to use the `.env` file, install dotenv:

```bash
npm install dotenv
```

Then update `app.js` to load environment variables:

```javascript
require('dotenv').config();
const express = require('express');
// ... rest of the code
```

### 4. Migrate Data to MongoDB

Run the migration script to populate MongoDB with your existing JSON data:

```bash
npm run migrate
```

This will:
- Connect to MongoDB
- Clear existing data (if any)
- Import all JSON data from `database/collections/`
- Merge English and Arabic data into single documents
- Handle localization automatically

### 5. Start the Server

```bash
npm run dev
```

The server will now connect to MongoDB and use it as the data source.

## Data Structure

The migration script creates the following collections:

- **countries**: Country information with English and Arabic fields
- **cities**: City information with English and Arabic fields  
- **attractions**: Attraction information with English and Arabic fields
- **exchange_rates**: Currency exchange rates
- **metadata**: Application metadata

## Localization Support

The system automatically handles localization:

- English data is stored in the main fields (`name`, `description`, etc.)
- Arabic data is stored in `_ar` fields (`name_ar`, `description_ar`, etc.)
- When requesting Arabic locale, the system returns Arabic fields as primary values

## API Endpoints

All existing API endpoints continue to work the same way:

- `GET /countries` - Get all countries
- `GET /countries/:id` - Get country by ID
- `GET /cities` - Get all cities
- `GET /cities/:id` - Get city by ID
- `GET /attractions` - Get all attractions
- `GET /attractions/:id` - Get attraction by ID

Add `?locale=ar` to any endpoint to get Arabic data.

## Troubleshooting

### Connection Issues

1. **MongoDB not running**: Start MongoDB service
2. **Wrong connection string**: Check your `MONGO_URI` in `.env`
3. **Authentication issues**: Verify username/password for Atlas

### Migration Issues

1. **JSON files not found**: Ensure `database/collections/` exists with JSON files
2. **Permission errors**: Check file permissions for JSON files
3. **Duplicate IDs**: The migration script handles this automatically

### Performance

- MongoDB queries are automatically optimized
- Indexes are created on `_id` fields automatically
- Consider adding indexes for frequently queried fields

## Next Steps

1. **Add indexes** for better performance
2. **Implement caching** for frequently accessed data
3. **Add data validation** using Mongoose schemas
4. **Set up MongoDB Atlas** for production deployment 