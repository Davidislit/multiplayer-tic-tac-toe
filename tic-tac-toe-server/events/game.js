import { findUser, setOpponents } from '../util/users';
import { io } from '../index';

export const gameEventHandler = (socket) => { 

    socket.on('game-invite', (opponentId) => {
        const opponent = findUser(opponentId);
        const inviter = findUser(socket.id);
        io.to(opponentId).emit('game-invite', { id: socket.id, username: inviter.username });
    });

    socket.on('game-invite-confirm', (opponentId) => {
        setOpponents(socket.id, opponentId);
        io.to(opponentId).emit('game-invite-confirm', socket.id);
        io.to(socket.id).emit('game-invite-confirm', opponentId);
    });

    socket.on('game-invite-reject', (opponentId) => {
        const opponent = findUser(opponentId);
        io.to(opponentId).emit('game-invite-reject', { OpponentName: opponent.username });
        // io.to(socket.id).emit('invite-game-start', opponentId);
    });
}
