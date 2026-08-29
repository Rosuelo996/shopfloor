import Skeleton from "../../../../../components/Skeleton/Skeleton";
import styles from "./DailyTargetSkeleton.module.css";

export default function DailyTargetSkeleton() {
  return (
    <section className={styles.dailyTarget} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.accent} />
          <Skeleton className={styles.title} />
        </div>

        <Skeleton className={styles.button} />
      </div>

      <Skeleton className={styles.sales} />

      <div className={styles.progress}>
        <Skeleton className={styles.progressBar} />
        <Skeleton className={styles.percentage} />
      </div>

      <div className={styles.details}>
        <Skeleton className={styles.detailLabel} />
        <Skeleton className={styles.detailValue} />
      </div>
    </section>
  );
}