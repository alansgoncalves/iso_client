import { useState } from "react";
import { Company } from "../services/companyService";

interface CompanyFormProps {
  company?: Company | null;
  onSubmit: (data: Omit<Company, "_id">, id?: string) => void;
}

const CompanyForm = ({ company, onSubmit }: CompanyFormProps) => {
  const [formData, setFormData] = useState<Omit<Company, "_id">>({
    name: company?.name || "",
    cnpj: company?.cnpj || "",
    address: company?.address || "",
    phone: company?.phone || "",
    email: company?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, company?._id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {["name", "cnpj", "address", "phone", "email"].map((field) => (
        <div key={field}>
          <label className="block capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {company ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default CompanyForm;
