import express from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getPostDetails,
  getPosts,
} from "../controllers/post.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const postRouter = express.Router();

postRouter.post("/", upload.single("image"), authMiddleware, createPost);

postRouter.get("/", authMiddleware, getPosts);

postRouter.get("/detail/:postId", authMiddleware, getPostDetails);

export default postRouter;
