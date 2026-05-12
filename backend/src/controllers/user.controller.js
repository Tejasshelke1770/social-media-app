import mongoose from "mongoose";
import followModel from "../models/follow.model.js";

export const followUser = async (req, res) => {
  const followeeId = req.params.userId; // who is getting followed (next person)

  if (!mongoose.Types.ObjectId.isValid(followeeId)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }
  const followerId = req.user._id; // who is following (i am )

  const followRec = await followModel.create({
    follower: followerId,
    followee: followeeId,
  });

  res.status(200).json({
    message : `You are started following ${followRec.followee} id's user`,
    follow : followRec
  })
};

//follow done 
