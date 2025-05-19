import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Companies from "./pages/Companies";

const App: React.FC = () => {
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
      {/* Redirecionamento padrão */}
      <Route path="*" element={<Login />} />
      <Route
        path="/painel/empresas"
        element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
