const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Perform further operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
  });
