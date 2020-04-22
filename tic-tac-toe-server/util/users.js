const users = [];

// User Join the game
function userJoin(id, username) {
    const user = { id, username };
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
        return users.splice(index, 1)[0];
    }

}

// Get room users
function setOpponents(id, opponentId) {
    const currentUser = findUser(id);
    const opponentUser = findUser(opponentId);
    opponentUser.opponentId = id;
    currentUser.opponentId = opponentId;
    return opponentId;
}

function getUserById(id) {
    return users;
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
    getUserById,
    setOpponents,
    getUsers
}