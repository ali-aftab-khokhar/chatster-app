import { doc, onSnapshot } from 'firebase/firestore'
import CONSTANTS from '../constants'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import './style.css'

const Chats = (props) => {
    const [, setChats] = useState()
    const [chatsArray, setChatsArray] = useState()
    const currentUser = JSON.parse(localStorage.getItem(CONSTANTS.USER_SCHEMA))

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, CONSTANTS.USER_CHATS_SCHEMA, currentUser.uid), (doc) => {
                setChats(doc.data());
                setChatsArray(Object.entries(doc.data()))
            });

            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid])

    const selectChat = (chat) => {
        const user = chat[1].userInfo
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        localStorage.setItem(CONSTANTS.CHAT_WITH_USER_SCHEMA, JSON.stringify(user));
        localStorage.setItem(CONSTANTS.CURRENT_CHAT_SCHEMA, combinedId)
        props.rerenderChatSection(combinedId, user)
    }

    return (
        <div>
            {
                chatsArray !== undefined ?
                    chatsArray.map((chat) => {
                        return (
                            <div className='p-3 d-flex mb-3 hoverEffect' key={chat[0]} onClick={() => selectChat(chat)}>
                                <div className='bg-dark col-2 rounded-circle'>
                                    <img src={chat[1].userInfo.photoURL} width='100%' alt='Profile' className='rounded-circle' ></img>
                                </div>
                                <div className='d-grid gap-0 w-100 p-2 textLeft'>
                                    <div className='h5'>
                                        {chat[1].userInfo.displayName}
                                    </div>
                                    <div>
                                        {chat[1].userInfo.lastMessage?.text ? chat[1].userInfo.lastMessage?.text : CONSTANTS.CLICK_HERE_TO_CHAT}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>{CONSTANTS.LOADING}</p>
                // })
            }
        </div>
    )
}

export default Chats