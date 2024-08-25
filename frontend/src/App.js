import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styling is included

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;