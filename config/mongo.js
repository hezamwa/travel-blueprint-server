const mongoose = require('mongoose');

const connectMongo = async () => {
  const uri = process.env.MONGO_URI;// || 'mongodb://localhost:27017/travel-blueprint';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectMongo; 