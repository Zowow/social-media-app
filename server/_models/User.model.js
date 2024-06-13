import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: "",
    },
    coverPic: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        maxLength: 200,
        default: "",
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    posts: {
        type: [String],
        default: []
    },
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export  default User;