const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: [true]
    },
    chats: [{
        chatId: String,
        withUser: String
    }]
})

// userSchema.methods.generateToken = async function () {
//     try {
//         const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRETKEY)
//         this.tokens = this.tokens.concat({ token })
//         await this.save()
//         return token
//     } catch {
//         console.log(CONSTANTS.GENERATE_TOKEN_FAILED)
//     }
// }

const Users = mongoose.model('users', userSchema)
module.exports = Users