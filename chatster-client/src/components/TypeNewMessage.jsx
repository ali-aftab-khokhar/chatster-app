import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import ContextAPI from '../context/contextAPI'
import { db } from '../firebase'
import { v4 as uuid } from 'uuid'
import './style.css'
import CONSTANTS from '../constants'

const TypeNewMessage = () => {
    const [message, setMessage] = useState('')
    const context = useContext(ContextAPI)

    const onChangeHandler = (e) => {
        setMessage(e.target.value)
    }

    const onSubmitHandler = async () => {
        await updateDoc(doc(db, CONSTANTS.CHATS_SCHEMA, context.currentChat), {
            messages: arrayUnion({
                id: uuid(),
                text: message,
                senderId: context.activeUser.uid,
                time: Timestamp.now()
            })
        })
        setMessage('')
    }

    return (
        <div className='w-100 bg-light border-start sendMessageHeight'>
            <div className="form-floating mb-3 border ms-4 d-flex justify-content-center mt-4 me-4">
                <input type="text" className="form-control border-0 " id="floatingInput" value={message} onChange={onChangeHandler} placeholder={CONSTANTS.NAME_PLACEHOLDER} />
                <label for="newMessage">{CONSTANTS.TYPE_A_MESSAGE}</label>
                <button className='w-25 btn btn-success ms-4' onClick={onSubmitHandler}>{CONSTANTS.SEND_BUTTON}</button>
            </div>
        </div>
    )
}

export default TypeNewMessage