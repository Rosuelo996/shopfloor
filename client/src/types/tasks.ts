export type TaskData = {
  id: number;
  taskTemplateId: number;
  taskDate: string;
  title: string;
  startTime: string;
  expectedDurationMinutes: number;
  status: "pending" | "completed";
  completedAt: string | null;
};