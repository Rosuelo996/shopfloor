import styles from "./Availability.module.css";
import type { AvailabilityData } from "../../../../types/team";
import AvailabilitySkeleton from "./Skeleton/AvailabilitySkeleton";

type Props = {
    teamAvailability: AvailabilityData[];
    loading: boolean;
}


export default function Availability({teamAvailability, loading}: Props) {
  if (loading) {
    return <AvailabilitySkeleton />;
  }

  return (
    <section className={styles.availability}>
      <div className={styles.header}>
        <h2>Team Availability</h2>
        <p>Weekly availability across your team</p>
      </div>

      <div className={styles.panel}>
        <div className={styles.grid}>
          {teamAvailability.map((employee) => (
            <div key={employee.id} className={styles.member}>
              <div className={styles.memberInfo}>
                <div className={styles.avatar}>
                  <span>{employee.firstName[0]}{employee.lastName[0]}</span>
                </div>

                <div className={styles.details}>
                  <h3>{employee.firstName} {employee.lastName}</h3>

                  <p>
                    {employee.role}
                    <span>•</span>
                    {employee.employmentType}
                  </p>
                </div>
              </div>

              <div className={styles.days}>
                {employee.availability.map((availability) => (
                  <span
                    key={availability.id}
                    className={
                      availability.isAvailable
                        ? styles.available
                        : styles.unavailable
                    }
                  >
                    {availability.day.slice(0, 3)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.legend}>
          <div>
            <span className={`${styles.dot} ${styles.availableDot}`}></span>
            Available
          </div>

          <div>
            <span className={`${styles.dot} ${styles.unavailableDot}`}></span>
            Not available
          </div>
        </div>
      </div>
    </section>
  );
}