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
            className={styles.progressFill}
            style={{
              width: `${Math.min(dashboard?.targetCompletion ?? 0, 100)}%`,
            }}
          ></div>
        </div>
        <span>{dashboard?.targetCompletion}%</span>
      </div>

      <div className={styles.details}>
        <div>
          <p>Target Remaining</p>
          <strong>£{targetRemaining}</strong>
        </div>
      </div>
    </div>
  );
}
