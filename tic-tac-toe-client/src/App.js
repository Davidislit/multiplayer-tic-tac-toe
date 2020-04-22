import React, {useEffect} from 'react';
import './styles/main.css';
import {useImmerReducer} from 'use-immer';
import {loginReducer} from './reducers/LoginReducer';
import {initialState} from './store/InitialState';
import {StateContext, DispatchContext} from './context/StateContext';
import Lobby from './components/Lobby';
import Login from './components/Login';
import {SocketContext} from "./context/SocketContext";
import io from "socket.io-client";
import {socket} from "./store/socket";

function App() {

    const [state, dispatch] = useImmerReducer(loginReducer, initialState);

    const {isLoggedIn} = state;

    // const socket = useSocket('localhost:5000', {autoConnect:false});
    // const socket = io('localhost:5000');

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
                        {isLoggedIn ? <Lobby/> : <Login/>}
                    </div>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </SocketContext.Provider>
    );
}

export default App;
