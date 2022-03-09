import "./messenger.css";
import React, { useContext, useState, useRef } from "react";
import {
  Conversation,
  Message,
  Navbar,
  NewConversationModal,
} from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Button } from "@material-ui/core";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Messenger = ({ user, socket }) => {
  //const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineFriend, setOnlineFriend] = useState([]);
  const [newConversationButton, setNewConversationButton] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("getUsers", (users) => {
      setOnlineFriend(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user, socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      handleNotification("messaged");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNotification = (type) => {
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );
    socket.emit("sendNotification", {
      senderName: user.username,
      receiverName: receiverId,
      type,
    });
  };

  const handleNewConversation = (e) => {
    e.preventDefault();
    setNewConversationButton(!newConversationButton);
  };

  return (
    <>
      <Navbar options={{ value: "profile" }} socket={socket} />
      <div className="messenger-container">
        <div className="messenger-menu">
          <div className="messenger-menu-wrapper">
            <div className="messenger-menu-new-conversation-btn-container">
              <div className="messenger-menu-title">Chat</div>
              <span
                className="messenger-menu-add-btn"
                alt="Start new conversation"
                onClick={handleNewConversation}
              >
                <AddCommentIcon />
              </span>
              <span className="messenger-menu-add-btn-hover">
                Start a new conversation
              </span>
            </div>
            {newConversationButton && (
              <NewConversationModal
                setCurrentChat={setCurrentChat}
                setConversations={setConversations}
              />
            )}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={user}
                  onlineUsers={onlineFriend}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="messenger-chatbox">
          <div className="messenger-chatbox-wrapper">
            {currentChat ? (
              <>
                <div className="messenger-chatbox-top">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="messenger-chatbox-bottom">
                  <textarea
                    className="messenger-chatbox-input"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="messenger-chatbox-btn"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="no-conversation-container">
                Open a conversation to start a chat!
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
