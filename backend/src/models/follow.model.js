import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {               // who is following
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "follower is required!"],
    },
    followee: {              // whom gets follower
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "followee is required!"],
    },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);
export default followModel;
