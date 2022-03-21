import "./friendsbar.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Friendsbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?._id]);

  return (
    <div className="friendsbar-container">
      Friends
      {friends.map((friend) => (
        <Link to={"/profile/" + friend?.username} style={{textDecoration:"none"}}>
          <div className="friendsbar-card">
            <img
              className="friendsbar-avatar"
              src={
                PF + friend?.profilePicture
                  ? PF + friend?.profilePicture
                  : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              }
              alt=""
            />
            <span className="friendsbar-name">{friend?.username}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Friendsbar;
