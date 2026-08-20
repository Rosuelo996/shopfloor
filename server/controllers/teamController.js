import { fetchShifts } from "../services/teamService.js";

export async function getShifts(req, res, next) {
    try{
        const date = req.query.date || "2026-08-31"
        const shifts = await fetchShifts(date)

        res.json(shifts)
    } catch(err) {
        next(err)
    }
}