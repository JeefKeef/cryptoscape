import "./profileinfo.css";
import React from "react";
import { Button } from "@material-ui/core";

const Profileinfo = ({profile}) => {
  return (
    <div className="profile-info-container">
      <div className="profile-info-top">
        <div className="profile-avatar-container">
          <img
            className="profile-avatar"
            src={profile.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt=""
          ></img>
        </div>
        <div className="profile-name-container">
          <div className="profile-name">{profile.username}</div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className="profile-info-middle">
        <div className="profile-about-text">About</div>
        <div className="profile-bio">
          {profile?.desc}
        </div>
      </div>
      <div className="profile-info-bottom">
        <div className="profile-info">following: {profile?.followings?.length}</div>
        <div className="profile-info">followers: {profile?.followers?.length}</div>
      </div>
    </div>
  );
};

export default Profileinfo;
