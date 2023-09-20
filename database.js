const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongo = mongoose.connection;

mongo.once('connected', () => {
  console.log('Connected to the Mongo with Mongoose');
});

mongo.on('error', (err) => {
  console.log('Connection error');
});

module.exports = mongo;
