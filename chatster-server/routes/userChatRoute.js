const express = require('express')
const router = express.Router()
const UserChatController = require('../controllers/userChatController')

router.post('/users', UserChatController.getUsers)

router.post('/createNewChat', UserChatController.createNewChat)

router.get('/getChatsWithAllUsers/:id', UserChatController.getChatsWithAllUsers)

module.exports = router