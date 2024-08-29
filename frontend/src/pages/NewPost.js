import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom"; // Update to useNavigate hook

function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    socials: {
      twitter: "",
      linkedin: "",
      github: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("socials.")) {
      const [key] = name.split(".");
      setFormData({
        ...formData,
        socials: { ...formData.socials, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button when the form is submitted

    try {
      await axios.post("/posts", formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false); // Re-enable the button after the submission is complete
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Content</label>
        <textarea
          name="content"
          className="form-control"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          name="author"
          className="form-control"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Twitter (Optional)</label>
        <input
          type="url"
          name="socials.twitter"
          className="form-control"
          value={formData.socials.twitter}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>LinkedIn (Optional)</label>
        <input
          type="url"
          name="socials.linkedin"
          className="form-control"
          value={formData.socials.linkedin}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>GitHub (Optional)</label>
        <input
          type="url"
          name="socials.github"
          className="form-control"
          value={formData.socials.github}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Creating Post..." : "Create Post"}
      </button>
    </form>
  );
}

export default NewPost;