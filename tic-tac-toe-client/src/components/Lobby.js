import React, {useContext, useEffect } from 'react'
import {DispatchContext, StateContext} from "../context/StateContext";
import {SocketContext} from "../context/SocketContext";
import {UserList} from "./UserList";

export default function Lobby() {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext);


    const { username, connectedUsers } = state;

    useEffect(() => {
        socket.emit('get-users');

        socket.on('get-users', (users) => {
            dispatch({ type: 'updateConnectedUsers', payload: users });
        });

        socket.on('game-invite', ({ id, username }) => {
            alert(`${username} invited you to play!`);
        })

    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        socket.emit('logout', socket.id);
        dispatch({ type: 'logout' });
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-2xl font-bold mb-2">{ username } Wellcome To Tic Tac Toe Online!</label>
                <label className="block text-gray-700 text-lg mb-2">Connected Users:</label>
                { connectedUsers.length > 0 ?  <UserList users={connectedUsers} /> : null}
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Logout
                </button>
            </div>
        </div>
    )
}
