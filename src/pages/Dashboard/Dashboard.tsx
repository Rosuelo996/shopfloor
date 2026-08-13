import styles from "./Dashboard.module.css";
import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import { getDashboard } from "../../services/dashboardService";
import type { DashboardData } from "../../types/dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await getDashboard();
      setDashboard(data)
    };

    loadDashboard();
  }, [])

  return (
    <div className={styles.dashboard}>
      <Header date={dashboard?.date} />

      <Metrics dashboard={dashboard} />

      <section className={styles.overview}>
        {/* latest handover */}
        {/* today's tasks */}
        {/* yesterday summary */}
      </section>

      <section className={styles.bottomGrid}>
        {/* weekly sales chart */}
        {/* today's team */}
        {/* quick actions */}
      </section>
    </div>
  );
}
