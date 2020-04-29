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
    // currentUser.opponentId = opponentId;
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

    // currentUser.playerTurn = isCurrentUserTurn;
    // currentUser.player = isCurrentUserTurn ? "X" : "O";

    users[opponentUserIndex] = {
        ...users[opponentUserIndex],
        playerTurn: !isCurrentUserTurn,
        player: !isCurrentUserTurn ? "X" : "O"
    };
    // opponentUser.playerTurn = !isCurrentUserTurn;
    // opponentUser.player = !isCurrentUserTurn? "X" : "O";

    console.log(`isCurrentUserTurn: ${isCurrentUserTurn}`);

    console.log(`setGameTurn: ${users[currentUserIndex].username} playering: ${users[currentUserIndex].player} and his turn: ${users[currentUserIndex].playerTurn}`);
    console.log(`setGameTurn: ${users[opponentUserIndex].username} playering: ${users[opponentUserIndex].player} and his turn: ${users[opponentUserIndex].playerTurn}`);
}

function gameBoardTurn(id) {

    let currentPlayer = findUser(id);
    const opponentPlayer = findUser(currentPlayer.opponentId);

    currentPlayer.playerTurn = currentPlayer.playerTurn === true ? false : true;
    opponentPlayer.playerTurn = opponentPlayer.playerTurn === true ? false : true;

    console.log(`gameBoardTurn: ${currentPlayer.username} playering: ${currentPlayer.player} and his turn: ${currentPlayer.playerTurn}`);
    console.log(`gameBoardTurn: ${opponentPlayer.username} playering: ${opponentPlayer.player} and his turn: ${opponentPlayer.playerTurn}`);

    return { currentPlayer, opponentPlayer };
}

function getUserExceptId(id) {
    return users.filter(user => user.id !== id)
}

function getUsers () {
    return users;
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
}