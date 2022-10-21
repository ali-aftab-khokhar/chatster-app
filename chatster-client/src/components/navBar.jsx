import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CONSTANTS from '../constants'
import ContextAPI from '../context/contextAPI'
import './style.css'

const Navbar = () => {
    const navigate = useNavigate()
    const activeUser = JSON.parse(localStorage.getItem(CONSTANTS.USER_SCHEMA))
    const context = useContext(ContextAPI)

    const logout = () => {
        localStorage.removeItem(CONSTANTS.USER_SCHEMA)
        localStorage.removeItem(CONSTANTS.CHAT_WITH_USER_SCHEMA)
        localStorage.removeItem(CONSTANTS.CURRENT_CHAT_SCHEMA)
        context.currentChat = CONSTANTS.EMPTY_STRING
        navigate('/')
        toast.success(CONSTANTS.SUCCESSFULLY_LOGGED_OUT)
    }

    return (
        <div className='d-flex p-3 border-bottom mb-1 backgroundColor bg-gradient'>
            <div className='bg-dark col-1 navBarImage ms-4 rounded-circle'>
                <img src={activeUser.photoURL} width='100%' alt={CONSTANTS.ALT_PROFILE} className='rounded-circle' ></img>
            </div>
            <div className='w-50 h4 mt-2 text-white'>
                {activeUser.displayName}
            </div>
            <div className='w-50'>
                <button className='btn btn-light' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar