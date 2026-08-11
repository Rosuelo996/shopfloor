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
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FontAwesomeIcon
          icon={faBagShopping}
          className={styles.logoIcon}
        />

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
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faChartColumn} />
              <span>Log Trade</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/handover"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faHandshake} />
              <span>Handover</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <FontAwesomeIcon icon={faClipboardCheck} />
              <span>Tasks</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/trends"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
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
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
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
            <p>Regent Street</p>
          </div>
        </div>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className={styles.user}>
            <h4>Stefano W.</h4>
            <p>Store Manager</p>
          </div>

          <FontAwesomeIcon icon={faChevronDown} />
        </div>

        <button className={styles.logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}