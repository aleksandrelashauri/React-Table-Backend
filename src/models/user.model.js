const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        uniqeu: true
    },
    password: {
        type: String
    },
    userToken: {
        type: String,
        default: null
    },
    owner: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
