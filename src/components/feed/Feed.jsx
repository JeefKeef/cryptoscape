import "./feed.css";
import React from "react";
import { Share, Post } from "../";


const Feed = () => {
  return (
    <div className="feed-container">
      Feed
      <div className="feed-wrapper">
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
