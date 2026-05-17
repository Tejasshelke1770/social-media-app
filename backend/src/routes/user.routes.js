import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  acceptFollowReqest,
  followUser,
  listFollowRequests,
  rejectFollowRequest,
  unfollowUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/follow/:userId", authMiddleware, followUser);
userRouter.post("/unfollow/:userId", authMiddleware, unfollowUser);
userRouter.get("/follow/requests", authMiddleware, listFollowRequests);
userRouter.post("/follow/approve/:requestId", authMiddleware, acceptFollowReqest);
userRouter.post("/follow/reject/:requestId", authMiddleware, rejectFollowRequest);

export default userRouter;
