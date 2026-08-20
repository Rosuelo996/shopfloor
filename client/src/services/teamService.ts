import axios from "axios";
import type { ShiftsData } from "../types/team";

const API_URL = import.meta.env.VITE_API_URL;

export async function getShifts(date?: string): Promise<ShiftsData[]> {
    const res = await axios.get(`${API_URL}/team/shifts`, {
        params: { date },
    })
    return res.data

}