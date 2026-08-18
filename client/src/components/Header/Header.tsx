import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faBell,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

type HeaderProps = {
  date: string;
  onDateChange: (date: string) => void;
};

export default function Header({ date, onDateChange }: HeaderProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1>Good morning, Stefano 👋</h1>
          <p>Here's what's happening in your store today.</p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.date}>
            <button
              type="button"
              onClick={() => {
                dateInputRef.current?.showPicker();
              }}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
            </button>
            <input
              ref={dateInputRef}
              className={styles.dateInput}
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              min="2026-08-01"
              max="2026-08-31"
            />
            <p>{formattedDate}</p>
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

            <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
          </div>
        </div>
      </header>
    </div>
  );
}
