import { StudyPlan } from "../../types";

interface PlanCardProps {
  plan: StudyPlan;
  onEdit: (plan: StudyPlan) => void;
  onDelete: (id: number) => void;
}

export const PlanCard = ({ plan, onEdit, onDelete }: PlanCardProps) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-medium mb-4">{plan.title}</h3>

        <div className="mt-auto">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-blue-600 rounded-full"
              style={{ width: "33%" }}
            />
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-sm text-gray-600">33% Concluído</span>
          </div>
        </div>
      </div>
    </div>
  );
};
