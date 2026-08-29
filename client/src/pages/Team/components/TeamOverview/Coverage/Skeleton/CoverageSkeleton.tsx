import Skeleton from "../../../../../../components/Skeleton/Skeleton";
import styles from "./CoverageSkeleton.module.css";

export default function CoverageSkeleton() {
  return (
    <section className={styles.coverage} aria-hidden="true">
      <div className={styles.header}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.subtitle} />
      </div>

      <div className={styles.cards}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.card}>
            <Skeleton className={styles.icon} />

            <div className={styles.details}>
              <Skeleton className={styles.label} />
              <Skeleton className={styles.value} />
              <Skeleton className={styles.scheduled} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}