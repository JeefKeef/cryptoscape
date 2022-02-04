import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import { Share, Post, Profileinfo } from "../";
import News from "../News";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ options }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { user: currUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = options.username
        ? await axios.get("/posts/profile/" + options.username)
        : await axios.get("/posts/timeline/" + currUser._id);
      setPosts(res.data);
    };
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${options.username}`);
      setUser(res.data);
    };
    fetchUser();
    fetchPosts();
  }, [options.username]);

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
        <Profileinfo profile={user} />
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
