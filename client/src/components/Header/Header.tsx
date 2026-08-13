import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faBell,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1>Good morning, Stefano 👋</h1>
          <p>Here's what's happening in your store today.</p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.date}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>Tuesday, 11 August 2026</span>
          </div>

          <div className={styles.notification}>
            <FontAwesomeIcon icon={faBell} />
            <span className={styles.notificationCount}>3</span>
          </div>

          <div className={styles.headerProfile}>
            <div className={styles.headerAvatar}>
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className={styles.headerUser}>
              <h4>Stefano W.</h4>
              <p>Store Manager</p>
            </div>

            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.chevron}
            />
          </div>
        </div>
      </header>
    </div>
  );
}