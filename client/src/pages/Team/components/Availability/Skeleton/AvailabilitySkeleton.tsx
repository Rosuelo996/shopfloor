import Skeleton from "../../../../../components/Skeleton/Skeleton";
import styles from "./AvailabilitySkeleton.module.css";

export default function AvailabilitySkeleton() {
  return (
    <section className={styles.availability} aria-hidden="true">
      <div className={styles.header}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.subtitle} />
      </div>

      <div className={styles.panel}>
        <div className={styles.grid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.member}>
              <div className={styles.memberInfo}>
                <Skeleton className={styles.avatar} />

                <div className={styles.details}>
                  <Skeleton className={styles.name} />
                  <Skeleton className={styles.role} />
                </div>
              </div>

              <div className={styles.days}>
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <Skeleton key={dayIndex} className={styles.day} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.legend}>
          <Skeleton className={styles.legendItem} />
          <Skeleton className={styles.legendItem} />
        </div>
      </div>
    </section>
  );
}