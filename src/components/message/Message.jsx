import "./message.css";
import React from "react";

const Message = ({own, message}) => {
  return (
    <div className={own ? "message-container own" : "message-container"}>
      <div className="message-top">
        <img
          className="message-avatar"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
        />
        <p className="message-text">
          {message.text}
        </p>
      </div>
      <div className="message-bottom">{message?.createdAt}</div>
    </div>
  );
};

export default Message;
