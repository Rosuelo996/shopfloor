import axios from "axios";
import type { DailyShiftsData, WeeklyShiftsData, AvailabilityData } from "../types/team";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDailyShifts(date?: string): Promise<DailyShiftsData[]> {
    const res = await axios.get(`${API_URL}/team/shifts/daily`, {
        params: { date },
    })

    return res.data
}

export async function getWeeklyShifts(date?: string): Promise<WeeklyShiftsData> {
    const res = await axios.get(`${API_URL}/team/shifts/weekly`, {
        params: { date },
    })

    return res.data
}

export async function getAvailability(
  token: string,
): Promise<AvailabilityData[]> {
  const res = await axios.get(`${API_URL}/team/availability`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}