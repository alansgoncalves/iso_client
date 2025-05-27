import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Process } from "../services/processService";

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  description: z.string().min(5, "Descrição obrigatória"),
  companyId: z.string().min(1, "Empresa obrigatória"),
  ownerId: z.string().min(1, "Responsável obrigatório"),
});

type ProcessFormData = z.infer<typeof schema>;

interface ProcessFormProps {
  process?: Process | null;
  onSubmit: (data: ProcessFormData, id?: string) => void;
}

const ProcessForm = ({ process, onSubmit }: ProcessFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProcessFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: process?.name || "",
      description: process?.description || "",
      companyId: process?.company_id || "",
      ownerId: process?.owner_id || "",
    },
  });

  // Preenche companyId e ownerId automaticamente ao montar (se não for edição)
  useEffect(() => {
    if (!process) {
      const companyId = localStorage.getItem("companyId");
      const ownerId = localStorage.getItem("userId"); // ou "ownerId" se preferir

      if (companyId) setValue("companyId", companyId);
      if (ownerId) setValue("ownerId", ownerId);
    }
  }, [process, setValue]);

  const submitHandler = (data: ProcessFormData) => {
    onSubmit(data, process?._id);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block font-medium">Nome do Processo</label>
        <input {...register("name")} className="w-full border p-2 rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Descrição</label>
        <input
          {...register("description")}
          className="w-full border p-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Campos ocultos mas obrigatórios para envio */}
      <input type="hidden" {...register("companyId")} />
      <input type="hidden" {...register("ownerId")} />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {process ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default ProcessForm;
