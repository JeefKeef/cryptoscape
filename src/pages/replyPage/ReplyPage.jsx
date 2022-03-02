import "./replyPage.css";

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Comment, ReplyComment, Feed, Reply } from "../../components";
import axios from "axios";

const ReplyPage = ({socket}) => {
  const { commentId, replyId } = useParams();
  const [comment, setComment] = useState([]);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        if (replyId) {
          const res = await axios.get("/reply/" + replyId + "/reply");
          setReply(res?.data);
        } else {
          const res = await axios.get("/comment/" + commentId + "/comment");
          setComment(res?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, [commentId, replyId]);

  useEffect(() => {
    const fetchReply = async () => {
      try {
        if (replyId) {
          const res = await axios.get("/reply/all/" + replyId);
          setReplies(res?.data);
        } else {
          const res = await axios.get("/reply/" + commentId);
          setReplies(res?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchReply();
  }, [commentId, replyId, reply?._id]);

  return (
    <div>
      {replyId ? <Reply reply={reply} /> : <Comment comment={comment} />}
      <ReplyComment commentId={commentId} setReplies={setReplies} socket={socket}/>
      <Feed options={{ value: "reply" }} replies={replies} />
    </div>
  );
};

export default ReplyPage;
