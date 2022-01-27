import "./share.css";
import React from "react";
import { Avatar, Button, Input } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

const Share = () => {
  return (
    <div className="share-container">
      <div className="share-wrapper">
        <div className="share-top">
          <Avatar className="share-profile-img">J</Avatar>
          <Input placeholder="Create Post" className="share-input" />
        </div>
        <div className="share-bottom">
          <div className="share-options">
            <Button className="share-btn"><AddCircleOutlineRoundedIcon/></Button>
            <Button className="share-img"><AddPhotoAlternateRoundedIcon/></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
