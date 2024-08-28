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

// Add this to handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hard-coded login details for simplicity (use environment variables or a more secure method in production)
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password';

  if (username === adminUsername && password === adminPassword) {
    // If the username and password match, send a success response
    return res.status(200).json({ message: 'Login successful' });
  } else {
    // If the username or password is incorrect, send an error response
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;