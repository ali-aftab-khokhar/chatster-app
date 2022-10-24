const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatId: String,
    messages: [{
        senderId: String,
        text: String,
        time: Date
    }]
})

const Chat = mongoose.model('chat', chatSchema)
module.exports = Chat