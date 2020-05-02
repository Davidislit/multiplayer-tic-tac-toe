import { Schema } from 'mongoose';

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: Number
});


module.exports = mongoose.model('User', userSchema);
