import styles from "./Coverage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUsers, faBox } from "@fortawesome/free-solid-svg-icons";

import type { DailyShiftsData } from "../../../../../types/team";
import CoverageSkeleton from "./Skeleton/CoverageSkeleton";

type Props = {
  dailyShifts: DailyShiftsData[];
  loading: boolean;
};

export default function Coverage({ dailyShifts, loading }: Props) {
  if (loading) {
    return <CoverageSkeleton />;
  }

  const scheduledShifts = dailyShifts.filter(
    (employee) => employee.startTime !== null && employee.endTime !== null,
  );

  const management = scheduledShifts.filter(
    (employee) =>
      employee.role === "store manager" ||
      employee.role === "assistant manager" ||
      employee.role === "supervisor",
  );

  const sales = scheduledShifts.filter(
    (employee) => employee.role === "sales assistant",
  );

  const stockroom = scheduledShifts.filter((employee) =>
    employee.role.includes("stockroom"),
  );

  return (
    <section className={styles.coverage}>
      <div className={styles.header}>
        <h2>Today's Coverage</h2>
        <p>Your team at a glance</p>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.management}`}>
            <FontAwesomeIcon icon={faUserTie} />
          </div>

          <div className={styles.details}>
            <p>Management</p>
            <h2>{management.length}</h2>
            <span>Scheduled</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.sales}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>

          <div className={styles.details}>
            <p>Sales Floor</p>
            <h2>{sales.length}</h2>
            <span>Scheduled</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.stockroom}`}>
            <FontAwesomeIcon icon={faBox} />
          </div>

          <div className={styles.details}>
            <p>Stockroom</p>
            <h2>{stockroom.length}</h2>
            <span>Scheduled</span>
          </div>
        </div>
      </div>
    </section>
  );
}
