import "./post.css";
import React, { useEffect, useState, useContext } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import moment from 'moment';

const Post = ({ post, socket }) => {
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post?.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post?.userId}`);
      setUser(res?.data);
    };
    fetchUser();
  }, [post?.userId]);

  const likedHandler = async () => {
    try {
      await axios.put("/posts/" + post?._id + "/like", {
        userId: currentUser?._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleNotifcation = (type) => {
    !isLiked &&
      currentUser?._id !== post?.userId &&
      socket.emit("sendNotification", {
        senderName: currentUser?.username,
        receiverName: post?.userId,
        type,
      });
  };

  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-avatar-container">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="post-avatar"
                loading="lazy"
                src={
                  PF + user?.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
            </Link>
          </div>
          <div className="post-username-time-container">
            <Link
              to={`/profile/${user?.username}`}
              style={{ textDecoration: "none" }}
            >
              <text className="post-user-name">{user?.username}</text>
            </Link>

            <span className="post-time">{moment(post?.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className="post-middle">
          <span className="post-text">{post?.desc}</span>
          <img className="post-img" src={PF + post?.img} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-options">
            <Link to={"/post/" + post?._id} style={{ textDecoration: "none" }}>
              <div className="post-comment-container">
                <button className="post-comment-btn">
                  <AddCommentIcon />
                </button>
                <span className="post-comment-counter">
                  {post?.comments?.length !== 0 && post?.comments?.length}
                </span>
              </div>
            </Link>
            <div className="post-like-container">
              <button
                className="post-like-btn"
                onClick={() => {
                  likedHandler();
                  handleNotifcation("liked");
                }}
              >
                <ThumbUpIcon />
              </button>
              <span className="post-like-counter">{like !== 0 && like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
