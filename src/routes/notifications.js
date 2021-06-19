const Chat = require('../models/chat');

const express = require('express');

const router = express.Router();

const webPush = require('web-push');

const Subscription = require('../models/subscription');

router.post('/', async (req, res) => {
    try {
        const { body } = req;

        setTimeout(async () => {
            const notificationPayload = {
                'notification': {
                    'title': 'Кардио-контроль',
                    'body': `${body?.message || ''}`,
                    'icon': 'https://кардио-контроль.рф/assets/icons/icon-128x128.png',
                    'vibrate': [100, 50, 100],
                    'data': {
                        'dateOfArrival': Date.now(),
                        'primaryKey': 1
                    },
                    'actions': [{
                        'action': 'explore',
                        'title': 'Перейти в приложение'
                    }]
                }
            };

            const subscriptions = await Subscription.find(() => true);

            Promise.all(subscriptions.map(sub => webPush.sendNotification(
                sub, JSON.stringify(notificationPayload))))
                .then(() => console.log('Notification send'))
                .catch(err => {
                    console.error('Error sending notification, reason: ', err);
                });

            return res.status(200).json({});
        }, body?.time || 5000);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
