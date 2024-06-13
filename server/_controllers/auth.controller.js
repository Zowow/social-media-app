import User from "../_models/User.model.js"

import generateTokenAndSetCookie from "../_utils/generateTokenAndSetCookie.js"

import bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password, confirmPassword} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Password do not match"});
        }

        const user_username = await User.findOne({username})

        if(user_username){
           return res.status(400).json({message: "Username already exist"});
        }

        const user_email = await User.findOne({email})

        if(user_email){
            return res.status(400).json({message: "Email already exist"});
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        })

        if(newUser) { 
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                email: newUser.email,
            }) 
        } else {
            res.status(400).json({message: message})
        }

    } catch (message) {
        console.log("Error in signup controller");
        res.status(500).json({message: "Internal Server message"});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user) {
            return res.status(400).json({message: "Username does not exist"});
        }

        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Wrong Password, please try again"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            posts: user.posts,
            profilePic: user.profilePic,
            coverPic: user.coverPic,
            bio: user.bio
        })

    } catch (message) {
        console.log("Error in login controller");
        res.status(500).json({message: "Internal Server message"});
    }
}


export const logout = async (req, res) => {
    try {
        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (message) {
        console.log("Error in logout controller");
        res.status(500).json({message: "Internal Server message"});
    }
}


