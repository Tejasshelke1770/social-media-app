import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
  const { loading, getFeedData, feed } = usePost();

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <main className="main-container">
      <Navbar />
      <div className="feed">
        <div className="posts">
          {feed.length ? (
            feed.map((el, i) => {
              return <Post data={el} key={i} />;
            })
          ) : (
            <h1>Loading..</h1>
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
