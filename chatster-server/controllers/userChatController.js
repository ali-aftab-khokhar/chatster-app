const UserChatServices = require('../services/userChatService')

const getUsers = (req, res) => {
    try {
        UserChatServices.getUsers(req, res)
    } catch {
        console.log('No Users Found')
    }
}

const createNewChat = (req, res) => {
    try {
        UserChatServices.createNewChat(req, res)
    } catch {
        console.log('Cannot create new chat')
    }
}

const getChatsWithAllUsers = (req, res) => {
    UserChatServices.getChatsWithAllUsers(req, res)
}

module.exports = {
    getUsers,
    createNewChat,
    getChatsWithAllUsers
}