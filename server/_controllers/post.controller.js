import Post from "../_models/Post.model.js"
import User from "../_models/User.model.js"
import {v2 as cloudinary} from "cloudinary"

const createPost = async (req, res) => {
    // postedBy description media likes comments shares
    try {
        const {postedBy, description} = req.body;
        let {media} = req.body;

        if(!postedBy || !description) {
            return res.status(401).json({message: "PostedBy and Description fields are requried"})
        }

        if(!description && !media) return res.status(401).json({message: "Description && media cannot be both empty"})

        const user = await User.findById(postedBy);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "You cannot post for someone else"});
        }

        if(media){
            const mediaResponse = await cloudinary.uploader.upload(media);
            media = mediaResponse.secure_url;
        }

        const newPost = new Post({
            postedBy,
            description,
            media,
        })

        
        await newPost.save()
        res.status(200).json({message: "Successfully Posted", newPost})
        
    } catch (error) {
        console.log("Error in createPost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        res.status(200).json(post)

    } catch (error) {
        console.log("Error in getPost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        if(post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(404).json({message: "Unauthorized to delete post"});
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Post deleted succesfully"})
    } catch (error) {
        console.log("Error in deletePost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const postToModify = await Post.findById(postId);

        if(!postToModify) return res.status(404).json({message: "Post not found"})
        
        const isLiked = postToModify.likes.includes(userId);

        console.log(userId, req.user._id, isLiked)

        if(isLiked){
            // If post is liked by the current user
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
            res.status(200).json({message: "Post unliked successfully"});
        }else {
            await Post.updateOne({_id: postId}, {$push: {likes: userId}});
            res.status(200).json({message: "Post liked successfully"});
        }
    } catch (error) {
        console.log("Error in likeUnlikePost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const shareUnsharePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const postToModify = await Post.findById(postId)

        if(!postToModify) return res.status(404).json({message: "Post not found"});

        const isShared = postToModify.shares.includes(userId);

        if(isShared){
            await Post.updateOne({_id: postId}, {$pull: {shares: userId}});
            res.status(200).json({message: "Post unshared successfully"});
        }else {
            await Post.updateOne({_id: postId}, {$push: {shares: userId}});
            res.status(200).json({message: "Post shared successfully"});
        }

    } catch (error) {
        console.log("Error in shareUnsharePost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const replyToPost = async (req, res) => {
    try {
        const {comment} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if(!comment) {
            return res.status(400).json({message: "Comment is required"});
        }
        
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        const reply = {userId,comment,userProfilePic,username};

        post.comments.push(reply);

        await post.save();

        res.status(200).json({message:  "Reply addedd successfully", post});

    } catch (error) {
        console.log("Error in replyToPost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const getUserPosts = async (req, res) => {
    try {
        const posterId = req.params.id;

        const allPostOfUser = await Post.find({
            postedBy: {$all: posterId}
        })

        if(!allPostOfUser) res.status(404).json({message:  "No Post found"});

        res.status(200).json({message: "Here are the Posts", allPostOfUser})

    } catch (error) {
        console.log("Error in getUserPost controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if(!user) res.status(404).json({message:  "User not found"});

        const following = user.following;

        const feedPosts = await Post.find({postedBy: {$in: following}}).sort({createdAt: -1});

        res.status(200).json({feedPosts})

    } catch (error) {
        console.log("Error in getFeedPosts controller", error.message);
        res.status(500).json({message:  error.message});
    }
}

// Error Handler
// console.log("Error in getPost controller", error.message);
// res.status(500).json({message:  error.message});

export {createPost, getPost, deletePost, likeUnlikePost, shareUnsharePost, replyToPost, getUserPosts, getFeedPosts};