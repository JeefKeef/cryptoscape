import "./post.css";
import React from "react";
import { Avatar, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Post = () => {
  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-avatar">
            <Avatar>J</Avatar>
          </div>
          <Typography className="post-user-name">Testing Testing</Typography>
          <span className="post-time">3 min ago</span>
        </div>
        <div className="post-middle">
          <span className="post-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            alias sint iste accusamus eaque. Fuga, voluptatem excepturi!
            Reiciendis, aliquid. Suscipit eius assumenda, architecto amet in ut
            possimus neque aliquam veritatis.
          </span>
          <img
            className="post-img"
            src="https://images.unsplash.com/photo-1609726494499-27d3e942456c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJpdGNvaW58ZW58MHx8MHx8&w=1000&q=80"
            alt=""
          />
        </div>
        <div className="post-bottom">
          <div className="post-options">
            <Button className="post-comment-btn">
              <AddCommentIcon/>
              <span className="post-comment-counter">9</span>
            </Button>
            <Button className="post-like-btn">
              <ThumbUpIcon />
              <span className="post-like-counter">31</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
