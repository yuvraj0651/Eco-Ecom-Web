import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { authData = [], isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authData?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoutes;
