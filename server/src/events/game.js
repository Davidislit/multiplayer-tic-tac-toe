import { io } from '../index';
import { findUserByConnectionId } from "../service/user.service";
import {gameInviteConfirmed, gameBoardTurn, verifyGameWinner, leaveGame, gameReset} from "../service/game.service";

export const gameEventHandler = (socket) => { 

    socket.on('game-invite', async (opponentId) => {
        const inviter = await findUserByConnectionId(socket.id);
        console.log(inviter);
        io.to(opponentId).emit('game-invite', { id: socket.id, username: inviter.username });
    });

    socket.on('game-invite-confirm', async (opponentId) => {

        const { inviter, opponent } = await gameInviteConfirmed(socket.id, opponentId);

        io.to(opponentId).emit('game-invite-confirm',{ opponentId: inviter.connectionId, opponentName: inviter.username, opponentPlay: inviter.player, playerTurn:  opponent.playerTurn , player: opponent.player });
        io.to(socket.id).emit('game-invite-confirm', { opponentId: opponent.connectionId, opponentName: opponent.username, opponentPlay: opponent.player, playerTurn: inviter.playerTurn, player: inviter.player });
    });

    socket.on('game-board-turn', async (squares) => {

        const { currentPlayer, opponentPlayer } = await gameBoardTurn(socket.id);

        io.to(currentPlayer.connectionId).emit('game-board',{ playerTurn: currentPlayer.playerTurn, squares: squares });
        io.to(opponentPlayer.connectionId).emit('game-board', { playerTurn: opponentPlayer.playerTurn, squares: squares });

        const winner = await verifyGameWinner(squares);

        io.to(currentPlayer.connectionId).emit('game-winner',{ winner: winner });
        io.to(opponentPlayer.connectionId).emit('game-winner', { winner: winner });

    });

    socket.on('game-reset', async () => {

        const { currentPlayer, opponentPlayer } = await gameReset(socket.id);

        io.to(currentPlayer.connectionId).emit('game-reset',{ playerTurn: currentPlayer.playerTurn });
        io.to(opponentPlayer.connectionId).emit('game-reset', { playerTurn: opponentPlayer.playerTurn });

    });

    socket.on('game-invite-reject', async (opponentId) => {
        const opponent = await findUserByConnectionId(opponentId);
        io.to(opponentId).emit('game-invite-reject', { OpponentName: opponent.username });
    });

    socket.on('game-leave', async () => {
       const opponentPlayerId = await leaveGame(socket.id);

        io.to(socket.id).emit('game-leave', { leavedGame: false });
        io.to(opponentPlayerId).emit('game-leave', { leavedGame: true });
    });
}
