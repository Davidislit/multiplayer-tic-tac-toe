import React, {useContext, useEffect, useState } from 'react'
import {DispatchContext, StateContext} from "../context/StateContext";
import {SocketContext} from "../context/SocketContext";
import {UserList} from "./UserList";
import Modal from 'react-modal';
import Board from './Board';
import { ToastsStore } from 'react-toasts';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #ebf8ff'
    }
};

export default function Lobby() {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext);

    const [inviteModal, setInviteModal] = useState(false);
    const [inviterDetails, setInviterDetails] = useState({}); 

    const { username, connectedUsers, inGame } = state;


    useEffect(() => {
        const getUsersInterval = setInterval(() => {
            socket.emit('get-users');
        }, 1000);

        socket.on('get-users', (users) => {
            dispatch({ type: 'updateConnectedUsers', payload: users });
        });

        socket.on('game-invite', ({ id, username }) => {
            setInviteModal(true);
            setInviterDetails({ id, username });
        })
        
        socket.on('game-invite-confirm', ({ opponentId, opponentName, playerTurn, player }) => {
            console.log(`${opponentId} and ${opponentName} and ${playerTurn} and ${player}`)
            dispatch({ type: 'start-game', payload: { opponentId, opponentName, playerTurn, player }})
        })

        socket.on('game-invite-reject', ({ OpponentName }) => {
            ToastsStore.warning(`${OpponentName} rejected the game invite.`);
        })

        return () => { 
            clearInterval(getUsersInterval);
        }

    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        socket.emit('logout', socket.id);
        dispatch({ type: 'logout' });
    }

    const handleReject = () => { 
        setInviteModal(false);
        socket.emit('game-invite-reject', inviterDetails.id);
        // setInviterDetails({});
    }

    const handleAccept = () => { 
        setInviteModal(false);
        socket.emit('game-invite-confirm', inviterDetails.id);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-2xl font-bold mb-2">{ username } Wellcome To Tic Tac Toe Online!</label>
                <label className="block text-gray-700 text-lg mb-2">Connected Users:</label>
                <UserList users={connectedUsers} />
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Logout
                </button>
            </div>
            <Modal
                isOpen={inviteModal}
                style={customStyles}
                role={"dialog"}
            >
                <p className="text-xl pb-5">{inviterDetails.username} Invite you to play</p>
                <button
                    onClick={handleReject}
                    className="bg-red-500 hover:bg-red-700 active:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Reject
                </button>
                <button
                    onClick={handleAccept}
                    className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Accept
                </button>
            </Modal>
            
        </div>
    )
}
