import React from 'react'
import Chats from './Chats'
import Navbar from './navBar'
import Search from './Search'

const Sidebar = (props) => {

    return (
        <div>
            <Navbar />
            <Search />
            <Chats rerenderChatSection={props.rerenderChatSection} />
        </div>
    )
}

export default Sidebar