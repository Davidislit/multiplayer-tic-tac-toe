import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { loginEventHandler } from './events/login';
import { gameEventHandler } from './events/game';
import {connect}  from "mongoose";

import redis from 'socket.io-redis';
// const redis = require('socket.io-redis');

import {config} from "dotenv";

config();
const app = express();
const server = http.createServer(app);
export const io = socketio(server);

connect(`mongodb://${process.env.mongoURL}/tictactoedb`, { useNewUrlParser: true } );
io.adapter(redis({ host: process.env.redisURL, port: process.env.redisPort }));

io.on('connection', socket => {

    console.log(`${socket.id} connected`);

    gameEventHandler(socket);
    loginEventHandler(socket);
    
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});