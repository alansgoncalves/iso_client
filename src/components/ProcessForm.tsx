import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Process } from "../services/processService";

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  description: z.string().min(5, "Descrição obrigatória"),
  companyId: z.string(),
  ownerId: z.string(),
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
    formState: { errors },
  } = useForm<ProcessFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: process?.name || "",
      description: process?.description || "",
      companyId: process?.company_id || "", // ajuste conforme os dados
      ownerId: process?.owner_id || "",
    },
  });

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
      </div>

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
