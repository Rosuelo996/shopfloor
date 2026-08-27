import axios from "axios";
import type { ShiftsData, AvailabilityData } from "../types/team";

const API_URL = import.meta.env.VITE_API_URL;

export async function getShifts(date?: string): Promise<ShiftsData[]> {
    const res = await axios.get(`${API_URL}/team/shifts`, {
        params: { date },
    })
    return res.data

}

export async function getAvailability(): Promise <AvailabilityData[]> {
    const res = await axios.get(`${API_URL}/team/availability`)

    return res.data
}