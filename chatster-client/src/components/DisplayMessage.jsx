import React, { useContext } from 'react'
import CONSTANTS from '../constants'
import ContextAPI from '../context/contextAPI'
import './style.css'

const DisplayMessage = (props) => {
    const context = useContext(ContextAPI)
    const style = props.message.senderId === context.activeUser.uid ? CONSTANTS.STYLED_SENDER : CONSTANTS.STYLED_RECIEVER

    return (
        <div>
            {
                props.message ? <div className={style}>
                    {props.message.text}
                </div> : null
            }
        </div>
    )
}

export default DisplayMessage