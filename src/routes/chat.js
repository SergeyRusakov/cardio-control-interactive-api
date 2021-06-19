const Chat = require('../models/chat');

const express = require('express');

const router = express.Router();

const webPush = require('web-push');

const Subscription = require('../models/subscription');

const vapidKeys = {
  'publicKey': 'BPKw8djlbv5FSig5Qd_LyaolgHnbyXawLAhNN78M6-IJXRIWUHQkMZe7LVOscMRED9s8r9-ajXtipi95jPJlCwk',
  'privateKey': '_PVKG09sLJJafcAcY7_THuubz-ozJlY-JjIiuO7Drfs'
};

webPush.setVapidDetails(
  'mailto:sergeyrusakov1@yandex.ru',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

router.get('/doctor', async (req, res) => {
  try {
    const doctorId = res.locals._id;
    if (!doctorId)
      return res.status(401).json({ status: 401, message: 'Неавторизованный запрос' });

    const chat = await Chat.find({
      doctorId
    });

    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 500, message: 'Данных нет в БД' });
  }
});

router.get('/patient', async (req, res) => {
  try {
    const patientId = res.locals._id;
    if (!patientId)
      return res.status(401).json({ status: 401, message: 'Неавторизованный запрос' });

    const chat = await Chat.findOne({
      patientId
    });

    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 500, message: 'Данных нет в БД' });
  }
});

router.post('/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const doctorId = res.locals._id;
    if (!doctorId)
      return res.status(401).json({ status: 401, message: 'Неавторизованный запрос' });

    let chat = await Chat.findOne({
      patientId
    });

    if (!chat) {
      chat = new Chat({
        patientId,
        doctorId,
        messages: []
      });

      await chat.save();

      return res.status(200).json(chat);
    }

    return res.status(400).json({ status: 400, message: 'Пациент уже привязан к лечащему врачу' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 500, message: 'Данных нет в БД' });
  }
});

router.post('/message/:id', async (req, res) => {
  try {
    const body = req.body;

    const authorId = res.locals._id;
    if (!authorId)
      return res.status(401).json({ status: 401, message: 'Неавторизованный запрос' });

    const chatId = req.params.id;

    let chat = await Chat.findById(chatId);

    if (!chat)
      return res.status(400).json({ status: 400, message: 'Чат не найден' });

    const notificationPayload = {
      'notification': {
        'title': 'Angular News',
        'body': 'Newsletter Available!',
        'icon': 'assets/main-page-logo-small-hat.png',
        'vibrate': [100, 50, 100],
        'data': {
          'dateOfArrival': Date.now(),
          'primaryKey': 1
        },
        'actions': [{
          'action': 'explore',
          'title': 'Go to the site'
        }]
      }
    };

    const subscriptions = await Subscription.find(() => true);

    await chat.sendMessage(authorId, body.author, body.message);

    return Promise.all(subscriptions.map(sub => webPush.sendNotification(
        sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json(chat))
        .catch(err => {
          console.error('Error sending notification, reason: ', err);
          res.sendStatus(500);
        });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 500, message: 'Данных нет в БД' });
  }
});

module.exports = router;
