import { findUser, getUsers, userJoin, userLeave } from '../util/users';
import { io } from '../index';

export const loginEventHandler = (socket) => {

    socket.on('login', (userName) => {
        userJoin(socket.id, userName);
        const users = getUsers();
        io.emit('user-list', users);
    });

    socket.on('get-users', () => {
        const users = getUsers();
        io.emit('get-users', users);
    });

    socket.on('logout', (socketId) => {
        userLeave(socketId);
        console.log('AFTER LOGOUT');
        console.log(getUsers())
    })

    socket.on('disconnect', socket => {
        userLeave(socket.id)
        const users = getUsers();
        users.forEach((user) => {
            if (io.sockets.connected[user.id] === undefined) {
                userLeave(user.id)
            }
        })
        console.log(`${socket.id} disconnected`);
    })

    // update the users
    setInterval(() => {
        const users = getUsers();
        io.emit('get-users', users);
    }, 2000);
}
