import { Fragment } from "react";
import Skeleton from "../../../../../components/Skeleton/Skeleton";
import styles from "./WeeklyScheduleSkeleton.module.css";

export default function WeeklyScheduleSkeleton() {
  return (
    <section className={styles.weeklySchedule} aria-hidden="true">
      <div className={styles.header}>
        <div>
          <Skeleton className={styles.title} />
          <Skeleton className={styles.subtitle} />
        </div>

        <div className={styles.scheduleControls}>
          <div className={styles.legend}>
            <Skeleton className={styles.legendItem} />
            <Skeleton className={styles.legendItem} />
            <Skeleton className={styles.legendItem} />
          </div>

          <Skeleton className={styles.weekSelector} />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.scheduleTable}>
          <div className={`${styles.cell} ${styles.teamHeader}`}>
            <Skeleton className={styles.teamHeaderText} />
          </div>

          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.cell} ${styles.dayHeader}`}
            >
              <Skeleton className={styles.day} />
              <Skeleton className={styles.date} />
            </div>
          ))}

          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <Fragment key={rowIndex}>
              <div className={`${styles.cell} ${styles.employee}`}>
                <Skeleton className={styles.avatar} />

                <div className={styles.employeeDetails}>
                  <Skeleton className={styles.name} />
                  <Skeleton className={styles.role} />
                </div>
              </div>

              {Array.from({ length: 7 }).map((_, columnIndex) => (
                <div key={columnIndex} className={styles.cell}>
                  <Skeleton className={styles.shift} />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}