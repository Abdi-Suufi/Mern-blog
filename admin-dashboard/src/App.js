import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [auth, setAuth] = useState(
    localStorage.getItem("adminToken") ? true : false
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route
          path="/"
          element={<PrivateRoute auth={auth} component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;