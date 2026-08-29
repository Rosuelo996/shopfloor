import Skeleton from "../../../../../../components/Skeleton/Skeleton";
import styles from "./TeamTodaySkeleton.module.css";

export default function TeamTodaySkeleton() {
  return (
    <section className={styles.teamToday} aria-hidden="true">
      <div className={styles.header}>
        <div>
          <Skeleton className={styles.title} />
          <Skeleton className={styles.subtitle} />
        </div>

        <Skeleton className={styles.viewButton} />
      </div>

      <div className={styles.teamGrid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.member}>
            <Skeleton className={styles.avatar} />

            <div className={styles.details}>
              <Skeleton className={styles.name} />
              <Skeleton className={styles.role} />
              <Skeleton className={styles.shift} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}