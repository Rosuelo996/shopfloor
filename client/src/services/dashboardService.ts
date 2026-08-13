import axios from "axios";
import type { DashboardData, YesterdaySummaryData} from "../types/dashboard";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboard(date?: string): Promise<DashboardData> {
  const url = date
    ? `${API_URL}/dashboard?date=${date}`
    : `${API_URL}/dashboard`;

  const res = await axios.get(url);

  return res.data;
}

export async function getYesterdaySummary(date?: string): Promise<YesterdaySummaryData> {
 const url = date
 ? `${API_URL}/dashboard/yesterday?date=${date}`
 : `${API_URL}/dashboard/yesterday`

 const res = await axios.get(url)

 return res.data
}