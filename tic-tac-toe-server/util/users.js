let users = [];

// User Join the game
function userJoin(id, username) {
    const user = { id, username, playerTurn: false, player: "" };
    users.push(user);
    return user;
}

// find user
function findUser(id) {
    return users.find(user => user.id === id);
}

// User leaves game
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users.splice(index, 1);
    }

}

function findUserIndex(id) {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null
    }

    return index;
}

function setOpponents(id, opponentId) {
    const currentUserIndex = findUserIndex(id);
    const opponentUserIndex = findUserIndex(opponentId);
    users[currentUserIndex] = { ...users[currentUserIndex], opponentId: opponentId  };
    users[opponentUserIndex] = { ...users[opponentUserIndex], opponentId: id  };
    return;
}

function setGameTurn(id, opponentId) {
    const isCurrentUserTurn = Math.floor(Math.random() * 2) + 1 > 1 ? true : false;
    const currentUserIndex = findUserIndex(id);
    const opponentUserIndex = findUserIndex(opponentId);

    users[currentUserIndex] = {
        ...users[currentUserIndex],
        playerTurn: isCurrentUserTurn,
        player: isCurrentUserTurn ? "X" : "O"
    };

    users[opponentUserIndex] = {
        ...users[opponentUserIndex],
        playerTurn: !isCurrentUserTurn,
        player: !isCurrentUserTurn ? "X" : "O"
    };

}

function gameBoardTurn(id) {

    let currentPlayer = findUser(id);
    const opponentPlayer = findUser(currentPlayer.opponentId);

    currentPlayer.playerTurn = currentPlayer.playerTurn === true ? false : true;
    opponentPlayer.playerTurn = opponentPlayer.playerTurn === true ? false : true;

    return { currentPlayer, opponentPlayer };
}

function getUserExceptId(id) {
    return users.filter(user => user.id !== id)
}

function getUsers () {
    return users;
}

function verifyGameWinner(squares) {
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

    return null;
}

function gameReset(id) {
    let currentPlayer = findUser(id);
    let opponentPlayer = findUser(currentPlayer.opponentId);

    if (currentPlayer.player === 'X') {
        currentPlayer.playerTurn = true;
        opponentPlayer.playerTurn = false;
    } else {
        currentPlayer.playerTurn = false;
        opponentPlayer.playerTurn = true;
    }

    return { currentPlayer, opponentPlayer };
}

function leaveGame(id) {
    const currentUserIndex = findUserIndex(id);
    const opponentUserIndex = findUserIndex(users[currentUserIndex].opponentId);
    const opponentPlayerId = users[opponentUserIndex].id;

    users[currentUserIndex] = { ...users[currentUserIndex], opponentId: "", playerTurn: "", player: "" };
    users[opponentUserIndex] = { ...users[opponentUserIndex], opponentId: "", playerTurn: "", player: ""  };

    return opponentPlayerId;

}

module.exports = {
    userJoin,
    findUser,
    userLeave,
    setOpponents,
    getUsers,
    getUserExceptId,
    setGameTurn,
    gameBoardTurn,
    verifyGameWinner,
    gameReset,
    leaveGame
}