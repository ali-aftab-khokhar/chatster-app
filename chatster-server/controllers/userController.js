const CONSTANTS = require('../constants')
const UserServices = require('../services/userService')

const login = (req, res) => {
    try {
        UserServices.login(req, res)
    } catch {
        res.status(400).send(CONSTANTS.LOGIN_FAILED)
    }
}

const register = (req, res) => {
    try {
        UserServices.register(req, res)
    } catch {
        res.status(400).send(CONSTANTS.SIGNUP_FAILED)
    }
}

module.exports = {
    login,
    register,
}