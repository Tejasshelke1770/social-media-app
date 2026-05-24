import { createContext, useState } from "react";
import { getFeed } from "./services/post.api";

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

  return (
    <PostContext.Provider value={{ feed, loading, getFeedData }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
