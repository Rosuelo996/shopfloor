import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faBell,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import { useUsers } from "../../hooks/useUsers";
import UserMenu from "../UsersMenu/UsersMenu";

type HeaderProps = {
  date: string;
  onDateChange: (date: string) => void;
};

export default function Header({ date, onDateChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const { currentUser } = useUsers();

  return (
    <header className={styles.header}>
      <div className={styles.greeting}>
        <h1>Good morning, {currentUser?.firstName} 👋</h1>
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

        <div className={`${styles.notification} ${styles.notReady}`}>
          <FontAwesomeIcon icon={faBell} />
          <span className={styles.notificationCount}>3</span>
        </div>

        <div className={styles.profileWrapper}>
          <button
            type="button"
            className={styles.headerProfile}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <div className={styles.headerAvatar}>
              <span>
                {currentUser?.firstName[0]}
                {currentUser?.lastName[0]}
              </span>
            </div>

            <div className={styles.headerUser}>
              <h4>
                {currentUser?.firstName} {currentUser?.lastName.slice(0, 1)}.
              </h4>
              <p>{currentUser?.role}</p>
            </div>

            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            />
          </button>

          {isOpen && <UserMenu 
          onClose={() => setIsOpen(false)}
          variant="header" />}
        </div>
      </div>
    </header>
  );
}
