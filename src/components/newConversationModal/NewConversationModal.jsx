import "./newConversationModal.css";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { SearchOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

const NewConversationModal = ({ setCurrentChat, setConversations }) => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + user?._id);
      setFriends(res?.data);
    };
    getFriends();
  }, [user?._id]);

  const handleClick = async (receiverName) => {
    try {
      const receiver = friends?.find(
        ({ username }) => username === receiverName
      );
      if (receiver) {
        const newConversation = {
          senderId: user?._id,
          receiverId: receiver?._id,
        };
        await axios
          .post("/conversations", newConversation)
          .then(async (response) => {
            const res = await axios.get("/conversations/" + user?._id);
            setCurrentChat(res?.data);
            setConversations(res?.data);
            setFriend(null);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new-conversation-modal-container">
      <Autocomplete
        id="new-conversation-modal-search"
        options={friends?.map((friend) => friend?.username)}
        value={friend}
        renderOption={(props, option) => (
          <div
            className="new-conversation-modal-options"
            {...props}
            // onClick={() => handleClick(option)}
          >
            <img
              className="new-conversation-modal-img"
              loading="lazy"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
            />
            <text className="new-conversation-model-username">{option}</text>
          </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <div className="new-conversation-modal-search-icon">
                <SearchOutlined />
                Search for friends
              </div>
            }
            inputProps={{
              ...params.inputProps,
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                }
              },
            }}
          />
        )}
        onChange={(friend) => setFriend(friend.target.innerText)}
      />
      <span
        className="new-conversation-modal-btn"
        role="button"
        onClick={() => handleClick(friend)}
      >
        Next
      </span>
    </div>
  );
};

export default NewConversationModal;

//make start conversation b utton to create new conversation
