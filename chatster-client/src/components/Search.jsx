import React, { useState } from 'react'
import CONSTANTS from '../constants'
import UserChatService from '../services/userChatService'
import './style.css'

const Search = () => {
    const [name, setName] = useState()
    const [user, setUser] = useState()
    const currentUser = JSON.parse(localStorage.getItem(CONSTANTS.USER_SCHEMA))
    const userChatServiceObj = new UserChatService()

    const onchangeHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSearch = async () => {
        const users = await userChatServiceObj.getUsers({ displayName: name })
        setUser(users.data)
    }

    const handleKey = (e) => {
        e.code === CONSTANTS.ENTER_KEY && handleSearch()
    }

    const handleSelect = async (user) => {
        const combinedId =
            currentUser._id > user._id
                ? currentUser._id + user._id
                : user._id + currentUser._id;
        try {
            userChatServiceObj.createNewChat({
                chatId: combinedId,
                currentId: currentUser._id,
                user: user._id
            })
        } catch (err) { }

        setUser(null);
        setName("")
    };

    return (
        <div>
            <div className="form-floating mb-3 border-bottom">
                <input type="text" className="form-control border-0 bg-transparent" value={name} onKeyDown={handleKey} name={CONSTANTS.NAME_FIELD} onChange={onchangeHandler} id="floatingInput" placeholder={CONSTANTS.NAME_PLACEHOLDER} />
                <label for="search">{CONSTANTS.SEARCH_FOR_USER}</label>
            </div>

            {user ? (
                user.map((u) => {
                    return (
                        <div className="border-bottom p-3" key={u._id} onClick={() => handleSelect(u)}>
                            <div>
                                <span>{u.displayName}</span>
                            </div>
                        </div>
                    )
                })
            ) : null}
        </div>
    )
}

export default Search