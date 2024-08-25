// src/pages/Home.js
import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts"); // Uses the base URL
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-muted">By {post.author}</p>
            <div className="social-links">
              {post.socials.twitter && (
                <a
                  href={post.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              )}
              {post.socials.linkedin && (
                <a
                  href={post.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {post.socials.github && (
                <a
                  href={post.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
