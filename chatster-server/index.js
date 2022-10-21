require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
const userChatRoute = require('./routes/userChatRoute')

const PORT = process.env.PORT

mongoose.connect(process.env.DB,
    () => { console.log('Connected to DB') },
    (err) => { console.log(err) })

const options = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', userRoute)
app.use('/api', chatRoute)
app.use('/api', userChatRoute)

app.listen(PORT,
    () => { console.log(`Listening on port ${PORT}`) })