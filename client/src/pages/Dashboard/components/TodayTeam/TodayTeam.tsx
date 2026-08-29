import styles from "./TodayTeam.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { DailyShiftsData } from "../../../../types/team";
import { Link } from "react-router-dom";
import TodayTeamSkeleton from "./TodayTeamSkeleton";

type Props = {
  dailyShifts: DailyShiftsData[];
  loading: boolean,
};

export default function TodayTeam({ dailyShifts, loading }: Props) {

  if (loading) {
    return <TodayTeamSkeleton />;
  }

  const scheduledShifts = dailyShifts.filter(
    (shift) => shift.startTime !== null && shift.endTime !== null,
  );

  const management = scheduledShifts.filter((shift) =>
    ["store manager", "assistant manager", "supervisor"].includes(shift.role),
  );

  const sales = scheduledShifts.filter((shift) => shift.role === "sales assistant");

  const stockroom = scheduledShifts.filter((shift) =>
    ["stockroom supervisor", "stockroom assistant"].includes(shift.role),
  );

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Today's Team</h2>
        <span className={styles.count}>{scheduledShifts.length} working</span>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Management</p>
        {management.slice(0, 2).map((shift) => (
          <div key={shift.id} className={styles.employee}>
            <div className={styles.employeeInfo}>
              <div className={styles.avatar}>
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div>
                <p className={styles.name}>
                  {shift.firstName} {shift.lastName.slice(0, 1)}.
                </p>
                <p className={styles.role}>{shift.role}</p>
              </div>
            </div>

            <span className={styles.time}>
              {shift.startTime?.slice(0, 5)} - {shift.endTime?.slice(0, 5)}
            </span>
          </div>
        ))}
        {management.length > 2 && (
          <p className={styles.more}>+ {management.length - 2} more</p>
        )}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Sales Floor</p>

        {sales.slice(0, 3).map((shift) => (
          <div key={shift.id} className={styles.employee}>
            <div className={styles.employeeInfo}>
              <div className={styles.avatar}>
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div>
                <p className={styles.name}>
                  {shift.firstName} {shift.lastName.slice(0, 1)}.
                </p>
                <p className={styles.role}>{shift.role}</p>
              </div>
            </div>

            <span className={styles.time}>
              {shift.startTime?.slice(0, 5)} - {shift.endTime?.slice(0, 5)}
            </span>
          </div>
        ))}

        {sales.length > 3 && (
          <p className={styles.more}>+ {sales.length - 3} more</p>
        )}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Stockroom</p>

        {stockroom.slice(0, 2).map((shift) => (
          <div key={shift.id} className={styles.employee}>
            <div className={styles.employeeInfo}>
              <div className={styles.avatar}>
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div>
                <p className={styles.name}>
                  {shift.firstName} {shift.lastName.slice(0, 1)}.
                </p>
                <p className={styles.role}>{shift.role}</p>
              </div>
            </div>

            <span className={styles.time}>
              {shift.startTime?.slice(0, 5)} - {shift.endTime?.slice(0, 5)}
            </span>
          </div>
        ))}
        {stockroom.length > 1 && (
          <p className={styles.more}>+ {stockroom.length - 1} more</p>
        )}
      </div>

      <Link to="/team" className={`${styles.link} ${styles.notAllowed}`}>
        View today's team <span>→</span>
      </Link>
    </section>
  );
}
