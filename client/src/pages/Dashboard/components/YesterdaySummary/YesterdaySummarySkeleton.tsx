import Skeleton from "../../../../components/Skeleton/Skeleton";
import styles from "./YesterdaySummarySkeleton.module.css";

export default function YesterdaySummarySkeleton() {
  return (
    <div className={styles.yesterdaySummary} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.accent} />
          <Skeleton className={styles.sectionTitle} />
        </div>

        <Skeleton className={styles.subtitle} />
      </div>

      <div className={styles.rows}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.label}>
              <Skeleton className={styles.icon} />
              <Skeleton className={styles.labelText} />
            </div>

            <div className={styles.result}>
              <Skeleton className={styles.value} />
              <Skeleton className={styles.difference} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}