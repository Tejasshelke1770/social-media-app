import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const exUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (exUser) {
    return res.status(409).json({
      message:
        exUser.email === email
          ? "Email already exist"
          : "Username already exist",
    });
  }

  const hashPass = await bcrypt.hash(password, 16);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hashPass,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  return res.status(201).json({
    message: "User register Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      accountType: user.accountType,
    },
  });
};

export const loginUser = async (req, res) => {
  const { username = "", email = "", password } = req.body;

  const exUser = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!exUser) {
    return res.status(404).json({
      message: "User Does not exist ",
    });
  }
  const isRightPass = await bcrypt.compare(password, exUser.password);

  if (!isRightPass) {
    return res.status(401).json({
      message: "Wrong Passowrd, try again",
    });
  }

  const token = jwt.sign({ id: exUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);

  return res.status(200).json({
    message: "login successful",
    user: {
      username: exUser.username,
      email: exUser.email,
      bio: exUser.bio,
      profileImage: exUser.profileImage,
      accountType: exUser.accountType,
    },
  });
};
