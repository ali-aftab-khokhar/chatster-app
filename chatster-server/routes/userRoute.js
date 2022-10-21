const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/', UserController.login)

router.post('/register', UserController.register)

module.exports = router