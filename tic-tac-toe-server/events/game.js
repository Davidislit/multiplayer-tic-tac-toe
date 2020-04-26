import { findUser, setOpponents, setGameTurn, gameBoardTurn } from '../util/users';
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

        console.log(`game-invite-confirm: inviter: ${inviter.playerTurn} opponent: ${opponent.playerTurn}`)

        io.to(opponentId).emit('game-invite-confirm',{ opponentId: inviter.id, opponentName: inviter.username, playerTurn: inviter.playerTurn, player: inviter.player });
        io.to(socket.id).emit('game-invite-confirm', { opponentId: opponent.id, opponentName: opponent.username, playerTurn: opponent.playerTurn, player: opponent.player });
    });

    socket.on('game-board-turn', (squares) => {

        const { currentPlayer, opponentPlayer } = gameBoardTurn(socket.id);
        // const currentPlayer = findUser(socket.id);
        // const opponentPlayer = findUser(currentPlayer.opponentId);
        // currentPlayer.playerTurn = !currentPlayer.playerTurn;
        // opponentPlayer.playerTurn = !opponentPlayer.playerTurn;
        // check winner

        console.log(`${currentPlayer.username} currentPlayer.playerTurn ${currentPlayer.playerTurn}, ${opponentPlayer.username} opponentPlayer.playerTurn ${opponentPlayer.playerTurn}`);


        io.to(currentPlayer.id).emit('game-board',{ playerTurn: currentPlayer.playerTurn, squares: squares });
        io.to(opponentPlayer.id).emit('game-board', { playerTurn: opponentPlayer.playerTurn, squares: squares });

    });

    socket.on('game-invite-reject', (opponentId) => {
        const opponent = findUser(opponentId);
        io.to(opponentId).emit('game-invite-reject', { OpponentName: opponent.username });
        // io.to(socket.id).emit('invite-game-start', opponentId);
    });
}
