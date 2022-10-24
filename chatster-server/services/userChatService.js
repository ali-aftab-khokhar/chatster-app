const Chat = require('../schema/chatSchema')
const Users = require('../schema/userSchema')

const getUsers = async (req, res) => {
    Users.find({ displayName: req.body.displayName }, (err, doc) => {
        if (!err) {
            res.status(200)
            res.json(doc)
        }
    })
}

const createNewChat = async (req, res) => {
    addNewChatInIndividualUser(req.body.chatId, req.body.currentId, req.body.user)
    addNewChatInIndividualUser(req.body.chatId, req.body.user, req.body.currentId)
    Chat.findOne({ chatId: req.body.chatId }, async (err, doc) => {
        if (!doc) {
            await Chat.create({ chatId: req.body.chatId })
        }
    })
}

const addNewChatInIndividualUser = async (combinedId, u_id, otherUser) => {
    try {
        await Users.updateOne({ _id: u_id }, { $addToSet: { chats: { chatId: combinedId, withUser: otherUser } } })
    } catch {
        console.log('Already Exists')
    }
}

const getChatsWithAllUsers = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        const chatsUser = []
        user.chats.forEach(chat => {
            if (!chatsUser.includes(chat.withUser)) {
                chatsUser.push(chat.withUser)
            }
        });
        await Users.find({ _id: chatsUser }, (err, doc) => {
            if (!err) {
                res.json(doc)
            }
        })
    } catch { }
}

module.exports = {
    getUsers,
    createNewChat,
    getChatsWithAllUsers
}