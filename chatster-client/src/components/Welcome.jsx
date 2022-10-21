import React from 'react'
import CONSTANTS from '../constants'
import './style.css'

const Welcome = () => {
    return (
        <div className='d-grid gap-2 p-4 m-4'>
            <div className='welcome pt-4 mt-4'>
                {CONSTANTS.WELCOME}
            </div>
            <div className='appName'>
                <h1>{CONSTANTS.APP_NAME}</h1>
            </div>
        </div>
    )
}

export default Welcome