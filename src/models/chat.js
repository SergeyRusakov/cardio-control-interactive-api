const mongoose = require('mongoose');

const chat = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    messages: [{
        authorId: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        payload: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }]
});

chat.methods.sendMessage = async function(authorId, authorName, payload) {
    if (!payload)
        return false;

    this.messages.push({
        date: new Date(),
        payload,
        authorId,
        author: authorName,
    });

    await this.save;
}

module.exports = mongoose.model('Chat', chat);
