import "./feed.css";
import React, { useState, useEffect } from "react";
import { Share, Post, Profileinfo } from "../";
import News from "../News";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";

const Feed = ({ options }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = options.username ? await axios.get("/posts/profile/" + options.username)
      : await axios.get("/posts/timeline/61f0374aaa40dfb8a0f4c7e7");
      setPosts(res.data);
      console.log(res.data);
    };
    fetchPosts();
  }, [options]);

  const renderSwitch = (params) => {
    switch (params) {
      case "home":
        return <HomeFeed />;
      case "profile":
        return <ProfileFeed />;
      case "guest":
        return <GuestFeed />;
      default:
        break;
    }
  };

  const ProfileFeed = () => {
    return (
      <>
        <Profileinfo />
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </>
    );
  };

  const HomeFeed = () => {
    return (
      <>
        <Share />
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </>
    );
  };

  const GuestFeed = () => {
    return <News />;
  };

  return (
    <div className="feed-container">
      <div className="feed-wrapper">{renderSwitch(options.value)}</div>
    </div>
  );
};

export default Feed;
