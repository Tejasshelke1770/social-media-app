import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: [true, "image is required to create a post"],
    },
    userId: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user id is required for creating an post"],
    },
  },
  { timestamps: true },
);

const postModel = mongoose.model("posts", postSchema);
export default postModel;
