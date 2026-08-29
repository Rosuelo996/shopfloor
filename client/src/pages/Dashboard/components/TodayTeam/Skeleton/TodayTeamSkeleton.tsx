import Skeleton from "../../../../../components/Skeleton/Skeleton";
import styles from "./TodayTeamSkeleton.module.css";

export default function TodayTeamSkeleton() {
  return (
    <section className={styles.card} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.accent} />
          <Skeleton className={styles.sectionTitle} />
        </div>

        <Skeleton className={styles.count} />
      </div>

      <div className={styles.group}>
        <Skeleton className={styles.groupTitle} />

        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className={styles.employee}>
            <div className={styles.employeeInfo}>
              <Skeleton className={styles.avatar} />

              <div className={styles.employeeText}>
                <Skeleton className={styles.name} />
                <Skeleton className={styles.role} />
              </div>
            </div>

            <Skeleton className={styles.time} />
          </div>
        ))}
      </div>

      <div className={styles.group}>
        <Skeleton className={styles.groupTitle} />

        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.employee}>
            <div className={styles.employeeInfo}>
              <Skeleton className={styles.avatar} />

              <div className={styles.employeeText}>
                <Skeleton className={styles.name} />
                <Skeleton className={styles.role} />
              </div>
            </div>

            <Skeleton className={styles.time} />
          </div>
        ))}
      </div>

      <div className={styles.group}>
        <Skeleton className={styles.groupTitle} />

        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className={styles.employee}>
            <div className={styles.employeeInfo}>
              <Skeleton className={styles.avatar} />

              <div className={styles.employeeText}>
                <Skeleton className={styles.name} />
                <Skeleton className={styles.role} />
              </div>
            </div>

            <Skeleton className={styles.time} />
          </div>
        ))}
      </div>

      <Skeleton className={styles.link} />
    </section>
  );
}