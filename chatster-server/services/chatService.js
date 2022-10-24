const Chat = require("../schema/chatSchema")

const chatHistory = async (req, res) => {
    try {
        const messages = await Chat.findOne({ chatId: req.params.id })
        res.json(messages)
    } catch {
        console.log('Cannot get messages')
    }
}

const addNewChatMessage = async (req, res) => {
    const status = await Chat.updateOne({ chatId: req.body.chatId }, { $push: { messages: req.body.messages } })
}

module.exports = {
    chatHistory,
    addNewChatMessage
}