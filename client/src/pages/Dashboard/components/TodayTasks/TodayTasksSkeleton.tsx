import Skeleton from "../../../../components/Skeleton/Skeleton";
import styles from "./TodayTasksSkeleton.module.css";

export default function TodayTasksSkeleton() {
  return (
    <section className={styles.tasks} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.accent} />
          <Skeleton className={styles.sectionTitle} />
        </div>

        <Skeleton className={styles.openCount} />
      </div>

      <div className={styles.taskList}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={styles.task}>
            <Skeleton className={styles.checkbox} />
            <Skeleton
              className={
                index === 4 ? styles.taskTitleLong : styles.taskTitle
              }
            />
            <Skeleton className={styles.time} />
          </div>
        ))}
      </div>

      <Skeleton className={styles.viewAll} />
    </section>
  );
}