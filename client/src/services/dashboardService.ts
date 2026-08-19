import axios from "axios";
import type {
  DashboardData,
  YesterdaySummaryData,
  WeeklySalesData,
} from "../types/dashboard";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboard(date?: string): Promise<DashboardData> {
  const res = await axios.get(`${API_URL}/dashboard`, {
    params: { date },
  });

  return res.data;
}

export async function getYesterdaySummary(
  date?: string,
): Promise<YesterdaySummaryData> {
  const res = await axios.get(`${API_URL}/dashboard/yesterday`, {
    params: { date },
  });

  return res.data;
}

export async function getWeeklySales (
  date?: string,
): Promise<WeeklySalesData[]> {
  const res = await axios.get(`${API_URL}/dashboard/weekly-sales`, {
    params: { date },
  })

  return res.data
}



