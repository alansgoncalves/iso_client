import { useEffect, useState } from "react";
import { Company, getCompanies } from "../services/companyService";

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const data = await getCompanies(token);
        setCompanies(data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Empresas</h2>
      <ul className="space-y-4">
        {companies.map((company) => (
          <li key={company._id} className="border p-4 rounded-md shadow-sm">
            <p>
              <strong>Nome:</strong> {company.name}
            </p>
            <p>
              <strong>CNPJ:</strong> {company.cnpj}
            </p>
            <p>
              <strong>Endereço:</strong> {company.address}
            </p>
            <p>
              <strong>Telefone:</strong> {company.phone}
            </p>
            <p>
              <strong>Email:</strong> {company.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
