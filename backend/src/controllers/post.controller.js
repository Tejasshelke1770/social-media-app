import postModel from "../models/post.model.js";
import { uploadImage } from "../services/imageKit.js";

export const createPost = async (req, res) => {
  const { caption } = req.body;
  const file = req.file;
  const user = req.user;

  if (!file) {
    return res.status(400).json({
      message: "Image is required for creating post",
    });
  }
  const { url } = await uploadImage(file);

  const post = await postModel.create({
    caption,
    imageUrl: url,
    userId: user._id,
  });
  return res.status(201).json({
    message: "Post created!",
    post,
  });
};
