import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { loginEventHandler } from './events/login';
import { gameEventHandler } from './events/game';
import {connect}  from "mongoose";
var cors = require('cors');

const app = express();
const server = http.createServer(app);
export const io = socketio(server);

// connect("mongodb://localhost:27016/tictactoedb", { useNewUrlParser: true } );

app.use(cors());

io.on('connection', socket => {

    console.log(`${socket.id} connected`);

    gameEventHandler(socket);
    loginEventHandler(socket);
    
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});