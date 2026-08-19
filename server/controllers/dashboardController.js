import { getDashboardData, getYesterdaySummaryData, getWeeklySalesData } from "../services/dashboardService.js";

export async function getDashboard(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const dashboard = await getDashboardData(date);
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
}

export async function getYesterdaySummary(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const yesterday = await getYesterdaySummaryData(date);

    res.json(yesterday);
  } catch (err) {
    next(err);
  }
}

export async function getWeeklySales(req, res, next) {
  try {
    const date = req.query.date || "2026-08-31";
    const weeklySales = await getWeeklySalesData(date)

    res.json(weeklySales);
  } catch (err) {
    next(err);
  }
}


