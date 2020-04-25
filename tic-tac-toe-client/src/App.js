import React, { useEffect } from 'react';
import './styles/main.css';
import { useImmerReducer } from 'use-immer';
import { loginReducer } from './reducers/LoginReducer';
import { initialState } from './store/InitialState';
import { StateContext, DispatchContext } from './context/StateContext';
import Lobby from './components/Lobby';
import Login from './components/Login';
import { SocketContext } from "./context/SocketContext";
import { socket } from "./store/socket";
import Board from './components/Board';
import { ToastsContainer, ToastsStore } from 'react-toasts';

function App() {

    const [state, dispatch] = useImmerReducer(loginReducer, initialState);
    const { isLoggedIn, inGame } = state;

    useEffect(() => {
        if (state.localData) {
            socket.emit('login', state.localData);
        }

        socket.on('disconnect', () => {
            socket.emit('disconnect', socket.id);
        })

    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <div>
                        {isLoggedIn ? isLoggedIn && inGame ? <Board /> : <Lobby /> : <Login />}
                        {/* <Board /> */}
                        <ToastsContainer store={ToastsStore} />
                    </div>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </SocketContext.Provider>
    );
}

export default App;
