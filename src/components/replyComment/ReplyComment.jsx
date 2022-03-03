import "./replyComment.css";
import React, { useContext, useRef, useState, useEffect } from "react";
import { Avatar, Button, Input } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { CancelOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const ReplyComment = ({ commentId, setReplies, socket }) => {
  const { user } = useContext(AuthContext);
  const [receivingUser, setReceivingUser] = useState({});
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { replyId } = useParams();

  useEffect(() => {
    try {
      const getCommentUser = async () => {
        const res = await axios.get("/comment/" + commentId + "/comment");
        setReceivingUser(res?.data);
      };
      getCommentUser();
    } catch (err) {
      console.log(err);
    }
  }, [commentId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newReply = {
      userId: user._id,
      desc: desc.current.value,
      commentId: !replyId && commentId,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newReply.img = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      if (replyId) {
        await axios
          .post("/reply/" + replyId, newReply)
          .then(async (response) => {
            const res = await axios.get("/reply/all/" + replyId);
            setReplies(res?.data);
            handleNotifcation("replied", receivingUser?.userId);
            desc.current.value = "";
          });
      } else {
        await axios.post("/reply", newReply).then(async (response) => {
          const res = await axios.get("/reply/" + commentId);
          setReplies(res?.data);
          handleNotifcation("replied", receivingUser?.userId);
          desc.current.value = "";
        });
      }
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
    <div className="reply-container">
      <div className="reply-wrapper">
        <div className="reply-top">
          <Avatar
            src={
              user.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="reply-profile-img"
          ></Avatar>
          <input
            placeholder="Reply comment"
            className="reply-input"
            ref={desc}
          />
          {file && (
            <div className="reply-img-container">
              <img
                className="reply-img"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <CancelOutlined
                className="reply-cancel"
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
        <div className="reply-bottom">
          <form className="reply-options" onSubmit={submitHandler}>
            <button className="reply-btn">
              <AddCircleOutlineRoundedIcon />
            </button>
            <label htmlFor="file" className="reply-img">
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

export default ReplyComment;
