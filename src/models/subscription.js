const mongoose = require('mongoose');

const keys = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  auth: {
    type: String,
    required: true,
  }
})

const subscription = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  expirationType: {
    type: Date,
    required: false,
  },
  keys: {
    type: keys,
    required: true,
  },
});

module.exports = mongoose.model('Subscription', subscription);
