import { collection, doc, getDocs, getDoc, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import CONSTANTS from '../constants'
import { db } from '../firebase'
import './style.css'

const Search = () => {
    const [name, setName] = useState()
    const [user, setUser] = useState()
    const currentUser = JSON.parse(localStorage.getItem(CONSTANTS.USER_SCHEMA))

    const onchangeHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSearch = async () => {
        const q = query(collection(db, CONSTANTS.USERS_SCHEMA), where(CONSTANTS.DISPLAY_NAME_ENTITY, CONSTANTS.EQUALS_SIGN, name));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setUser(doc.data())
        })
    }

    const handleKey = (e) => {
        e.code === CONSTANTS.ENTER_KEY && handleSearch()
    }

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, CONSTANTS.CHATS_SCHEMA, combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, CONSTANTS.CHATS_SCHEMA, combinedId), { messages: [] });
                await updateDoc(doc(db, CONSTANTS.USER_CHATS_SCHEMA, currentUser.uid), {
                    [combinedId + CONSTANTS.DOT_USER_INFO]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + CONSTANTS.DOT_DATE]: serverTimestamp(),
                });
                await updateDoc(doc(db, CONSTANTS.USER_CHATS_SCHEMA, user.uid), {
                    [combinedId + CONSTANTS.DOT_USER_INFO]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + CONSTANTS.DOT_DATE]: serverTimestamp(),
                });
            }
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

            {user && (
                <div className="border-bottom" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" width="20%" classname="rounded-circle" />
                    <div>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search