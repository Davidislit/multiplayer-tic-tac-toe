import { findUser, setOpponents, setGameTurn, gameBoardTurn, verifyGameWinner, gameReset, leaveGame } from '../util/users';
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

        io.to(opponentId).emit('game-invite-confirm',{ opponentId: inviter.id, opponentName: inviter.username, opponentPlay: inviter.player, playerTurn:  opponent.playerTurn , player: opponent.player });
        io.to(socket.id).emit('game-invite-confirm', { opponentId: opponent.id, opponentName: opponent.username, opponentPlay: opponent.player, playerTurn: inviter.playerTurn, player: inviter.player });
    });

    socket.on('game-board-turn', (squares) => {

        const { currentPlayer, opponentPlayer } = gameBoardTurn(socket.id);

        io.to(currentPlayer.id).emit('game-board',{ playerTurn: currentPlayer.playerTurn, squares: squares });
        io.to(opponentPlayer.id).emit('game-board', { playerTurn: opponentPlayer.playerTurn, squares: squares });

        const winner = verifyGameWinner(squares);

        io.to(currentPlayer.id).emit('game-winner',{ winner: winner });
        io.to(opponentPlayer.id).emit('game-winner', { winner: winner });

    });

    socket.on('game-reset', () => {

        const { currentPlayer, opponentPlayer } = gameReset(socket.id);

        io.to(currentPlayer.id).emit('game-reset',{ playerTurn: currentPlayer.playerTurn });
        io.to(opponentPlayer.id).emit('game-reset', { playerTurn: opponentPlayer.playerTurn });

    });

    socket.on('game-invite-reject', (opponentId) => {
        const opponent = findUser(opponentId);
        io.to(opponentId).emit('game-invite-reject', { OpponentName: opponent.username });
    });

    socket.on('game-leave', () => {
       const opponentPlayerId = leaveGame(socket.id);

        io.to(socket.id).emit('game-leave', { leavedGame: false });
        io.to(opponentPlayerId).emit('game-leave', { leavedGame: true });
    });
}
