const mongoose = require('mongoose')

const userChatSchema = new mongoose.Schema({
    date: Date,
    userInfo: {
        displayName: String,
        photoURL: String,
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})

const UserChat = mongoose.model('userChat', userChatSchema)
module.export = UserChat