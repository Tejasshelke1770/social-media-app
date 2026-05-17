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

  const FolloweeAccountType = isFolloweeExist.accountType;

  const exFollow = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (exFollow) {
    if (exFollow.status === "accepted") {
      return res.status(200).json({
        message: "you are already following this user",
      });
    } else if (exFollow.status === "pending") {
      return res.status(400).json({
        message: "Your follow request is pending",
      });
    }
  }

  if (followeeId.toString() === followerId.toString()) {
    return res.status(409).json({
      message: "You cannot follow Yourself",
    });
  }

  if (FolloweeAccountType === "private") {
    const followRec = await followModel.create({
      follower: followerId,
      followee: followeeId,
      status: "pending",
    });

    return res.status(200).json({
      message: `Your follow request sent to ${followeeId} id's user`,
      approval_status: "Pending",
      follow: followRec,
    });
  }

  const followRec = await followModel.create({
    follower: followerId,
    followee: followeeId,
    status: "accepted",
  });

  return res.status(201).json({
    message: `you are started following ${followeeId} id's user`,
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

  //this might be not needed here
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

export const listFollowRequests = async (req, res) => {
  const user = req.user;

  if (user.accountType !== "private") {
    return res.status(403).json({
      message: "This account is public and does not require follow approval",
    });
  }

  const followRequests = await followModel.find({
    followee: user._id,
    status: "pending",
  });

  if (!followRequests.length) {
    return res.status(200).json({
      message: "No Follow requests Pending",
    });
  }

  res.status(200).json({
    message: "successfully fetched request list",
    request: followRequests,
  });
};

export const acceptFollowReqest = async (req, res) => {
  const user = req.user;
  const requestId = req.params.requestId;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({
      message: "Invalid approval request id",
    });
  }

  const followRequest = await followModel.findOne({
    _id: requestId,
    followee: user._id,
    status: "pending",
  });

  if (!followRequest) {
    return res.status(409).json({
      message: "Follow request does not exist",
    });
  }

  const acceptRequest = await followModel.findByIdAndUpdate(
    requestId,
    { status: "accepted" },
    { new: true },
  );

  return res.status(200).json({
    message: `follow request approved of user ${followRequest.follower}`,
    followRecord: {
      followee: acceptRequest.followee,
      follower: acceptRequest.follower,
      status: acceptRequest.status,
    },
  });
};

export const rejectFollowRequest = async (req, res) => {
  const requestId = req.params.requestId;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({
      message: "invalid reject request id",
    });
  }

  const followReqest = await followModel.findOne({
    _id: requestId,
    followee: userId,
    status: "pending",
  });

  if (!followReqest) {
    return res.status(409).json({
      message: "Reject request does not exist",
    });
  }

  const rejectReq = await followModel.findOneAndDelete({ _id: requestId });

  return res.status(200).json({
    message : `follow reqest of user ${followReqest.follower} is rejected`
  })
};
