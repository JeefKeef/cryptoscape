import "./messenger.css";
import React from "react";
import { Chatbox, Message, Navbar } from "../../components";

const Messenger = () => {
  return (
    <>
      <Navbar options={{ value: "profile" }} />
      <div className="messenger-container">
        <div className="messenger-menu">
          <div className="messenger-menu-wrapper">
            <input
              className="messenger-searchbar"
              placeholder="Search friends"
            />
            <Chatbox />
            <Chatbox />
            <Chatbox />
            <Chatbox />
          </div>
        </div>
        <div className="messenger-chatbox">
          <div className="messenger-chatbox-wrapper">
            <div className="messenger-chatbox-top">
              <Message />
              <Message own={true}/>
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="messenger-chatbox-bottom">
              <textarea className="messenger-chatbox-input" placeholder="Write something..."></textarea>
              <button className="messenger-chatbox-btn">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
