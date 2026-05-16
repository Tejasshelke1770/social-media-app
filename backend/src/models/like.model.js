import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "postId is required to like a post"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "userId is required to like a post"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);
export default likeModel;
