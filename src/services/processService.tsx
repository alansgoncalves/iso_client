import axios from "axios";

export interface Process {
  _id: string;
  name: string;
  description: string;
  responsible: string;
  company_id: string;
  owner_id: string;
}

// Função para obter todos os processos
export const getProcesses = async (token: string): Promise<Process[]> => {
  const response = await axios.get("http://localhost:8000/api/processes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Funcção para criar um processo
export const createProcess = async (
  data: Omit<Process, "_id">,
  token: string
): Promise<Process> => {
  const response = await axios.post(
    "http://localhost:8000/api/processes",
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Função para atualizar um processo
export const updateProcess = async (
  id: string,
  data: Omit<Process, "_id">,
  token: string
): Promise<Process> => {
  const response = await axios.put(
    `http://localhost:8000/api/processes/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
