const express = require('express');
const Subscription = require('../models/subscription');

const router = express.Router();

router.post('', async (req, res) => {
  try {
    const { body } = req;

    const sub = new Subscription(body);

    await sub.save();

    return res.status(201).json(sub);
  } catch (e) {
    console.error(e);
    res.status(500).json({status: 500, message: 'Cannot create subscription'});
  }
});

module.exports = router;
