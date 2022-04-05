import "./share.css";
import React, { useContext, useRef, useState } from "react";
import { Avatar, Button, Input } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { CancelOutlined } from "@mui/icons-material";

const Share = ({ setPosts, socket }) => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("/posts", newPost).then(async (response) => {
        const res = await axios.get("/posts/timeline/" + user?._id);
        setPosts(
          res?.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        handleNotifcation("post", user?.followers);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNotifcation = (type, followers) => {
    // user?._id !== receiverId &&
      socket.emit("sendPostNotification", {
        senderName: user?.username,
        followers: followers,
        type,
      });
  };


  return (
    <div className="share-container">
      <div className="share-wrapper">
        <div className="share-top">
          <Avatar
            src={
              PF + user?.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="share-profile-img"
            sx={{ height: '55px', width: '55px' }}
          ></Avatar>
          <textarea placeholder="Create Post" className="share-input" ref={desc} />
          {file && (
            <div className="share-img-container">
              <img
                className="share-img"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <CancelOutlined
                className="share-cancel"
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
        <div className="share-bottom">
          <form className="share-options" onSubmit={submitHandler}>
            <button className="share-btn">
              Post
              {/* <AddCircleOutlineRoundedIcon /> */}
            </button>
            <label htmlFor="file" className="share-img">
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

export default Share;

//fix following to update state and get real time post notificaiton
