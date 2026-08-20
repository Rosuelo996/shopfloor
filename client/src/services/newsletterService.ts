import axios from "axios";
import type { NewsletterData } from "../types/newsletter";

const API_URL = import.meta.env.VITE_API_URL;

export async function getNewsletter(date? : string) : Promise <NewsletterData> {
const res = await axios.get(`${API_URL}/newsletter`, {
    params: { date },
});

return res.data;

}
