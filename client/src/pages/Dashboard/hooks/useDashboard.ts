import { useEffect, useState } from "react";

import {
  getDashboard,
  getYesterdaySummary,
  getWeeklySales,
} from "../../../services/dashboardService";


import { getShifts } from "../../../services/teamService";

import { getNewsletter } from "../../../services/newsletterService";

import { getNotifications } from "../../../services/notificationService";

import type {
  DashboardData,
  YesterdaySummaryData,
  WeeklySalesData,
} from "../../../types/dashboard";

import type { ShiftsData } from "../../../types/team";
import type { NewsletterData } from "../../../types/newsletter";

import { useApp } from "../../../hooks/useApp";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);
  const [weeklySales, setWeeklySales] = useState<WeeklySalesData[]>([]);
  const [shifts, setShifts] = useState<ShiftsData[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterData | null>(null);

  const { selectedDate, setNotifications } = useApp();

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
          shiftsData,
          newsletterData,
          notificationData,
        ] = await Promise.all([
          getDashboard(selectedDate),
          getYesterdaySummary(selectedDate),

          getWeeklySales(selectedDate),
          getShifts(selectedDate),
          getNewsletter(selectedDate),
          getNotifications(),
        ]);

        setDashboard(dashboardData);
        setYesterday(yesterdayData);
        setWeeklySales(weeklySalesData);
        setShifts(shiftsData);
        setNewsletter(newsletterData);
        setNotifications(notificationData);

      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Unable to load dashboard data.");

      } finally {
        setLoading(false);
      }
    };
    loadDashboard(); 
  }, [selectedDate, setNotifications]);


  return {
    dashboard,
    yesterday,
    weeklySales,
    shifts,
    newsletter,
    loading,
    error
  };
}
