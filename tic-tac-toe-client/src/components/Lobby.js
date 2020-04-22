import React, {useContext} from 'react'
import {DispatchContext, StateContext} from "../context/StateContext";
import {SocketContext} from "../context/SocketContext";

export default function Lobby() {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext);

    const { username } = state;

    return (
        <div>
            <h2>Lobby!</h2>
            <h3>User: { username }</h3>
        </div>
    )
}
