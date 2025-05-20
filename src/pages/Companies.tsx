import { useEffect, useState } from "react";
import { Company, getCompanies } from "../services/companyService";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCompany, setEditCompany] = useState<Company | null>(null);

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

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Empresas</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setEditCompany(null)}>Nova Empresa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editCompany ? "Editar Empresa" : "Nova Empresa"}
              </DialogTitle>
            </DialogHeader>
            {/* Formulário de empresa virá aqui futuramente */}
            <div className="p-4">Formulário de empresa (a implementar)</div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        type="text"
        placeholder="Buscar por nome ou CNPJ"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-md"
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditCompany(company)}
                        >
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Empresa</DialogTitle>
                        </DialogHeader>
                        {/* Formulário de edição virá aqui */}
                        <div className="p-4">
                          Formulário de edição (a implementar)
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Companies;
