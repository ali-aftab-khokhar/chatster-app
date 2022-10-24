/* eslint-disable react-hooks/exhaustive-deps */
import CONSTANTS from '../constants'
import React, { useEffect, useState } from 'react'
import './style.css'
import UserChatService from '../services/userChatService'
import { useContext } from 'react'
import ContextAPI from '../context/contextAPI'

const Chats = (props) => {
    const [chats, setChats] = useState()
    const currentUser = JSON.parse(localStorage.getItem(CONSTANTS.USER_SCHEMA))
    const userChatServiceObj = new UserChatService()
    const context = useContext(ContextAPI)

    useEffect(() => {
        const getData = async () => {
            setChats(await userChatServiceObj.getChatsWithAllUsers(currentUser))
        }
        getData()
    }, [])

    const selectChat = (user) => {
        const combinedId =
            currentUser._id > user._id
                ? currentUser._id + user._id
                : user._id + currentUser._id;
        localStorage.setItem(CONSTANTS.CHAT_WITH_USER_SCHEMA, JSON.stringify(user));
        localStorage.setItem(CONSTANTS.CURRENT_CHAT_SCHEMA, combinedId)
        context.currentChat = combinedId
        props.rerenderChatSection(combinedId, user)
    }

    return (
        <div>
            {
                chats !== undefined ?
                    chats.data.map((chat) => {
                        return (
                            <div className='p-3 d-flex mb-3 hoverEffect' key={chat._id} onClick={() => selectChat(chat)}>
                                <div className='d-grid gap-0 w-100 p-2 textLeft'>
                                    <div className='h5'>
                                        {chat.displayName}
                                    </div>
                                    <div>
                                        {CONSTANTS.CLICK_HERE_TO_CHAT}
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                    : <p>{CONSTANTS.LOADING}</p>
                // })
            }
        </div>
    )
}

export default Chats