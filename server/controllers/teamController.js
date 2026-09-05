import { getAuth } from "@clerk/express";
import { fetchUserByClerkId } from "../services/usersService.js";
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
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await fetchUserByClerkId(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const availability = await fetchTeamAvailability(
      user.role,
      user.employeeId,
    );

    res.json(availability);
  } catch (err) {
    next(err);
  }
}