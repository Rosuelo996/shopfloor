import { useState } from "react";
import styles from "./TeamToday.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function TeamToday() {
  const [showAll, setShowAll] = useState(false);

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
        <div className={styles.member}>
          <div className={styles.avatar}>
            <span>SW</span>
          </div>

          <div className={styles.details}>
            <h3>Stefano Wijegunaratne</h3>
            <p>Store Manager</p>
            <span className={styles.shift}>10:00 – 19:00</span>
          </div>
        </div>

        <div className={styles.member}>
          <div className={styles.avatar}>
            <span>SL</span>
          </div>

          <div className={styles.details}>
            <h3>Sophie Laurent</h3>
            <p>Assistant Manager</p>
            <span className={styles.shift}>10:00 – 19:00</span>
          </div>
        </div>

        <div className={styles.member}>
          <div className={styles.avatar}>
            <span>JC</span>
          </div>

          <div className={styles.details}>
            <h3>Josh Carter</h3>
            <p>Supervisor</p>
            <span className={styles.shift}>10:00 – 19:00</span>
          </div>
        </div>

        <div className={styles.member}>
          <div className={styles.avatar}>
            <span>ET</span>
          </div>

          <div className={styles.details}>
            <h3>Emily Thompson</h3>
            <p>Supervisor</p>
            <span className={styles.shift}>10:00 – 19:00</span>
          </div>
        </div>

        <div className={styles.member}>
          <div className={styles.avatar}>
            <span>AM</span>
          </div>

          <div className={styles.details}>
            <h3>Alex Morgan</h3>
            <p>Sales Assistant</p>
            <span className={styles.shift}>11:00 – 19:00</span>
          </div>
        </div>

        <div className={styles.member}>
          <div className={styles.avatar}>
            <span>MJ</span>
          </div>

          <div className={styles.details}>
            <h3>Marcus Johnson</h3>
            <p>Stockroom Supervisor</p>
            <span className={styles.shift}>08:00 – 17:00</span>
          </div>
        </div>

        {showAll && (
          <>
            <div className={styles.member}>
              <div className={`${styles.avatar} ${styles.notScheduledAvatar}`}>
                <span>PS</span>
              </div>

              <div className={styles.details}>
                <h3>Priya Shah</h3>
                <p>Sales Assistant</p>
                <span className={styles.notScheduled}>Not scheduled</span>
              </div>
            </div>

            <div className={styles.member}>
              <div className={`${styles.avatar} ${styles.notScheduledAvatar}`}>
                <span>DB</span>
              </div>

              <div className={styles.details}>
                <h3>Daniel Brown</h3>
                <p>Sales Assistant</p>
                <span className={styles.notScheduled}>Not scheduled</span>
              </div>
            </div>

            <div className={styles.member}>
              <div className={`${styles.avatar} ${styles.notScheduledAvatar}`}>
                <span>OW</span>
              </div>

              <div className={styles.details}>
                <h3>Olivia Walker</h3>
                <p>Sales Assistant</p>
                <span className={styles.notScheduled}>Not scheduled</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
