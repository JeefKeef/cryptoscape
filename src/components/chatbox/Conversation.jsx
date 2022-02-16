import "./conversation.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser, onlineUsers }) => {
  const [user, setUser] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // useEffect(() => {
  //   setOnlineFriends(onlineUsers.filter((f) => onlineUsers.includes(user._id)));
  // }, [onlineUsers]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="chatbox-container">
      <img
        className="chatbox-avatar"
        src={user?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt=""
      />
      <span className="chatbox-username">{user?.username}</span>
      {onlineUsers.some((f) => f.userId === user?._id) && <span className="chatbox-userstatus">online</span>}
    </div>
  );
};

export default Conversation;
