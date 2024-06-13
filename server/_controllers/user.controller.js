import User from "../_models/User.model.js";
import bcrypt from "bcryptjs"
import {v2 as cloudinary} from "cloudinary"

// POST
const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        // toString was used to extract the id from ObjectId("id")
        if(id === req.user._id.toString()) return res.status(401).json({message: "You cannot follow/unfollow yourself"});

        if(!userToModify || !currentUser) return res.status(401).json({message:  "User not found"});

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow user
            // Modify current user following, modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id,}});
            res.status(200).json({message: "User unfollowed successfully"})
        } else {
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id,}});
            res.status(200).json({message: "User followed successfully"})
        }
        
    } catch (error) {
        console.log("Error in followUnfollowUser controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const updateUser = async (req, res) => {
    const {firstName, lastName, email, username, password, bio} = req.body;
    let { profilePic } = req.body;
    let { coverPic } = req.body;
    const userId = req.user._id;
    console.log(req.params.id, userId)

    try {
        let user = await User.findById(userId);

        if(!user) return res.status(404).json({message:  "User not found"});

        if(req.params.id !== userId.toString()) return res.status(401).json({message: "You cannot update other people's profile"});

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
            const uploadedProfileResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedProfileResponse.secure_url;
        }
        
        if(coverPic){
            if(user.coverPic){
                await cloudinary.uploader.destroy(user.coverPic.split("/").pop().split(".")[0])
            }
            const uploadedCoverResponse = await cloudinary.uploader.upload(coverPic);
            coverPic = uploadedCoverResponse.secure_url;
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.coverPic = coverPic || user.coverPic;
        user.bio = bio || user.bio; 

        user = await user.save();

        user.password = undefined; // undefined = does not show "password" ---- null = password: null

        res.status(200).json(user)

    } catch (error) {
        console.log("Error in updateUser controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

// GET
const getUserProfile = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUserProfile controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

export {followUnfollowUser, updateUser, getUserProfile};