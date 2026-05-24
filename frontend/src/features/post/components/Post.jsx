import React from "react";
import "../styles/feed.scss";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { CiBookmark, CiHospital1 } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";

const Post = ({ data }) => {
  const {
    _id: postId,
    caption,
    imageUrl: postImgUrl,
    userId: userInfo,
    createdAt,
  } = data;
  console.log(userInfo.profileImage);
  return (
    <div className="post">
      <div className="user">
        <div className="img-wrapper">
          <img
            src={userInfo?.profileImage}
          />
        </div>
        <p>{userInfo.username}</p>
      </div>
      <div className="image">
        <img src={postImgUrl} />
      </div>
      <div className="bottom">
        <div className="icons">
          <div className="left">
            <button>
              <FaRegHeart />
            </button>
            <button>
              <FaRegCommentAlt />
            </button>
            <button>
              <IoMdShareAlt />
            </button>
          </div>
          <div className="right">
            <button>
              <CiBookmark />
            </button>
          </div>
        </div>
        <div className="caption">
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
