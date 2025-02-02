import { useState, useEffect } from 'react';

interface Stats {
  totalPlans: number;
  totalStudyTime: number;
  averageProgress: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalPlans: 0,
    totalStudyTime: 0,
    averageProgress: 0,
  });

  useEffect(() => {
    //lógica para buscar as estatísticas do banco
    const fetchStats = async () => {
      // TODO: Implementar busca de estatísticas
    };

    fetchStats();
  }, []);

  return stats;
};