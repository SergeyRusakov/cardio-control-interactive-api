const mongoose = require('mongoose');

const subscription = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  endpoint: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    required: false,
  },
  isMessage: {
    type: Boolean,
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
