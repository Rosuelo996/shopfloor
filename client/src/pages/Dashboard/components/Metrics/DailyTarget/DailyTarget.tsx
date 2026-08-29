import type { DashboardData } from "../../../../../types/dashboard";
import styles from "./DailyTarget.module.css";
import DailyTargetSkeleton from "./DailyTargetSkeleton";

type Props = {
  dashboard: DashboardData | null;
  loading: boolean;
};

export default function DailyTarget({ dashboard, loading}: Props) {

  if (loading) {
    return <DailyTargetSkeleton />;
  }

  const targetRemaining = Math.max(
    (dashboard?.salesTarget ?? 0) - (dashboard?.sales ?? 0),
    0,
  );

  const completion = dashboard?.targetCompletion ?? 0;

  const statusClass =
    completion >= 100
      ? styles.success
      : completion >= 90
        ? styles.warning
        : styles.danger;

  return (
    <section className={styles.dailyTarget}>
      <div className={styles.header}>
        <h2>Today's Sales</h2>
        <button className={styles.notAllowed}>Edit Target</button>
      </div>

      <div className={styles.sales}>
        <h2>£{dashboard?.sales.toLocaleString("en-GB")}</h2>
        <span>/ £{dashboard?.salesTarget.toLocaleString("en-GB")}</span>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${statusClass}`}
            style={{
              width: `${Math.min(dashboard?.targetCompletion ?? 0, 100)}%`,
            }}
          ></div>
        </div>
        <span className={statusClass}>{dashboard?.targetCompletion}%</span>
      </div>

      <div className={styles.details}>
        <div>
          <p>Target Remaining</p>
          <strong className={statusClass}>£{targetRemaining.toLocaleString("en-GB")}</strong>
        </div>
      </div>
    </section>
  );
}
