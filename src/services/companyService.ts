import axios from "axios";

export interface Company {
  _id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
}

// Função para obter todas as empresas
export const getCompanies = async (token: string): Promise<Company[]> => {
  const response = await axios.get("http://localhost:8000/api/companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Função para criar uma empresa específica
export const createCompany = async (
  data: Omit<Company, "_id">,
  token: string
): Promise<Company> => {
  const response = await axios.post(
    "http://localhost:8000/api/companies",
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Função para atualizar uma empresa
export const updateCompany = async (
  id: string,
  data: Omit<Company, "_id">,
  token: string
): Promise<Company> => {
  const response = await axios.put(
    `http://localhost:8000/api/companies/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
