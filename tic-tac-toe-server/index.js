import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { userJoin, findUser, userLeave, getUsers, setOpponents, getUserExceptId } from './util/users';
import { loginEventHandler } from './events/login';
import { gameEventHandler } from './events/game';

const app = express();
const server = http.createServer(app);
export const io = socketio(server);

io.on('connection', socket => {

    console.log(`${socket.id} connected`);

    gameEventHandler(socket);
    loginEventHandler(socket);
    
});

const botName = "ChatCord Bot";

// set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
// io.on('connection', socket => {
//     console.log(`${socket.id} connected`);
//     // socket.on('joinRoom', ({ username, room }) => {
//         // const user = userJoin(socket.id, username, room);

//         // socket.join(user.room);

//         // send to the client
//         // socket.emit('message', formatMessage(botName, 'Wellcome to ChatCord!'));

//         // Broadcast when a user connects
//         // sends every one except the connected user
//         // socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat!`));

//         // listen for chat message
//         socket.on('chatMessage', (msg) => {
//             // const user = getCurrentUser(socket.id);
//             // io.to(user.room).emit('message', formatMessage(user.username, msg));
//         })

//         socket.on('disconnect', () => {

//             // const user = userLeave(socket.id);

//             //     if (user) {
//             //         io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat!`));
//             //     }

//             //     // Send users and room info
//             //     io.to(user.room).emit('roomUsers', {
//             //         room: user.room,
//             //         users: getRoomUsers(user.room),
//             //     })
//             // })

//             // // Send users and room info
//             // io.to(user.room).emit('roomUsers', {
//             //     room: user.room,
//             //     users: getRoomUsers(user.room),
//             // })

//         })

//         //     // sends every one!
//         //     // io.emit()


//     });

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});