import React from "react";
import { Navigate } from "react-router-dom";

interface PotectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user"; // Se não for passado, qualquer usuário pode acessar
}

const ProtectedRoute: React.FC<PotectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
