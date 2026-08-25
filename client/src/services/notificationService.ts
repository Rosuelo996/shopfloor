import axios from "axios";
import type { Notification } from "../types/notification";

const API_URL = import.meta.env.VITE_API_URL;

export async function getNotifications(): Promise<Notification[]> {
  const res = await axios.get(`${API_URL}/notifications`);
  return res.data;
}
