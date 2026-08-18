import { getDashboardData, getYesterdaySummary } from "../services/dashboardService.js";

export async function getDashboard(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const dashboard = await getDashboardData(date);
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
}

export async function getYesterday(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const yesterday = await getYesterdaySummary(date);

    res.json(yesterday);
  } catch (err) {
    next(err);
  }
}


