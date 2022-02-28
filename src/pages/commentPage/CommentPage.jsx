import "./commentPage.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { Navbar, Feed, Sidebar, Post, PostComment } from "../../components";
import axios from "axios";

const CommentPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("/posts/" + postId);
        setPost(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get("/comment/" + postId);
        setComments(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, [postId]);

  return (
    <div>
      <Post post={post} />
      <PostComment postId={postId} />
      <Feed options={{ value: "comment" }} comments={comments} />
    </div>
  );
};

export default CommentPage;

//try out comment rendering without page refresh without feed
//new component?
