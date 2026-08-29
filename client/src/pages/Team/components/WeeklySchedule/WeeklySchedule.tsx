import styles from "./WeeklySchedule.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { Fragment } from "react";

import { useApp } from "../../../../hooks/useApp";

import type { WeeklyShiftsData } from "../../../../types/team";
import WeeklyScheduleSkeleton from "./Skeleton/WeeklyScheduleSkeleton";

type Props = {
  weeklyShifts: WeeklyShiftsData;
  loading: boolean;
};

export default function WeeklySchedule({ weeklyShifts, loading }: Props) {
  const { setSelectedDate } = useApp();

  if (loading) {
    return <WeeklyScheduleSkeleton />;
  }

  const weekStart = formatDate(new Date(weeklyShifts.weekStart), {
    day: "numeric",
    month: "short",
  });

  const weekEnd = formatDate(new Date(weeklyShifts.weekEnd), {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const weekDays = weeklyShifts.weekDays;

  return (
    <section className={styles.weeklySchedule}>
      <div className={styles.header}>
        <div>
          <h2>Weekly Schedule</h2>
          <p>Team shifts for the selected week</p>
        </div>

        <div className={styles.scheduleControls}>
          <div className={styles.legend}>
            <span>
              <i className={styles.managementDot}></i>
              Management
            </span>

            <span>
              <i className={styles.salesDot}></i>
              Sales Floor
            </span>

            <span>
              <i className={styles.stockroomDot}></i>
              Stockroom
            </span>
          </div>

          <div className={styles.weekSelector}>
            <button
              type="button"
              aria-label="Previous week"
              onClick={() => setSelectedDate(weeklyShifts.previousWeek)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <span>
              {weekStart} – {weekEnd}
            </span>

            <button
              type="button"
              aria-label="Next week"
              onClick={() => setSelectedDate(weeklyShifts.nextWeek)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {weeklyShifts.team.length === 0 ? (
          <div className={styles.emptySchedule}>
            <p>No schedule available for this week</p>
            <span>Use the arrows above to view another week.</span>
          </div>
        ) : (
          <div className={styles.scheduleTable}>
            <div className={`${styles.cell} ${styles.teamHeader}`}>Team</div>

            {weekDays.map((day, index) => (
              <div key={index} className={`${styles.cell} ${styles.dayHeader}`}>
                <span>{formatDate(new Date(day), { weekday: "short" })}</span>
                <strong>
                  {formatDate(new Date(day), {
                    day: "numeric",
                    month: "short",
                  })}
                </strong>
              </div>
            ))}

            {weeklyShifts.team.map((employee) => {
              const shiftType = getShiftType(employee.role);

              const avatarClass =
                shiftType === "management"
                  ? styles.managementAvatar
                  : shiftType === "sales"
                    ? styles.salesAvatar
                    : styles.stockroomAvatar;

              return (
                <Fragment key={employee.id}>
                  <div className={`${styles.cell} ${styles.employee}`}>
                    <div className={`${styles.avatar} ${avatarClass}`}>
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </div>

                    <div>
                      <h3>
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p>{employee.role}</p>
                    </div>
                  </div>

                  {weekDays.map((day, index) => {
                    const shift = employee.shifts.find(
                      (shift) => shift.date === day,
                    );

                    return (
                      <Fragment key={index}>
                        {shift ? (
                          <Shift type={shiftType}>
                            {formatTime(shift.startTime)} –{" "}
                            {formatTime(shift.endTime)}
                          </Shift>
                        ) : (
                          <Off />
                        )}
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString("en-GB", {
    ...options,
    timeZone: "Europe/London",
  });
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

function getShiftType(role: string): "management" | "sales" | "stockroom" {
  if (role === "sales assistant") return "sales";
  if (role.includes("stockroom")) return "stockroom";

  return "management";
}

type ShiftProps = {
  type: "management" | "sales" | "stockroom";
  children: React.ReactNode;
};

function Shift({ type, children }: ShiftProps) {
  const shiftClass =
    type === "management"
      ? styles.managementShift
      : type === "sales"
        ? styles.salesShift
        : styles.stockroomShift;

  return (
    <div className={styles.cell}>
      <div className={`${styles.shift} ${shiftClass}`}>{children}</div>
    </div>
  );
}

function Off() {
  return (
    <div className={`${styles.cell} ${styles.off}`}>
      <span>—</span>
    </div>
  );
}
