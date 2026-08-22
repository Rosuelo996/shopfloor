import axios from "axios";
import type { UserData } from "../types/users";


const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers(): Promise<UserData[]> {
    const res = await axios.get(`${API_URL}/users`)

    return res.data
}