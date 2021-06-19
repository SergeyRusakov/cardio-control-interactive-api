import {Chat} from "../models/chat";

const express = require('express');

const router = express.Router();

router.get('/doctor', async (req, res) => {
    try {
        const doctorId = req.local._id;
        if (!doctorId)
            return res.status(401).json({status: 401, message: 'Неавторизованный запрос'});

        const chat = await Chat.find({
            doctorId
        });

        return res.status(200).json(chat);
    } catch (e) {
        console.log(e);
    }
});

router.get('/patient', async (req, res) => {
    try {
        const patientId = req.local._id;
        if (!patientId)
            return res.status(401).json({status: 401, message: 'Неавторизованный запрос'});

        const chat = await Chat.findOne({
            patientId
        });

        return res.status(200).json(chat);
    } catch (e) {
        console.log(e);
    }
});

router.post('/:patientId', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const doctorId = req.local._id;
        if (!doctorId)
            return res.status(401).json({status: 401, message: 'Неавторизованный запрос'});

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

        return res.status(400).json({status: 400, message: 'Пациент уже привязан к лечащему врачу'});
    } catch (e) {
        console.log(e);
    }
});

router.post('/message/:id', async (req, res) => {
    try {
        const body = req.body;

        const authorId = req.local._id;
        if (!authorId)
            return res.status(401).json({status: 401, message: 'Неавторизованный запрос'});

        const chatId = req.params.id;

        let chat = await Chat.findById(chatId);

        if (!chat)
            return res.status(400).json({status: 400, message: 'Чат не найден'});

        await chat.sendMessage(authorId, body.author, body.message);

        return res.status(201).json(chat);
    } catch (e) {
        console.log(e);
    }
});
