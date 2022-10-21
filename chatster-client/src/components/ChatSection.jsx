import React from 'react'
import ChatBar from './ChatBar'
import MessageHistory from './MessageHistory'
import './style.css'
import TypeNewMessage from './TypeNewMessage'

const ChatSection = () => {

    return (
        <div className='d-grid'>
            <ChatBar />
            <MessageHistory />
            <TypeNewMessage />
        </div>
    )
}

export default ChatSection