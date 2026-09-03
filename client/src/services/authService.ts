import axios from "axios";
import type { DemoSignInTokenData } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function createDemoSignInToken() {
  const res = await axios.post<DemoSignInTokenData>(`${API_URL}/auth/demo`);

  return res.data.token;
}
