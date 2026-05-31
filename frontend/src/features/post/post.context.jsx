import { createContext, useState } from "react";
import {
  getFeed,
  createPost,
  likePost,
  disLikePost,
} from "./services/post.api";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFeedData = async () => {
    try {
      setLoading(true);
      const response = await getFeed();
      setFeed(response.data?.posts);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createPostcontext = async (file, caption) => {
    try {
      setLoading(true);
      const response = await createPost(file, caption);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const likePostContext = async (postId) => {
    try {
      const response = await likePost(postId);
      await getFeedData();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const disLikePostContext = async (postId) => {
    try {
      const response = await disLikePost(postId);
      await getFeedData();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{
        feed,
        loading,
        getFeedData,
        createPostcontext,
        likePostContext,
        disLikePostContext,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
