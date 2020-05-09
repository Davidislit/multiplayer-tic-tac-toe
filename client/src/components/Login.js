import React, {useContext, useEffect} from 'react'
import {DispatchContext, StateContext} from "../context/StateContext";
import {SocketContext} from "../context/SocketContext";
import {ToastsStore} from "react-toasts";

export default function Login() {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext);

    const {username, isLoading, error} = state;

    useEffect(  () => {
        socket.on('login', async ({ connected, userName }) => {
            if (connected) {
                dispatch({ type: 'login-success', payload: userName })
            } else {
                dispatch({ type: 'login-fail' });
                ToastsStore.error(`User name is already taken.`);
            }

        })
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({type: 'login'});
            socket.emit('login', username);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-2xl font-bold mb-2">Welcome to TicTacToe Online!</label>
                    <label className="block text-gray-700 text-lg mb-2">Please choose user name:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e =>
                            dispatch({
                                type: 'field',
                                fieldName: 'username',
                                payload: e.currentTarget.value,
                            })
                        }
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </div>
            </form>
        </div>
    )
}
