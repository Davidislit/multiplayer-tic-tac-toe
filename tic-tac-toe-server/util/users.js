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

function setOpponents(id, opponentId) {
    const currentUser = findUser(id);
    const opponentUser = findUser(opponentId);
    opponentUser.opponentId = id;
    currentUser.opponentId = opponentId;
    return opponentId;
}

function setGameTurn(id, opponentId) {
    const isCurrentUserTurn = Math.floor(Math.random() * 2) + 1 > 1 ? true : false;
    const currentUser = findUser(id);
    const opponentUser = findUser(opponentId);
    currentUser.playerTurn = isCurrentUserTurn;
    currentUser.player = isCurrentUserTurn ? "X" : "O";
    opponentUser.playerTurn = !isCurrentUserTurn;
    opponentUser.player = currentUser.player === "X" ? "O" : "X";


    console.log(`setGameTurn: currentUser: ${currentUser.playerTurn} opponentUser: ${opponentUser.playerTurn}`)
}

function gameBoardTurn(id) {

    console.log(`id: ${id}`);
    const currentPlayer = findUser(id);
    console.log(`${currentPlayer.username} currentPlayer.opponentId: ${currentPlayer.opponentId}`)
    const opponentPlayer = findUser(currentPlayer.opponentId);

    console.log('FIRST gameBoardTurn:');
    console.log(`${currentPlayer.username} currentPlayer.playerTurn ${currentPlayer.playerTurn}, ${opponentPlayer.username} opponentPlayer.playerTurn ${opponentPlayer.playerTurn}`);

    // currentPlayer.playerTurn = !currentPlayer.playerTurn;
    // opponentPlayer.playerTurn = !opponentPlayer.playerTurn;

    console.log('SECOND gameBoardTurn:');
    console.log(`${currentPlayer.username}  currentPlayer.playerTurn ${currentPlayer.playerTurn},  ${opponentPlayer.username} opponentPlayer.playerTurn ${opponentPlayer.playerTurn}`);

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