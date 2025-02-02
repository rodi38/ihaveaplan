import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { StudyPlan } from "../types";

export const useStudyPlans = () => {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const result = await invoke<StudyPlan[]>("get_study_plans");
      setPlans(result);
      setError(null);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (title: string, description?: string) => {
    try {
      const newPlan = await invoke<StudyPlan>("create_study_plan", {
        title,
        description,
      });
      setPlans((prev) => [newPlan, ...prev]);
      return newPlan;
    } catch (err) {
      setError(err as string);
      throw err;
    }
  };

  const updatePlan = async (
    id: number,
    title: string,
    description?: string
  ) => {
    try {
      const updatedPlan = await invoke<StudyPlan>("update_study_plan", {
        id,
        title,
        description,
      });
      setPlans((prev) =>
        prev.map((plan) => (plan.id === id ? updatedPlan : plan))
      );
      return updatedPlan;
    } catch (err) {
      setError(err as string);
      throw err;
    }
  };

  const deletePlan = async (id: number) => {
    try {
      await invoke("delete_study_plan", { id });
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    } catch (err) {
      setError(err as string);
      throw err;
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    createPlan,
    updatePlan,
    deletePlan,
    refreshPlans: fetchPlans,
  };
};
