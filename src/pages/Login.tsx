import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password: senha,
        }
      );

      const { token, user } = response.data;

      // Armazena o token e dados do usuário
      localStorage.setItem("token", token);
      // localStorage.setItem("role", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("companyId", user.company_id);

      if (user.role === "admin") {
        navigate("/painel/empresas");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
