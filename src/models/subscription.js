const mongoose = require('mongoose');

const subscription = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    required: false,
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    }
  },
});

module.exports = mongoose.model('Subscription', subscription);
