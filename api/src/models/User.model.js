const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    usename: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profile_picture: {
        type: String,
        default: ""
    },
    cover_picture: {
        type: String,
        default: ""
    },
    followes: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)