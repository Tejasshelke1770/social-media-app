import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/0etg1a8vc/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp",
  },
  accountType: {
    type: String,
    default: "public",
    enum: {
      values: ["public", "private"],
      message: "Account type can be only public or private",
    },
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
