const router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

//create comment
router.post("/", async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    await post.updateOne({ $push: { comments: req.body.userId } });
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comment
router.get("/:commendId/comment", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commendId);
    res.status(200).json(comment);
  } catch(err) {
    res.status(500).json(err);
  }
});

//get post's comments
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//like comment
router.put("/:id/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
