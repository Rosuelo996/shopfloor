import { useState } from "react";
import styles from "./TeamToday.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { DailyShiftsData } from "../../../../../types/team";

type Props = {
  dailyShifts: DailyShiftsData[];
};

export default function TeamToday({ dailyShifts }: Props) {
  const [showAll, setShowAll] = useState(false);

  const scheduledShifts = dailyShifts.filter(
    (employee) => employee.startTime !== null && employee.endTime !== null,
  );

  const notScheduledShifts = dailyShifts.filter(
    (employee) => employee.startTime === null || employee.endTime === null,
  );

  return (
    <section className={styles.teamToday}>
      <div className={styles.header}>
        <div>
          <h2>Team Today</h2>
          <p>Who's scheduled for the selected day</p>
        </div>

        <button
          type="button"
          className={styles.viewButton}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show scheduled only" : "View all team"}

          <FontAwesomeIcon
            icon={faChevronDown}
            className={`${styles.chevron} ${showAll ? styles.chevronOpen : ""}`}
          />
        </button>
      </div>

      <div className={styles.teamGrid}>
        {scheduledShifts.map((employee) => (
          <div key={employee.id} className={styles.member}>
            <div className={styles.avatar}>
              <span>
                {employee.firstName[0]}
                {employee.lastName[0]}
              </span>
            </div>

            <div className={styles.details}>
              <h3>
                {employee.firstName} {employee.lastName}
              </h3>
              <p>{employee.role}</p>
              <span className={styles.shift}>
                {employee.startTime?.slice(0, 5)} –{" "}
                {employee.endTime?.slice(0, 5)}
              </span>
            </div>
          </div>
        ))}

        {showAll &&
          notScheduledShifts.map((employee) => (
            <div key={employee.id} className={styles.member}>
              <div className={`${styles.avatar} ${styles.notScheduledAvatar}`}>
                <span>
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </span>
              </div>

              <div className={styles.details}>
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
                <p>{employee.role}</p>
                <span className={styles.notScheduled}>Not scheduled</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
