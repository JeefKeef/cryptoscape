const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated successfully");
    } else {
      res.status(403).json("You can only update your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Deleted post successfully");
    } else {
      res.status(403).json("You can only delete your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json("Get post successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId); //gets current user signed in
    const userPosts = await Post.find({ userId: currentUser._id });//gets current user posts
    //gets current user friends posts
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => { //maps current user friends id and find all post with friends id
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts)); //returns current users post and all friends post concat
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username : req.params.username});
    const posts = await Post.find({userId:user._id});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
