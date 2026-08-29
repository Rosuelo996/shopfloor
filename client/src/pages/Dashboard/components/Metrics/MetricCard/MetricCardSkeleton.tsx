import Skeleton from "../../../../../components/Skeleton/Skeleton";
import styles from "./MetricCardSkeleton.module.css";

export default function MetricCardSkeleton() {
  return (
    <div className={styles.metricCard} aria-hidden="true">
      <Skeleton className={styles.label} />
      <Skeleton className={styles.value} />
      <Skeleton className={styles.change} />
      <Skeleton className={styles.comparison} />
    </div>
  );
}