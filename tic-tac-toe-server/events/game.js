import { findUser, setOpponents, setGameTurn } from '../util/users';
import { io } from '../index';

export const gameEventHandler = (socket) => { 

    socket.on('game-invite', (opponentId) => {
        const opponent = findUser(opponentId);
        const inviter = findUser(socket.id);
        io.to(opponentId).emit('game-invite', { id: socket.id, username: inviter.username });
    });

    socket.on('game-invite-confirm', (opponentId) => {
        setOpponents(socket.id, opponentId);
        setGameTurn(socket.id, opponentId);
        const inviter = findUser(socket.id);
        const opponent = findUser(opponentId);
        io.to(opponentId).emit('game-invite-confirm',{ opponentId: inviter.id, opponentName: inviter.username, playerTurn: inviter.playerTurn, player: inviter.player });
        io.to(socket.id).emit('game-invite-confirm', { opponentId: opponent.id, opponentName: opponent.username, playerTurn: opponent.playerTurn, player: opponent.player });
    });

    socket.on('game-board-turn', () => {

    });

    socket.on('game-invite-reject', (opponentId) => {
        const opponent = findUser(opponentId);
        io.to(opponentId).emit('game-invite-reject', { OpponentName: opponent.username });
        // io.to(socket.id).emit('invite-game-start', opponentId);
    });
}
