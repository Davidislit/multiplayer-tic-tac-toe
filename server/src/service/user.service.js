import User from "../models/User";
import {io} from "../index";

export async function authenticate(username, connectionId) {
    const user = await User.findOne({ username });
    console.log(user);
    if (user) {
        return false;
    } else {

        console.log({ username, connectionId });

        const user = new User({ username, connectionId});

        await user.save();

        return true;
    }
}

export async function deleteById(connectionId) {
    await User.findOneAndDelete({connectionId});
}

export async function getUsers() {
    return [...await User.find()];
}

export async function findUserByConnectionId(connectionId) {
    const user = await User.findOne({connectionId});
    return user;
}

export async function validateConnectedUsers(io) {
    const users = await getUsers();
    if (users.length > 0) {
        users.forEach((user) => {
            if (io.sockets.connected[user.connectionId] === undefined) {
                deleteById(user.connectionId)
            }
        })
    }
}