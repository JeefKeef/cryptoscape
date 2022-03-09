import "./postComment.css";

import React, { useContext, useRef, useState, useEffect } from "react";
import { Avatar, Button, Input } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { CancelOutlined } from "@mui/icons-material";

const PostComment = ({ postId, setComments, socket }) => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [receivingUser, setReceivingUser] = useState({});

  useEffect(() => {
    try {
      const getPostUser = async () => {
        const res = await axios.get("/posts/" + postId);
        setReceivingUser(res?.data);
      };
      getPostUser();
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: user._id,
      desc: desc.current.value,
      postId: postId,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newComment.img = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("/comment", newComment).then(async (response) => {
        const res = await axios.get("/comment/" + postId);
        setComments(res?.data);
        handleNotifcation("commented", receivingUser?.userId);
        desc.current.value = "";
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNotifcation = (type, receiverId) => {
    user?._id !== receiverId &&
    socket.emit("sendNotification", {
      senderName: user?.username,
      receiverName: receiverId,
      type,
    });
  };

  return (
    <div className="comment-container">
      <div className="comment-wrapper">
        <div className="comment-top">
          <Avatar
            src={
              user.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="comment-profile-img"
          ></Avatar>
          <input
            placeholder="Reply post"
            className="comment-input"
            ref={desc}
          />
          {file && (
            <div className="comment-img-container">
              <img
                className="comment-img"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <CancelOutlined
                className="comment-cancel"
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
        <div className="comment-bottom">
          <form className="comment-options" onSubmit={submitHandler}>
            <button className="comment-btn">
              <AddCircleOutlineRoundedIcon />
            </button>
            <label htmlFor="file" className="comment-img">
              <AddPhotoAlternateRoundedIcon />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".peg,.jpeg,.jpg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
