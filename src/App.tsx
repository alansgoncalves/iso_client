import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Companies from "./pages/Companies";
import Processes from "./pages/Processes";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/painel/empresas"
        element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/painel/processos"
        element={
          <ProtectedRoute>
            <Processes />
          </ProtectedRoute>
        }
      />

      {/* Página 404 customizada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
