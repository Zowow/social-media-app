import express from "express";
import { followUnfollowUser, updateUser, getUserProfile} from "../_controllers/user.controller.js"

import protectRoute from "../_middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile)

router.post("/follow/:id", protectRoute, followUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;