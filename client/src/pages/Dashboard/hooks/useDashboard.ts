import { useEffect, useState } from "react";

import {
  getDashboard,
  getYesterdaySummary,
  getWeeklySales,
} from "../../../services/dashboardService";


import { getDailyShifts } from "../../../services/teamService";

import { getNewsletter } from "../../../services/newsletterService";


import type {
  DashboardData,
  YesterdaySummaryData,
  WeeklySalesData,
} from "../../../types/dashboard";

import type { DailyShiftsData } from "../../../types/team";
import type { NewsletterData } from "../../../types/newsletter";

import { useApp } from "../../../hooks/useApp";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);
  const [weeklySales, setWeeklySales] = useState<WeeklySalesData[]>([]);
  const [dailyShifts, setDailyShifts] = useState<DailyShiftsData[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterData | null>(null);

  const { selectedDate } = useApp();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          dashboardData,
          yesterdayData,
          weeklySalesData,
          dailyShiftsData,
          newsletterData,
        ] = await Promise.all([
          getDashboard(selectedDate),
          getYesterdaySummary(selectedDate),

          getWeeklySales(selectedDate),
          getDailyShifts(selectedDate),
          getNewsletter(selectedDate),
        ]);

        setDashboard(dashboardData);
        setYesterday(yesterdayData);
        setWeeklySales(weeklySalesData);
        setDailyShifts(dailyShiftsData);
        setNewsletter(newsletterData);

      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Unable to load dashboard data.");

      } finally {
        setLoading(false);
      }
    };
    loadDashboard(); 
  }, [selectedDate]);


  return {
    dashboard,
    yesterday,
    weeklySales,
    dailyShifts,
    newsletter,
    loading,
    error
  };
}
