import "./newConversationModal.css";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { SearchOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";


const NewConversationModal = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + user?._id);
      setFriends(res?.data);
    };
    getFriends();
  }, [user?._id]);

  const handleClick = (props) => {
      console.log(props.key);
      //get user id and create ne conversation and redirect to chatbox
      
  } 

  return (
    <div className="new-conversation-modal-container">
      <Autocomplete
        id="new-conversation-modal-search"
        options={friends?.map((friend) => friend?.username)}
        renderOption={(props, option) => (
            <div className="new-conversation-modal-options" {...props} onClick={() => handleClick(props)}>
              <img
                className="new-conversation-modal-img"
                loading="lazy"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
              />
              <text className="new-conversation-model-username"> {option}</text>
            </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <div className="new-conversation-modal-search-icon">
                <SearchOutlined />
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
        // onChange={(coin) => console.log(coin.target.innerText)}
        //   onChange={(coin) => setSearchTerm(coin.target.innerText)}
      />
    </div>
  );
};

export default NewConversationModal;

//get autocomplete of list of friends
//click friend to select
//click next to go to conversation chatbox
//get list of friends
