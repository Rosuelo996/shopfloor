import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faHouse,
  faChartColumn,
  faHandshake,
  faClipboardCheck,
  faChartLine,
  faUsers,
  faGear,
  faStore,
  faRightFromBracket,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UserMenu from "../UsersMenu/UsersMenu";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useUsers();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faBagShopping} className={styles.logoIcon} />

        <div>
          <h1>ShopFloor</h1>
          <p>Store Management</p>
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/trade"
              onClick={(e) => e.preventDefault()}
              className={({ isActive }) =>
                `${styles.item} ${styles.notReady} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faChartColumn} />
              <span>Log Trade</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/handover"
              onClick={(e) => e.preventDefault()}
              className={({ isActive }) =>
                `${styles.item} ${styles.notReady} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faHandshake} />
              <span>Handover</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks"
              onClick={(e) => e.preventDefault()}
              className={({ isActive }) =>
                `${styles.item} ${styles.notReady} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faClipboardCheck} />
              <span>Tasks</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/trends"
              onClick={(e) => e.preventDefault()}
              className={({ isActive }) =>
                `${styles.item} ${styles.notReady} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faChartLine} />
              <span>Trends</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/team"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faUsers} />
              <span>Team</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              onClick={(e) => e.preventDefault()}
              className={({ isActive }) =>
                `${styles.item} ${styles.notReady} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faGear} />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.bottom}>
        <div className={styles.store}>
          <FontAwesomeIcon icon={faStore} />

          <div>
            <h4>Suitsupply London</h4>
            <p>Lime Street</p>
          </div>
        </div>

        <div className={styles.profileWrapper}>
          <button
            type="button"
            className={styles.profile}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <div className={styles.avatar}>
              <span>
                {currentUser?.firstName[0]}
                {currentUser?.lastName[0]}
              </span>
            </div>

            <div className={styles.user}>
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

          {isOpen && (
            <UserMenu onClose={() => setIsOpen(false)} variant="sidebar" />
          )}
        </div>

        <button className={`${styles.logout} ${styles.notReady}`}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
