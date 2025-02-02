// src/components/stats/Stats.tsx
import { useStats } from "../../hooks/useStats";

export const Stats = () => {
  const stats = useStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Estatísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className=" p-6 rounded-lg shadow text-white border border-white">
          <h3 className=" text-sm font-medium">Total de Planos</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalPlans}</p>
        </div>

        <div className=" p-6 rounded-lg shadow text-white border border-white">
          <h3 className=" text-sm font-medium">Tempo Total de Estudo</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalStudyTime}h</p>
        </div>

        <div className=" p-6 rounded-lg shadow text-white border border-white">
          <h3 className=" text-sm font-medium">Progresso Médio</h3>
          <p className="text-3xl font-bold mt-2">{stats.averageProgress}%</p>
        </div>
      </div>
    </div>
  );
};
