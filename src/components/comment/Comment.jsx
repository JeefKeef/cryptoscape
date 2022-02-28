import "./comment.css";

import React, { useEffect, useState, useContext } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Comment = ({comment, socket}) => {

  const [like, setLike] = useState(comment?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(comment?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, comment?.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${comment?.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [comment?.userId]);

  const likedHandler = async () => {
    try {
      await axios.put("/comment/" + comment?._id + "/like", {
        userId: currentUser?._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleNotifcation = (type) => {
    !isLiked && currentUser?._id !== comment?.userId &&
      socket.emit("sendNotification", {
        senderName: currentUser?.username,
        receiverName: comment?.userId,
        type,
      });
  };

  return (
    <div className="comment-container">
      <div className="comment-wrapper">
      <div className="comment-top">
          <div className="comment-avatar-container">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="comment-avatar"
                src={
                  user.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
            </Link>
          </div>
          <Link
            to={`/profile/${user?.username}`}
            style={{ textDecoration: "none" }}
          >
            <Typography className="comment-user-name">{user?.username}</Typography>
          </Link>

          <span className="comment-time">{comment?.createdAt}</span>
        </div>
        <div className="comment-middle">
          <span className="comment-text">{comment?.desc}</span>
          <img className="comment-img" src={PF + comment?.img} alt="" />
        </div>
        <div className="comment-bottom">
          <div className="comment-options">
            <Link to={"/post/" + comment?._id} style={{ textDecoration: "none" }}>
              <Button className="comment-comment-btn">
                <AddCommentIcon />
                <span className="comment-comment-counter">{comment?.length}</span>
              </Button>
            </Link>
            <Button
              className="comment-like-btn"
              onClick={() => {
                likedHandler();
                handleNotifcation("liked");
              }}
            >
              <ThumbUpIcon />
              <span className="comment-like-counter">{like}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment