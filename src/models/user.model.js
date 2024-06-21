const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    reset: {
        code: {
            type: String,
            default: null,
        },
        time: {
            type: Date,
            default: null
        }
    }


}, { collection: "user", timestamps: true })


const User = mongoose.model("user", userSchema)
module.exports = User;