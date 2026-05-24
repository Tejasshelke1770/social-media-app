import mongoose from "mongoose";
import postModel from "../models/post.model.js";
import likeModel from "../models/like.model.js";
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

export const getPosts = async (req, res) => {
  const userId = req.user._id;

  const posts = await postModel.find({ userId: userId });

  return res.status(200).json({
    message: "post fetched successfully",
    posts,
  });
};

export const getPostDetails = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid Post Id",
    });
  }

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found!",
    });
  }

  const isValidUser = post.userId.toString() == userId.toString();

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "post fetched Successfully",
    post,
  });
};

export const likePost = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  if (!postId) {
    return res.status(400).json({
      message: "post id is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid post id",
    });
  }

  const isPostExist = await postModel.findById(postId);

  if (!isPostExist) {
    return res.status(404).json({
      message: "post does not exist",
    });
  }

  const isPostAlreadyLiked = await likeModel.findOne({
    postId,
    userId,
  });

  if (isPostAlreadyLiked) {
    return res.status(409).json({
      message: "You already liked this post",
    });
  }

  const likedPost = await likeModel.create({
    postId,
    userId,
  });

  return res.status(201).json({
    message: "Post liked",
    post: likedPost.postId,
  });
};

export const getFeed = async (req, res) => {
  const userId = req.user._id;

  const posts = await Promise.all(
 (   await postModel
      .find()
      .populate("userId")
      .select("-password")
      .lean())
      .map(async (post) => {
        const isLiked = await likeModel.findOne({
          postId: post._id,
          userId,
        });
        post.isLiked = !!isLiked;
        return post;
      }),
  );

  // const likedPost = await Promise.all(
  //   posts.map(async (post) => {
  //     const isLiked = await likeModel.findOne({
  //       postId: post._id,
  //       userId,
  //     });
  //     post.isLiked = !!isLiked;
  //     return post;
  //   }),
  // );

  console.log(posts);

  // res.status(200).json({
  //   message: "post fetched successfully",
  //   posts,
  // });
};
