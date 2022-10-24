const chatServices = require('../services/chatService')

const chatHistory = (req, res) => {
    chatServices.chatHistory(req, res)
}

const addNewChatMessage = (req, res) => {
    chatServices.addNewChatMessage(req, res)
}

module.exports = {
    chatHistory,
    addNewChatMessage
}