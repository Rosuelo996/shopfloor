import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboard(date?: string) {
  const url = date
    ? `${API_URL}/dashboard?date=${date}`
    : `${API_URL}/dashboard`;

  const res = await axios.get(url);

  return res.data;
}