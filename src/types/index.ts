export interface StudyPlan {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  progress: number;
  total_study_time: number;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface StudySession {
  id: number;
  plan_id: number;
  subject_id: number | null;
  section_id: number | null;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
}

export interface ProgressTracking {
  id: number;
  status: "not_started" | "in_progress" | "completed";
  completion_percentage: number;
  last_studied_at: string | null;
}
