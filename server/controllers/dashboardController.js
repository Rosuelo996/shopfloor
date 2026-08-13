import { getDashboardData } from "../services/dashboardService.js";

export async function getDashboard(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const dashboard = await getDashboardData(date);
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
}
