import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "../services/companyService";

const companySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter 14 dígitos")
    .max(18, "CNPJ muito longo"),
  address: z.string().min(1, "Endereço é obrigatório"),
  phone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
});

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyFormProps {
  company?: Company | null;
  onSubmit: (data: CompanyFormData, id?: string) => void;
}

const CompanyForm = ({ company, onSubmit }: CompanyFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        cnpj: company.cnpj,
        address: company.address,
        phone: company.phone,
        email: company.email,
      });
    }
  }, [company, reset]);

  const submitHandler = (data: CompanyFormData) => {
    onSubmit(data, company?._id);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-2">
      {["name", "cnpj", "address", "phone", "email"].map((field) => (
        <div key={field}>
          <label className="block capitalize">{field}</label>
          <input
            type="text"
            {...register(field as keyof CompanyFormData)}
            className="w-full p-2 border rounded"
          />
          {errors[field as keyof CompanyFormData] && (
            <p className="text-red-600 text-sm">
              {errors[field as keyof CompanyFormData]?.message}
            </p>
          )}
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
