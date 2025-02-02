import { useNavigate } from "@tanstack/react-router";
import { useStudyPlans } from "../../hooks/useStudyPlans";
import { PlanForm } from "./PlanForm";

export const NewPlan = () => {
  const { createPlan } = useStudyPlans();
  const navigate = useNavigate(); // Usar o hook de navegação do seu roteador

  const handleSubmit = async (data: {
    title: string;
    description?: string;
  }) => {
    try {
      await createPlan(data.title, data.description);
      navigate({ to: "/" }); // Redirecionar para a lista após criação
    } catch (error) {
      console.error("Erro ao criar plano:", error);
      // Adicionar tratamento de erro visual se necessário
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Novo Plano de Estudos</h2>
      <PlanForm
        onSubmit={handleSubmit}
        onCancel={() => window.history.back()}
      />
    </div>
  );
};
