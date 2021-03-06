import "./profileinfo.css";
import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import EditProfile from "../editProfile/EditProfile";

const Profileinfo = ({ profile, socket }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    user.followings.includes(profile?._id)
  );
  
  const [editProfileModal, setEditProfileModal] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setFollowed(user?.followings.includes(profile?._id));
  }, [user, profile?._id]);

  const handleFollowClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + profile?._id + "/unfollow", {
          userId: user._id,
        });
        dispatch({ type: "UNFOLLOW", payload: profile?._id });
      } else {
        await axios.put("/users/" + profile?._id + "/follow", {
          userId: user._id,
        });
        dispatch({ type: "FOLLOW", payload: profile?._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNotification = (type) => {
    !followed &&
      socket.emit("sendNotification", {
        senderName: user?.username,
        receiverName: profile?._id,
        type,
      });
  };

  const handleEditProfile = () => {
    setEditProfileModal(!editProfileModal);
  };

  return (
    <div className="profile-info-container">
      <div className="profile-info-top">
        <div className="profile-avatar-container">
          <img
            className="profile-avatar"
            src={
              PF + profile?.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
          ></img>
        </div>
        <div className="profile-name-container">
          <div className="profile-name">{profile?.username}</div>
          {user?.username !== profile?.username && (
            <button
              className="profile-follow-btn"
              onClick={() => {
                handleFollowClick();
                handleNotification("followed");
              }}
            >
              {followed ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        {user?.username === profile?.username && (
          <div className="profile-info-update-container">
            <span className="profile-info-update" onClick={handleEditProfile}>
              Edit profile
            </span>
          </div>
        )}
      </div>
      <div className="profile-info-middle">
        <div className="profile-about-text">About</div>
        <div className="profile-bio">{profile?.desc}</div>
      </div>
      <div className="profile-info-bottom">
        <div className="profile-info">
          Following: {profile?.followings?.length}
        </div>
        <div className="profile-info">
          Followers: {profile?.followers?.length}
        </div>
      </div>
      {editProfileModal && (
        <EditProfile setEditProfileModal={setEditProfileModal} />
      )}
    </div>
  );
};

export default Profileinfo;
