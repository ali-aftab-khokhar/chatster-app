import React, { useContext, useEffect, useState } from 'react'
import ChatSection from '../components/ChatSection'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome'
import ContextAPI from '../context/contextAPI'
import './style.css'

const Home = () => {
    const context = useContext(ContextAPI)
    const [contextUpdate, setContextUpdate] = useState(false)

    useEffect(() => { }, [contextUpdate])

    const rerenderChatSection = (combinedId, user) => {
        context.currentChat = combinedId
        context.chatWithUser = user
        setContextUpdate(!contextUpdate)
    }

    return (
        <div className='chatPage'>
            <div className='sideBarSection w-25 bg-light'>
                <Sidebar rerenderChatSection={rerenderChatSection} />
            </div>
            <div className='chatSection w-75 bg-body'>
                {
                    context.currentChat ? <ChatSection /> : <Welcome />
                }
            </div>
        </div>
    )
}

export default Home