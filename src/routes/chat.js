import {Chat} from "../models/chat";

const express = require('express');

const router = express.Router();

router.get('/doctor', async (req, res) => {
    try {
        const id = req.params.id;

        const chat = await Chat.findById(id);

        if (!chat) {
            return res.status(404).end();
        }

        return res.status(200).json(chat);
    } catch (e) {
        console.log(e);
    }
});

router.get('/patient/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const chat = await Chat.findById(id);

        if (!chat) {
            return res.status(404).end();
        }

        return res.status(200).json(chat);
    } catch (e) {
        console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const id = req.params.id;

        const chat = new Chat({

        });

        if (!chat) {
            return res.status(404).end();
        }

        return res.status(200).json(chat);
    } catch (e) {
        console.log(e);
    }
});
