import "./profileinfo.css";
import React from "react";
import { Button } from "@material-ui/core";

const Profileinfo = () => {
  return (
    <div className="profile-info-container">
      <div className="profile-info-top">
        <div className="profile-avatar-container">
          <img
            className="profile-avatar"
            src="https://vgraphs.com/images/agents/sage-avatar.jpg"
            alt=""
          ></img>
        </div>
        <div className="profile-name-container">
          <div className="profile-name">jeef</div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className="profile-info-middle">
        <div className="profile-about-text">About</div>
        <div className="profile-bio">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          consequuntur doloremque deserunt et. Corrupti iste rem quisquam itaque
          magni similique cupiditate, omnis voluptate maiores, soluta tenetur
          amet sint atque recusandae?
        </div>
      </div>
      <div className="profile-info-bottom">
        <div className="profile-info">following: 31</div>
        <div className="profile-info">followers: 69</div>
      </div>
    </div>
  );
};

export default Profileinfo;
