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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Empresas</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-2 border">Nome</th>
                <th className="p-2 border">CNPJ</th>
                <th className="p-2 border">Endereço</th>
                <th className="p-2 border">Telefone</th>
                <th className="p-2 border">E-mail</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{company.name}</td>
                  <td className="p-2 border">{company.cnpj}</td>
                  <td className="p-2 border">{company.address}</td>
                  <td className="p-2 border">{company.phone}</td>
                  <td className="p-2 border">{company.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
