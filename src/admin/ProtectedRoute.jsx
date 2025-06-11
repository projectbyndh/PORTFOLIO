import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAdminStore from "../Store/AdminStore";
import React from "react";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
}