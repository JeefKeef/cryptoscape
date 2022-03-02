const router = require("express").Router();
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");

//create reply
router.post("/", async (req, res) => {
  try {
    const comment = await Comment.findById(req.body.commentId);
    const newReply = new Reply(req.body);
    const savedReply = await newReply.save();
    await comment.updateOne({ $push: { replies: savedReply._id } });
    res.json(200).json(savedReply);
  } catch (err) {
    res.json(500).json(err);
  }
});

//create reply to reply
router.post("/:replyId", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    const newReply = await Reply(req.body);
    await reply.updateOne({ $push: { replies: newReply._id } });
    const savedReply = await newReply.save();
    res.json(200).json(savedReply);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get reply
router.get("/:replyId/reply", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all reply replies
router.get("/all/:replyId", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    const replies = await Promise.all(
      reply.replies.map((replyId) => {
        return Reply.findById(replyId);
      })
    );
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comment's reply
router.get("/:commentId", async (req, res) => {
  try {
    const reply = await Reply.find({ commentId: req.params.commentId });
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json(err);
  }
});

//like reply
router.put("/:id/like", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply.likes.includes(req.body.userId)) {
      await reply.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The reply has been liked");
    } else {
      await reply.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The reply has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//get comments with posttid
//get replies with commentid
//when user click on reply to comment, redirect to reply page, displaying current reply
//use clicks on post button, system adds new reply id into current reply schema reply array
//get new replies from current reply array with current reply id
//user clicks on reply to reply array, go to reply page
