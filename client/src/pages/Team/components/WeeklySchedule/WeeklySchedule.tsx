import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./WeeklySchedule.module.css";

export default function WeeklySchedule() {
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
            <button type="button" aria-label="Previous week">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <span>31 Aug – 6 Sep 2026</span>

            <button type="button" aria-label="Next week">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.scheduleTable}>
          <div className={`${styles.cell} ${styles.teamHeader}`}>
            Team
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Mon</span>
            <strong>31 Aug</strong>
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Tue</span>
            <strong>1 Sep</strong>
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Wed</span>
            <strong>2 Sep</strong>
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Thu</span>
            <strong>3 Sep</strong>
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Fri</span>
            <strong>4 Sep</strong>
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Sat</span>
            <strong>5 Sep</strong>
          </div>

          <div className={`${styles.cell} ${styles.dayHeader}`}>
            <span>Sun</span>
            <strong>6 Sep</strong>
          </div>

          {/* Stefano */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.managementAvatar}`}>
              SW
            </div>

            <div>
              <h3>Stefano Wijegunaratne</h3>
              <p>Store Manager</p>
            </div>
          </div>

          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 19:00</Shift>
          <Off />
          <Off />

          {/* Sophie */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.managementAvatar}`}>
              SL
            </div>

            <div>
              <h3>Sophie Laurent</h3>
              <p>Assistant Manager</p>
            </div>
          </div>

          <Shift type="management">09:00 – 18:00</Shift>
          <Shift type="management">09:00 – 18:00</Shift>
          <Shift type="management">09:00 – 18:00</Shift>
          <Off />
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 18:00</Shift>
          <Off />

          {/* Josh */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.managementAvatar}`}>
              JC
            </div>

            <div>
              <h3>Josh Carter</h3>
              <p>Supervisor</p>
            </div>
          </div>

          <Shift type="management">11:00 – 19:00</Shift>
          <Off />
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 19:00</Shift>
          <Off />
          <Shift type="management">10:00 – 18:00</Shift>
          <Shift type="management">12:00 – 18:00</Shift>

          {/* Emily */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.managementAvatar}`}>
              ET
            </div>

            <div>
              <h3>Emily Thompson</h3>
              <p>Supervisor</p>
            </div>
          </div>

          <Off />
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 19:00</Shift>
          <Off />
          <Shift type="management">10:00 – 19:00</Shift>
          <Shift type="management">10:00 – 18:00</Shift>
          <Shift type="management">12:00 – 18:00</Shift>

          {/* Alex */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.salesAvatar}`}>AM</div>

            <div>
              <h3>Alex Morgan</h3>
              <p>Sales Assistant</p>
            </div>
          </div>

          <Shift type="sales">11:00 – 19:00</Shift>
          <Shift type="sales">10:00 – 19:00</Shift>
          <Off />
          <Shift type="sales">11:00 – 19:00</Shift>
          <Shift type="sales">10:00 – 19:00</Shift>
          <Shift type="sales">10:00 – 18:00</Shift>
          <Off />

          {/* Maya */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.salesAvatar}`}>MP</div>

            <div>
              <h3>Maya Patel</h3>
              <p>Sales Assistant</p>
            </div>
          </div>

          <Shift type="sales">10:00 – 18:00</Shift>
          <Off />
          <Shift type="sales">11:00 – 19:00</Shift>
          <Shift type="sales">10:00 – 19:00</Shift>
          <Shift type="sales">11:00 – 19:00</Shift>
          <Shift type="sales">10:00 – 18:00</Shift>
          <Off />

          {/* Marcus */}

          <div className={`${styles.cell} ${styles.employee}`}>
            <div className={`${styles.avatar} ${styles.stockroomAvatar}`}>
              MJ
            </div>

            <div>
              <h3>Marcus Johnson</h3>
              <p>Stockroom Supervisor</p>
            </div>
          </div>

          <Shift type="stockroom">08:00 – 17:00</Shift>
          <Shift type="stockroom">08:00 – 17:00</Shift>
          <Shift type="stockroom">08:00 – 17:00</Shift>
          <Shift type="stockroom">08:00 – 17:00</Shift>
          <Shift type="stockroom">08:00 – 17:00</Shift>
          <Off />
          <Off />
        </div>
      </div>
    </section>
  );
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