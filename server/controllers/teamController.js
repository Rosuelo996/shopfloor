import { fetchDailyShifts, fetchWeeklyShifts, fetchTeamAvailability } from "../services/teamService.js";

export async function getDailyShifts(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const shifts = await fetchDailyShifts(date);

    res.json(shifts);
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyShifts(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const shifts = await fetchWeeklyShifts(date);

    res.json(shifts);
  } catch (err) {
    next(err);
  }
}

export async function getTeamAvailability(req, res, next) {
  try {
    const availability = await fetchTeamAvailability();

    res.json(availability);
  } catch (err) {
    next(err);
  }
}
