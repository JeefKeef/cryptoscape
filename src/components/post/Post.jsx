import "./post.css";
import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [like, setLike] = useState(3);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likedHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-avatar-container">
            <Link to={`profile/${user.username}`}>
              <img
                className="post-avatar"
                src={
                  user.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
            </Link>
          </div>
          <Link to={`profile/${user.username}`}>
            <Typography className="post-user-name">{user.username}</Typography>
          </Link>

          <span className="post-time">{post.createdAt}</span>
        </div>
        <div className="post-middle">
          <span className="post-text">{post?.desc}</span>
          <img className="post-img" src={post?.img} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-options">
            <Button className="post-comment-btn">
              <AddCommentIcon />
              <span className="post-comment-counter">{post.comment}</span>
            </Button>
            <Button className="post-like-btn" onClick={likedHandler}>
              <ThumbUpIcon />
              <span className="post-like-counter">{like}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
