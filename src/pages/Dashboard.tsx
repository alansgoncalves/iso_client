import React from "react";

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ padding: 40 }}>
      <h1>Bem-vindo(a), {user.name}!</h1>
      <p>Você está no painel de controle.</p>
    </div>
  );
};

export default Dashboard;
