import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleRedirect = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Página não encontrada</p>
      <button
        onClick={handleRedirect}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Voltar para o {token ? "painel" : "login"}
      </button>
    </div>
  );
};

export default NotFound;
