import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        maxLength: 500,
    },
    media: {
        type: [String],
        default: [],
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            comment: {
                type: String,
                maxLength: 500,
                required: true,
            },
            userProfilePic: {
                type: String
            },
            username: {
                type: String
            }
        }
    ],
    shares: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    }            

})

const Post = mongoose.model("Post", postSchema)

export default Post;