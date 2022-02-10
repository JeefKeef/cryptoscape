import "./chatbox.css";
import React from "react";

const Chatbox = () => {
  return (
    <div className="chatbox-container">
      <img className="chatbox-avatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
      <span className="chatbox-username">john</span>
    </div>
  );
};

export default Chatbox;
