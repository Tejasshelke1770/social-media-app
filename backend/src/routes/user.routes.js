import express from "express";
import { followUser, unfollowUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/follow/:userId", authMiddleware, followUser);
userRouter.post("/unfollow/:userId", authMiddleware, unfollowUser);

export default userRouter;
