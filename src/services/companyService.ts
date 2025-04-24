import axios from "axios";

export interface Company {
  _id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
}

export const getCompanies = async (token: string): Promise<Company[]> => {
  const response = await axios.get("http://localhost:8000/api/companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
