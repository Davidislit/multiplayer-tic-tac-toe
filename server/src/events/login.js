import {userJoin, userLeave} from '../util/users';
import { io } from '../index';
import {deleteById, getUsers, validateConnectedUsers} from '../service/user.service';

export const loginEventHandler = (socket) => {

    socket.on('login', async (userName) => {
        const connected = await userJoin(socket.id, userName);
        const users = getUsers();
        socket.emit('login', { connected, userName });
        io.emit('user-list', users);
    });

    socket.on('get-users', async () => {
        const users = await getUsers();
        io.emit('get-users', users);
    });

    socket.on('logout', (socketId) => {
        deleteById(socketId);
    });

    socket.on('disconnect', async (socket) => {
        console.log(`${socket.id} disconnected`);
        deleteById(socket.id)
        validateConnectedUsers(io);
    });

    // update the users
    setInterval(() => {
        validateConnectedUsers(io);
    }, 2000);

}
