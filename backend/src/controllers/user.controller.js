import mongoose from "mongoose";
import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

export const followUser = async (req, res) => {
  const followeeId = req.params.userId; // who is getting followed (next person)
  const followerId = req.user._id; // who is following (i am )

  if (!mongoose.Types.ObjectId.isValid(followeeId)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  const isFolloweeExist = await userModel.findOne({ _id: followeeId });

  if (!isFolloweeExist) {
    return res.status(409).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const exFollow = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (exFollow) {
    return res.status(200).json({
      message: "you are already following this user",
    });
  }

  if (followeeId.toString() === followerId.toString()) {
    return res.status(409).json({
      message: "You cannot follow Yourself",
    });
  }

  const followRec = await followModel.create({
    follower: followerId,
    followee: followeeId,
  });

  res.status(200).json({
    message: `You are started following ${followeeId} id's user`,
    follow: followRec,
  });
};

//isValid followee id
//is followee exist?
// exfollow
//self-follow
// follow

export const unfollowUser = async (req, res) => {
  const followerId = req.user._id;
  const unFollowee = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(unFollowee)) {
    return res.status(400).json({
      message: "Invalid User id",
    });
  }

  const isUserExist = await userModel.findOne({ _id: unFollowee });

  if (!isUserExist) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  const followRec = await followModel.findOne({
    follower: followerId,
    followee: unFollowee,
  });

  if (!followRec) {
    return res.status(200).json({
      message: "You dont follow this user",
    });
  }

  const unfollow = await followModel.findOneAndDelete({
    followee: unFollowee,
    follower: followerId,
  });

  return res.status(200).json({
    message: ` you unfollowed ${unFollowee}`,
  });
};

//is valid unfollow user id
// is user exist
// is follow record exist
// unfollow
