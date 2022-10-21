import React from "react";
import ContextAPI from "./contextAPI";

const ContextState = (props) => {
    const currentChat = ''
    const chatWithUser = {}
    const activeUser = {}
    return (
        <ContextAPI.Provider value={{ currentChat, chatWithUser, activeUser }}>
            {props.children}
        </ContextAPI.Provider>
    )
}

export default ContextState