import Skeleton from "../../../../../components/Skeleton/Skeleton";
import styles from "./LatestHandoverSkeleton.module.css";

export default function LatestHandoverSkeleton() {
  return (
    <div className={styles.latestHandover} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.accent} />
          <Skeleton className={styles.title} />
        </div>

        <Skeleton className={styles.priority} />
      </div>

      <div className={styles.content}>
        <div className={styles.items}>
          <div className={styles.item}>
            <Skeleton className={styles.alert} />

            <div className={styles.itemContent}>
              <Skeleton className={styles.itemLineLong} />
              <Skeleton className={styles.itemLineShort} />
            </div>
          </div>

          <div className={styles.item}>
            <Skeleton className={styles.alert} />

            <div className={styles.itemContent}>
              <Skeleton className={styles.itemLineMedium} />
              <Skeleton className={styles.itemLineLong} />
            </div>
          </div>

          <div className={styles.item}>
            <Skeleton className={styles.alert} />

            <div className={styles.itemContent}>
              <Skeleton className={styles.itemLineLong} />
              <Skeleton className={styles.itemLineMedium} />
            </div>
          </div>
        </div>

        <div className={styles.meta}>
          <Skeleton className={styles.avatar} />

          <div className={styles.author}>
            <Skeleton className={styles.authorName} />
            <Skeleton className={styles.authorTime} />
          </div>
        </div>

        <Skeleton className={styles.acknowledge} />
      </div>

      <Skeleton className={styles.viewAll} />
    </div>
  );
}