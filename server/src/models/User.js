import { Schema, model } from 'mongoose';

const userSchema = Schema({
    username: {
        type: String,
        // unique: true,
        required: true
    },
    connectionId: {
        type: String,
        required: true
    },
    opponentId: {
        type: String,
    },
    opponentName: {
        type: String,
    },
    player: String,
    playerTurn: Boolean,
});


const User = model('User', userSchema);

export default User;

// module.exports = mongoose.model('User', userSchema);
