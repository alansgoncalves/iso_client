import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CompanyList from "./pages/CompanyList";

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
            <CompanyList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
