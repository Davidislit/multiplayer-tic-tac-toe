import React, {useContext, useEffect} from 'react'
import {DispatchContext, StateContext} from "../context/StateContext";
import {SocketContext} from "../context/SocketContext";

export default function Lobby() {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext);

    const { username, connectedUsers } = state;

    useEffect(() => {
        socket.emit('get-users');

        socket.on('get-users', (users) => {
            console.log(users);
            dispatch({ type: 'updateConnectedUsers', payload: users });
        })

    }, []);

    const renderUsers = () => {
        return connectedUsers.map(user => <div key={user.id}>{user.username}</div>)
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-2xl font-bold mb-2">{ username } Wellcome To Tic Tac Toe Online!</label>
                <label className="block text-gray-700 text-lg mb-2">Connected Users:</label>
                { connectedUsers.length > 0 ?  renderUsers() : null}
            </div>
        </div>
    )
}
