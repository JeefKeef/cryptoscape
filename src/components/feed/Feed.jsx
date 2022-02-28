import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import { Share, Post, Profileinfo, Comment } from "../";
import News from "../News";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ options, socket, comments }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { user: currUser } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res =
        options.value !== "home"
          ? await axios.get("/posts/profile/" + options.username)
          : await axios.get("/posts/timeline/" + currUser._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [options, currUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${options.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [options.username]);

  const renderSwitch = (params) => {
    switch (params) {
      case "home":
        return <HomeFeed />;
      case "profile":
        return <ProfileFeed />;
      case "guest":
        return <GuestFeed />;
      case "comment":
        return <CommentFeed />;
      default:
        break;
    }
  };

  const CommentFeed = () => {
    return (
      <>
        {comments?.map((comment) => (
          <Comment key={comment?._id} comment={comment} socket={socket}/>
        ))}
      </>
    );
  };

  const ProfileFeed = () => {
    return (
      <>
        <Profileinfo profile={user} socket={socket} />
        {posts?.map((post) => (
          <Post key={post._id} post={post} socket={socket} />
        ))}
      </>
    );
  };

  const HomeFeed = () => {
    return (
      <>
        <Share />
        {posts?.map((post) => (
          <Post key={post._id} post={post} socket={socket} />
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
