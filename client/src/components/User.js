import * as React from 'react';
import {useRef} from "react";
import {useContext} from "react";
import {SocketContext} from "../context/SocketContext";

export const User = ({ user }) => {

    const socket = useContext(SocketContext);
    const userNameRef = useRef();

    const handleMouseEnter = () => {
        userNameRef.current.style.color = "#4a5568";
    }

    const handleMouseLeave = () => {
        userNameRef.current.style.color = "#fff";
    }

    const handleInvite = () => {
        socket.emit('game-invite', user.id );
    }

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleInvite}
                className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                <div className="flex-grow text-lg px-2">{user.username}</div>
                <div ref={userNameRef} className="text-white">Invite to play</div>
            </div>
        </>
    );
}