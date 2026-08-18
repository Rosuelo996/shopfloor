import axios from "axios";
import type { TaskData } from "../types/tasks";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTasksByDate(date? : string) : Promise <TaskData[]> {
const res = await axios.get(`${API_URL}/tasks`, {
    params: { date },
});

return res.data;

}


export async function updateTaskStatus(
  id: number,
  status: "pending" | "completed",
) {
  const res = await axios.patch(`${API_URL}/tasks/${id}`, {
    status,
  });
  return res.data;
}
