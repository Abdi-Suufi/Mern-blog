const express = require("express");
const { getPosts, createPost } = require("../controllers/blogController");
const Post = require("../models/BlogPost");
const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", createPost);

// DELETE post by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;