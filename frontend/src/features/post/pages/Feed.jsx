import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import usePost from "../hooks/usePost";

const Feed = () => {
  const { loading, getFeedData, feed } = usePost();

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <main className="main-container">
      <div className="feed">
        <div className="posts">
          {feed.length ?
            feed.map((el, i) => {
              return <Post data={el} key={i} />;
            }) : "Loading"}
        </div>
      </div>
    </main>
  );
};

export default Feed;
