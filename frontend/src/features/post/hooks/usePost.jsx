import { useContext } from "react";
import { PostContext } from "../post.context.jsx";

const usePost = () => {
  const feed = useContext(PostContext);
  return feed;
};

export default usePost;
