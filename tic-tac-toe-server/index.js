const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
// const formatMessage = require('./utils/messages');
const { userJoin, findUser, userLeave, getUsers, setOpponents } = require('./util/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {

    console.log(`${socket.id} connected`);

    socket.on('join', (userName) => {
        userJoin(socket.id, userName);
        const users = getUsers();
        io.emit('user-list', users);
    })

    socket.on('invite-game', (opponentId) => {
        const opponent = findUser(opponentId);
        console.log(`${socket.id} invites ${opponentId} to play`);
        // if (opponent.opponentId !== "") {
        io.to(opponentId).emit('invite-game', socket.id);
        // } else { 
        // io.to(socket.id).emit('already-in-game', opponentId);
        // }       
    })

    socket.on('invite-game-confirm', (opponentId) => {
        setOpponents(socket.id, opponentId);
        io.to(opponentId).emit('invite-game-start', socket.id);
        io.to(socket.id).emit('invite-game-start', opponentId);
    })


    socket.on('disconnect', socket => {
        userLeave(socket.id)
        console.log(`${socket.id} disconnected`);
    })

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