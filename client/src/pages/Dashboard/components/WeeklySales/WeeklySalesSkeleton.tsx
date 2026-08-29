import Skeleton from "../../../../components/Skeleton/Skeleton";
import styles from "./WeeklySalesSkeleton.module.css";

export default function WeeklySalesSkeleton() {
  return (
    <section className={styles.weeklySales} aria-hidden="true">
      <div className={styles.header}>
        <div>
          <div className={styles.titleGroup}>
            <span className={styles.accent} />
            <Skeleton className={styles.sectionTitle} />
          </div>

          <Skeleton className={styles.subtitle} />
        </div>

        <div className={styles.headerRight}>
          <div className={styles.legend}>
            <Skeleton className={styles.legendItem} />
            <Skeleton className={styles.legendItem} />
          </div>

          <Skeleton className={styles.viewAll} />
        </div>
      </div>

      <Skeleton className={styles.chart} />
    </section>
  );
}