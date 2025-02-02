import React from "react";
import { useStudyPlans } from "../../hooks/useStudyPlans";
import { PlanCard } from "./PlanCard";
import { Header } from "../layout/Header";

export const PlanList = () => {
  const { plans, loading, error, updatePlan, deletePlan } = useStudyPlans();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-cyan-600">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={(plan) => {
                // Implementar edição
              }}
              onDelete={(id) => {
                // Implementar deleção
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
