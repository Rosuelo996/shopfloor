import axios from "axios";
import type { LatestHandoverData } from "../types/handover";

const API_URL = import.meta.env.VITE_API_URL;

export async function getLatestHandover(
  date?: string,
): Promise<LatestHandoverData> {
  const res = await axios.get(`${API_URL}/handovers/latest`, {
    params: { date },
  });

  return res.data;
}

export async function updateHandoverItemCompleted(
  id: number,
  completed: boolean,
) {
  const res = await axios.patch(`${API_URL}/handovers/follow-ups/${id}`, {
    completed,
  });
  return res.data;
}

export async function updateHandoverAcknowledgement(
  handoverId: number,
  userId: number,
  acknowledged: boolean,
) {
  const res = await axios.patch(`${API_URL}/handovers/${handoverId}/acknowledge`, {
    userId,
    acknowledged,
  })

  return res.data
}