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
      companyId: process?.company_id || "",
      ownerId: process?.owner_id || "",
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, process?._id))}>
      <div>
        <label>Nome</label>
        <input {...register("name")} className="input" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Descrição</label>
        <input {...register("description")} className="input" />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <div>
        <label>Empresa ID</label>
        <input {...register("companyId")} className="input" />
        {errors.companyId && <p>{errors.companyId.message}</p>}
      </div>
      <div>
        <label>Responsável</label>
        <input {...register("ownerId")} className="input" />
        {errors.ownerId && <p>{errors.ownerId.message}</p>}
      </div>
      <button type="submit" className="btn">
        {process ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default ProcessForm;
