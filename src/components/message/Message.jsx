import "./message.css";
import React from "react";

const Message = ({own}) => {
  return (
    <div className={own ? "message-container own" : "message-container"}>
      <div className="message-top">
        <img
          className="message-avatar"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
        />
        <p className="message-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          excepturi cupiditate, molestias eius animi incidunt, maxime ipsum ad
          molestiae veritatis ratione totam magni nam ex ullam, eos voluptate
          quod quasi.
        </p>
      </div>
      <div className="message-bottom">1 hour ago</div>
    </div>
  );
};

export default Message;
