const express = require('express')
const router = express.Router()
const ChatController = require('../controllers/chatController')

router.get('/chatHistory/:id', ChatController.chatHistory)

router.post('/addNewChatMessage/:id', ChatController.addNewChatMessage)

module.exports = router