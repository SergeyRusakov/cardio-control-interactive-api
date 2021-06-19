const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const chatRouter = require('./routes/chat');
const subRouter = require('./routes/subscription');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(auth);

app.use(cors());

app.use('/chat', chatRouter);

app.use('/subscription', subRouter);

async function serverStart() {
    try {
        const mongo = await mongoose.connect('mongodb://mongodb:27017/chat', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(8000, () => {
            console.log(`Server is running on port 8000...`);
        });
    } catch (e) {
        console.log(e);
    }
}

serverStart();
