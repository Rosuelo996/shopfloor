import styles from "./Dashboard.module.css";
import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import YesterdaySummary from "./components/YesterdaySummary/YesterdaySummary";
import {
  getDashboard,
  getYesterdaySummary,
  getLatestHandover,
} from "../../services/dashboardService";
import type {
  DashboardData,
  YesterdaySummaryData,
  LatestHandoverData,
} from "../../types/dashboard";
import { useEffect, useState } from "react";
import LatestHandover from "./components/LatestHandover/LatestHandover";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);
  const [handover, setHandover] = useState<LatestHandoverData | null>(null)

  useEffect(() => {
    const loadDashboard = async () => {
      const dashboardData = await getDashboard();
      const yesterdayData = await getYesterdaySummary();
      const handoverData = await getLatestHandover();

      setDashboard(dashboardData);
      setYesterday(yesterdayData);
      setHandover(handoverData)
    };

    loadDashboard();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Header date={dashboard?.date ?? ""} />

      <Metrics dashboard={dashboard} />

      <section className={styles.overview}>
        <LatestHandover handover={handover}/>
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
