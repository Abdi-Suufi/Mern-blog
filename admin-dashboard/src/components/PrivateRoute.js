import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth }) => {
  return auth ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;