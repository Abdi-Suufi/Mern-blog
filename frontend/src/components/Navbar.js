import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styling is included

function Navbar({ isAuthenticated, isAdmin, userName, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout operation
    onLogout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "rgba(213, 51, 67, 0.8)" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="../assets/images/logo.png" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-panel">
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/new">
                    Create Post
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {userName}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/settings">
                      Settings
                    </Link>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
