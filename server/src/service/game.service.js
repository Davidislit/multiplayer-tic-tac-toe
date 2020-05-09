import {findUserByConnectionId} from "./user.service";


export async function gameInviteConfirmed(playerId, opponentId) {
    const isCurrentUserTurn = Math.floor(Math.random() * 2) + 1 > 1 ? true : false;
    const inviter = await findUserByConnectionId(playerId);
    const opponent = await findUserByConnectionId(opponentId);

    inviter.opponentId = opponent.connectionId;
    inviter.opponentName = opponent.username;
    inviter.playerTurn = isCurrentUserTurn;
    inviter.player = isCurrentUserTurn ? "X" : "O"

    opponent.opponentId = inviter.connectionId;
    opponent.opponentName = inviter.username;
    opponent.playerTurn = !isCurrentUserTurn;
    opponent.player = !isCurrentUserTurn ? "X" : "O";

    await inviter.save();
    await opponent.save();

    return {inviter, opponent};

}

export async function gameBoardTurn(id) {

    const currentPlayer = await findUserByConnectionId(id);
    const opponentPlayer = await findUserByConnectionId(currentPlayer.opponentId);

    currentPlayer.playerTurn = currentPlayer.playerTurn === true ? false : true;
    opponentPlayer.playerTurn = opponentPlayer.playerTurn === true ? false : true;

    await currentPlayer.save();
    await opponentPlayer.save();

    return { currentPlayer, opponentPlayer };
}

export async function verifyGameWinner(squares) {
    let squaresCount = 0;
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[b] === squares[c]
        ) {
            return squares[a];
        }
    }

    squares.forEach((square) => {
        if (square === null) {
            squaresCount++;
        }
    })

    if (squaresCount === 0) {
        return "draw"
    }

    return null;
}

export async function leaveGame(id) {
    const currentPlayer = await findUserByConnectionId(id);
    const opponentPlayer = await findUserByConnectionId(currentPlayer.opponentId);

    currentPlayer.opponentId = "";
    currentPlayer.opponentName = "";

    opponentPlayer.opponentId = "";
    opponentPlayer.opponentName = "";

    await currentPlayer.save();
    await opponentPlayer.save();

    return opponentPlayer.connectionId;

}

export async function gameReset(id) {
    const currentPlayer = await findUserByConnectionId(id);
    const opponentPlayer = await findUserByConnectionId(currentPlayer.opponentId);

    if (currentPlayer.player === 'X') {
        currentPlayer.playerTurn = true;
        opponentPlayer.playerTurn = false;
    } else {
        currentPlayer.playerTurn = false;
        opponentPlayer.playerTurn = true;
    }

    await currentPlayer.save();
    await opponentPlayer.save();

    return { currentPlayer, opponentPlayer };
}