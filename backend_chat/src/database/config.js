const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING);

    console.log('db is connected =0)');
  } catch (e) {
    throw new Error('Errorn en la db');
  }
};

module.exports = {
  dbConnection,
};
