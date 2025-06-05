import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      const companyId = localStorage.getItem("companyId");
      const token = localStorage.getItem("token");

      if (!companyId || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/companies/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompany(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Bem-vindo(a), {user.name}!</h1>
      <p>Você está no painel de controle.</p>

      {loading ? (
        <p>Carregando dados da empresa...</p>
      ) : company ? (
        <div style={{ marginTop: 20 }}>
          <h2>Dados da Empresa</h2>
          <p>
            <strong>Nome:</strong> {company.name}
          </p>
          <p>
            <strong>CNPJ:</strong> {company.cnpj}
          </p>
          <p>
            <strong>Data de Cadastro:</strong>{" "}
            {new Date(company.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Nenhuma empresa associada encontrada.</p>
      )}
    </div>
  );
};

export default Dashboard;
