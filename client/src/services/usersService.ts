import axios from "axios";
import type { DemoUserData, CurrentUserData } from "../types/users";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDemoUsers(): Promise<DemoUserData[]> {
  const res = await axios.get(`${API_URL}/users/demo`);

  return res.data;
}

export async function getCurrentUser(token: string): Promise<CurrentUserData> {
  const res = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
