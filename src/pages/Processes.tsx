import { useEffect, useState } from "react";
import {
  Process,
  getProcesses,
  createProcess,
  updateProcess,
  deleteProcess,
} from "../services/processService";
import DashboardLayout from "../layouts/DashboardLayout";
import ProcessForm from "../components/ProcessForm";

type ProcessFormData = {
  name: string;
  description: string;
  companyId: string;
  ownerId: string;
};

const Processes = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [filteredProcesses, setFilteredProcesses] = useState<Process[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editProcess, setEditProcess] = useState<Process | null>(null);

  const role = localStorage.getItem("role");
  const userCompanyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado");
        const data = await getProcesses(token);

        const filtered =
          role === "admin"
            ? data
            : data.filter((p) => p.company_id === userCompanyId);

        setProcesses(filtered);
        setFilteredProcesses(data);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcesses();
  }, []);

  useEffect(() => {
    const filtered = processes.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProcesses(filtered);
  }, [search, processes]);

  const handleFormSubmit = async (data: ProcessFormData, id?: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      const processPayload = {
        name: data.name,
        description: data.description,
        company_id: data.companyId,
        owner_id: data.ownerId,
        responsible: "", // ou preencha com valor real se necessário
      };

      if (id) {
        await updateProcess(id, processPayload, token);
      } else {
        await createProcess(processPayload, token);
      }

      const updated = await getProcesses(token);
      setProcesses(updated);
      setFilteredProcesses(updated);
      setEditProcess(null);
      setIsDialogOpen(false);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Erro ao salvar processo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Deseja realmente excluir este processo?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");

      await deleteProcess(id, token);

      const updated = await getProcesses(token);
      setProcesses(updated);
      setFilteredProcesses(updated);
    } catch (error) {
      console.error("Erro ao excluir processo:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Processos</h2>
        <button
          onClick={() => {
            setEditProcess(null);
            setIsDialogOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Processo
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome"
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
                <th className="p-2 border">Descrição</th>
                <th className="p-2 border">Responsável</th>
                <th className="p-2 border">Empresa</th>
                <th className="p-2 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => (
                <tr key={process._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{process.name}</td>
                  <td className="p-2 border">{process.description}</td>
                  <td className="p-2 border">{process.responsible}</td>
                  <td className="p-2 border">{process.company_id}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => {
                        setEditProcess(process);
                        setIsEditDialogOpen(true);
                      }}
                      className="border px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(process._id)}
                      className="border px-3 py-1 rounded hover:bg-red-100 text-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Novo Processo */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2">Novo Processo</h3>
            <ProcessForm onSubmit={handleFormSubmit} />
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Editar Processo */}
      {isEditDialogOpen && editProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2">Editar Processo</h3>
            <ProcessForm process={editProcess} onSubmit={handleFormSubmit} />
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

export default Processes;
