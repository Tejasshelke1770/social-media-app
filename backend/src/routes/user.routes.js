import express from "express";
import { followUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/follow/:userId", authMiddleware, followUser);

export default userRouter;
