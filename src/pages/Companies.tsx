import { useEffect, useState } from "react";
import {
  Company,
  getCompanies,
  createCompany,
  updateCompany,
} from "../services/companyService";
import DashboardLayout from "../layouts/DashboardLayout";
import CompanyForm from "../components/CompanyForm";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");

        const data = await getCompanies(token);
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const filtered = companies.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.cnpj.includes(search)
    );
    setFilteredCompanies(filtered);
  }, [search, companies]);

  const handleFormSubmit = async (data: Omit<Company, "_id">, id?: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      if (id) {
        await updateCompany(id, data, token);
      } else {
        await createCompany(data, token);
      }

      const updated = await getCompanies(token);
      setCompanies(updated);
      setFilteredCompanies(updated);
      setEditCompany(null);
      setIsDialogOpen(false);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Empresas</h2>

        <button
          onClick={() => {
            setEditCompany(null);
            setIsDialogOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nova Empresa
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome ou CNPJ"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-md p-2 border rounded w-full"
      />

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
                <th className="p-2 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{company.name}</td>
                  <td className="p-2 border">{company.cnpj}</td>
                  <td className="p-2 border">{company.address}</td>
                  <td className="p-2 border">{company.phone}</td>
                  <td className="p-2 border">{company.email}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => {
                        setEditCompany(company);
                        setIsEditDialogOpen(true);
                      }}
                      className="border px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para criar nova empresa */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Nova Empresa</h3>
              <p className="text-gray-600">
                Preencha os dados para cadastrar uma nova empresa.
              </p>
            </div>
            <CompanyForm onSubmit={handleFormSubmit} />
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para editar dados da empresa */}
      {isEditDialogOpen && editCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Editar Empresa</h3>
              <p className="text-gray-600">
                Atualize os dados da empresa e salve as alterações.
              </p>
            </div>
            <CompanyForm
              company={editCompany}
              onSubmit={(data, id) => {
                handleFormSubmit(data, id);
              }}
            />
            <button
              onClick={() => setIsEditDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Companies;
