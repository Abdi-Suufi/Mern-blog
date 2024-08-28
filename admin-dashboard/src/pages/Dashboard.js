import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/posts/${id}`);
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1 className="my-4">Admin Dashboard</h1>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p className="card-text">{post.content}</p>
                <p className="text-muted">By {post.author}</p>
                <div className="social-links mb-3">
                  {post.socials.twitter && (
                    <a
                      href={post.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      Twitter
                    </a>
                  )}
                  {post.socials.linkedin && (
                    <a
                      href={post.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      LinkedIn
                    </a>
                  )}
                  {post.socials.github && (
                    <a
                      href={post.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
