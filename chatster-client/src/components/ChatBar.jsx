import React, { useContext } from 'react'
import ContextAPI from '../context/contextAPI'
import './style.css'

const ChatBar = () => {
    const context = useContext(ContextAPI)
    return (
        <div className='d-flex p-3 border-bottom mb-1 chatBarBackgroundColor bg-gradient'>
            <div className='w-50 h4 mt-2 text-white'>
                {
                    context.chatWithUser ? <div>{context.chatWithUser.displayName}</div> : null
                }
            </div>
        </div>
    )
}

export default ChatBar