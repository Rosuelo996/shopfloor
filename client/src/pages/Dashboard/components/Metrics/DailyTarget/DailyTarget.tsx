import type { DashboardData } from "../../../../../types/dashboard";
import styles from "./DailyTarget.module.css";

type Props = {
  dashboard: DashboardData | null;
};

export default function DailyTarget({ dashboard }: Props) {
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
    <div className={styles.dailyTarget}>
      <div className={styles.header}>
        <p>Today's Sales</p>
        <button>Edit Target</button>
      </div>

      <div className={styles.sales}>
        <h2>£{dashboard?.sales}</h2>
        <span>/ £{dashboard?.salesTarget}</span>
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
          <strong className={statusClass}>£{targetRemaining}</strong>
        </div>
      </div>
    </div>
  );
}
