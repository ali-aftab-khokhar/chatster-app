const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    messages: [{
        id: {
            type: String
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        text: String,
        time: Date
    }]
})

const Chat = mongoose.model('chat', chatSchema)
module.exports = Chat