const bcrypt = require('bcrypt')
const CONSTANTS = require('../constants')
const Users = require('../schema/userSchema')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await existsOrNot(email)
        const isMatch = existingUser && (await bcrypt.compare(password, existingUser.password))
        if (isMatch) {
            res.status(200)
            res.json({
                _id: existingUser.id,
                displayName: existingUser.displayName,
                email: existingUser.email
            })
        } else {
            res.status(400)
            res.send(CONSTANTS.INCORRECT_EMAIL_OR_PASSWORD)
        }
    } catch {
        res.status(400)
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

const register = async (req, res) => {
    try {
        const { displayName, email, password } = req.body
        const existingUser = await existsOrNot(email)
        console.log(existingUser, 'exists')
        if (existingUser) {
            res.status(400)
            throw new Error(CONSTANTS.USER_ALREADY_EXISTS)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new Users({
            displayName,
            email,
            password: hashedPassword
        })
        await user.save()
        if (user) {
            res.status(200).json({
                _id: user.id,
                displayName: user.displayName,
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error(CONSTANTS.INVALID_USER_DATA)
        }
    } catch {
        res.status(400)
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

const existsOrNot = async (email) => {
    try {
        const userExists = await Users.findOne({ email })
        if (userExists !== null) {
            return userExists
        } else {
            return false
        }
    } catch {
        throw new Error(CONSTANTS.INVALID_USER_DATA)
    }
}

module.exports = {
    login,
    register
}