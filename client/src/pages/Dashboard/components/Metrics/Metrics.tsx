import DailyTarget from "./DailyTarget/DailyTarget";
import MetricCard from "./MetricCard/MetricCard";
import styles from "./Metrics.module.css";
import type { DashboardData } from "../../../../types/dashboard";

type MetricsProps = {
  dashboard: DashboardData | null;
};

export default function Metrics({dashboard}: MetricsProps) {
  const conversionDifference = dashboard?.conversionDifference ?? 0;
  const apcDifference = dashboard?.apcDifference ?? 0
  const ipcDifference = dashboard?.ipcDifference ?? 0

  return (
    <section className={styles.metrics}>
      <DailyTarget dashboard={dashboard} />

      <MetricCard
        label="Conversion"
        value={`${dashboard?.conversion}%`}
        change={`${conversionDifference > 0 ? "+" : ""}${conversionDifference}%`}
        comparison={`Target ${dashboard?.conversionTarget}%`}
        positive={(conversionDifference ?? 0) >= 0}
      />

      <MetricCard
        label="APC"
        value={`£${dashboard?.apc}`}
        change={`${apcDifference > 0 ? "+" : ""}${apcDifference}%`}
        comparison={`Target ${dashboard?.apcTarget}`}
        positive={apcDifference >= 0}
      />

      <MetricCard
        label="IPC"
        value={`${dashboard?.ipc}`}
        change={`${ipcDifference > 0 ? "+" : ""}${ipcDifference}%`}
        comparison={`Target ${dashboard?.ipcTarget}`}
        positive={ipcDifference >= 0}
      />
    </section>
  );
}