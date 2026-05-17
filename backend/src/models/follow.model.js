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
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "Status can be only pending, accepted or rejected",
      },
    },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, followee: 1, status : 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);
export default followModel;
