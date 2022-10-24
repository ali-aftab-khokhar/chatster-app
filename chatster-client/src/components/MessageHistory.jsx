/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import ContextAPI from '../context/contextAPI'
import UserChatService from '../services/userChatService'
import DisplayMessage from './DisplayMessage'
import './style.css'

const MessageHistory = () => {
    const [allMessages, setAllMessages] = useState()
    const context = useContext(ContextAPI)
    const userChatServiceObj = new UserChatService()

    useEffect(() => {
        const fetchData = async () => {
            setAllMessages(await userChatServiceObj.chatHistory(context.currentChat))
        }
        fetchData()
        console.log(allMessages)
    }, [context.currentChat])

    return (
        <div className='w-100 messagesListHeight'>
            {
                allMessages !== undefined ?
                    allMessages.data.messages.map((mess) => {
                        return <DisplayMessage message={mess}/>
                    }) : null
            }
        </div>
    )
}

export default MessageHistory