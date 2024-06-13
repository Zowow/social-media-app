import express from "express";
import protectRoute from "../_middlewares/protectRoute.js"

import {createPost, getPost, deletePost, likeUnlikePost, shareUnsharePost, replyToPost, getUserPosts, getFeedPosts} from "../_controllers/post.controller.js"

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts)
router.get("/:id", getPost)
router.delete("/:id", protectRoute, deletePost)
router.post("/create", protectRoute, createPost)
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/share/:id", protectRoute, shareUnsharePost)
router.post("/reply/:id", protectRoute, replyToPost)
router.get("/userPost/:id", getUserPosts)



export default router;