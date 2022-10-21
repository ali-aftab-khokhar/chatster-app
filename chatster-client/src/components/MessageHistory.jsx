import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import CONSTANTS from '../constants'
import ContextAPI from '../context/contextAPI'
import { db } from '../firebase'
import DisplayMessage from './DisplayMessage'
import './style.css'

const MessageHistory = () => {
    const [allMessages, setAllMessages] = useState()
    const context = useContext(ContextAPI)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, CONSTANTS.CHATS_SCHEMA, context.currentChat), (doc) => {
            doc.exists() && setAllMessages(doc.data())
        })
        return () => {
            unsub()
        }
    }, [context.currentChat])

    return (
        <div className='w-100 messagesListHeight'>
            {
                allMessages !== undefined ?
                    allMessages.messages.map((mess) => {
                        return <DisplayMessage message={mess} />
                    }) : null
            }
        </div>
    )
}

export default MessageHistory