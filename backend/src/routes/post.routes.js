import express from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getFeed,
  getPostDetails,
  getPosts,
  likePost,
} from "../controllers/post.controller.js";
import postModel from "../models/post.model.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const postRouter = express.Router();

postRouter.post("/", upload.single("image"), authMiddleware, createPost);

postRouter.get("/", authMiddleware, getPosts);

postRouter.get("/detail/:postId", authMiddleware, getPostDetails);

postRouter.post("/like/:postId", authMiddleware, likePost);

postRouter.get('/feed', authMiddleware, getFeed)

export default postRouter;
