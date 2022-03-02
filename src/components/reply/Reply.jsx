import "./reply.css";
import React, { useEffect, useState, useContext } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Reply = ({ reply, socket }) => {
  const [like, setLike] = useState(reply?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(reply?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, reply?.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${reply?.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [reply?.userId]);

  const likedHandler = async () => {
    try {
      await axios.put("/reply/" + reply?._id + "/like", {
        userId: currentUser?._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleNotifcation = (type) => {
    !isLiked &&
      currentUser?._id !== reply?.userId &&
      socket.emit("sendNotification", {
        senderName: currentUser?.username,
        receiverName: reply?.userId,
        type,
      });
  };

  return (
    <div className="reply-container">
      <div className="reply-wrapper">
        <div className="reply-top">
          <div className="reply-avatar-container">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="reply-avatar"
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
            <Typography className="reply-user-name">
              {user?.username}
            </Typography>
          </Link>

          <span className="reply-time">{reply?.createdAt}</span>
        </div>
        <div className="reply-middle">
          <span className="reply-text">{reply?.desc}</span>
          <img className="reply-img" src={PF + reply?.img} alt="" />
        </div>
        <div className="reply-bottom">
          <div className="reply-options">
            <Link
              to={"/reply/" + reply?.commentId + "/reply/" + reply?._id}
              style={{ textDecoration: "none" }}
            >
              <Button className="reply-reply-btn">
                <AddCommentIcon />
                <span className="reply-reply-counter">{reply?.replies?.length !== 0 && reply?.replies?.length}</span>
              </Button>
            </Link>
            <Button
              className="reply-like-btn"
              onClick={() => {
                likedHandler();
                handleNotifcation("liked");
              }}
            >
              <ThumbUpIcon />
              <span className="reply-like-counter">{like !== 0 && like}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
