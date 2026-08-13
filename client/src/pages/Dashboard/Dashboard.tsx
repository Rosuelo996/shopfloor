import styles from "./Dashboard.module.css";
import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import YesterdaySummary from "./components/YesterdaySummary/YesterdaySummary";
import {
  getDashboard,
  getYesterdaySummary,
} from "../../services/dashboardService";
import type {
  DashboardData,
  YesterdaySummaryData,
} from "../../types/dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const dashboardData = await getDashboard();
      const yesterdayData = await getYesterdaySummary();

      console.log("DASHBOARD:", dashboardData);
      console.log("YESTERDAY:", yesterdayData);
      
      setDashboard(dashboardData);
      setYesterday(yesterdayData);
    };

    loadDashboard();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Header date={dashboard?.date ?? ""} />

      <Metrics dashboard={dashboard} />

      <section className={styles.overview}>
        {/* latest handover */}
        {/* today's tasks */}
        <YesterdaySummary yesterday={yesterday} />
      </section>

      <section className={styles.bottomGrid}>
        {/* weekly sales chart */}
        {/* today's team */}
        {/* quick actions */}
      </section>
    </div>
  );
}
