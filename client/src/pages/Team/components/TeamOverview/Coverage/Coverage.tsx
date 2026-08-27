import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUsers,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Coverage.module.css";

export default function Coverage() {
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
            <h2>3</h2>
            <span>Scheduled</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.sales}`}>
            <FontAwesomeIcon icon={faUsers} />
          </div>

          <div className={styles.details}>
            <p>Sales Floor</p>
            <h2>6</h2>
            <span>Scheduled</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.stockroom}`}>
            <FontAwesomeIcon icon={faBox} />
          </div>

          <div className={styles.details}>
            <p>Stockroom</p>
            <h2>2</h2>
            <span>Scheduled</span>
          </div>
        </div>
      </div>
    </section>
  );
}