import styles from "./Notifications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClipboardCheck,
  faTriangleExclamation,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { Notification } from "../../../types/notification";
import { formatNotificationDate } from "./formatNotificatiions";

type NotificationsProps = {
  notifications: Notification[];
};

export default function Notifications({ notifications }: NotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.notifications}>
      <button
        type="button"
        className={styles.notificationButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBell} />
        <span className={styles.notificationCount}>{notifications.length}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <div>
              <h3>Notifications</h3>
              <p>{notifications.length} items need your attention</p>
            </div>
          </div>

          <div className={styles.list}>
            {notifications.map((notification) => {
              if (notification.type === "task") {
                return (
                  <div key={notification.taskId} className={styles.item}>
                    <div className={`${styles.icon} ${styles.taskIcon}`}>
                      <FontAwesomeIcon icon={faClipboardCheck} />
                    </div>

                    <div className={styles.details}>
                      <div className={styles.itemHeader}>
                        <h4>Overdue task</h4>
                        <span>{notification.startTime.slice(0, 5)}</span>
                      </div>

                      <p>{notification.title}</p>
                    </div>
                  </div>
                );
              }

              if (notification.type === "follow_up") {
                return (
                  <div key={notification.followUpId} className={styles.item}>
                    <div className={`${styles.icon} ${styles.priorityIcon}`}>
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                    </div>

                    <div className={styles.details}>
                      <div className={styles.itemHeader}>
                        <h4>High priority follow-up</h4>
                        <span>
                          {formatNotificationDate(notification.createdAt)}
                        </span>
                      </div>

                      <p>{notification.content}</p>
                    </div>
                  </div>
                );
              }

              if (notification.type === "acknowledgement") {
                return (
                  <div key={notification.handoverId} className={styles.item}>
                    <div className={`${styles.icon} ${styles.handoverIcon}`}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>

                    <div className={styles.details}>
                      <div className={styles.itemHeader}>
                        <h4>Handover not acknowledged</h4>
                        <span>
                          {formatNotificationDate(notification.createdAt)}
                        </span>
                      </div>

                      <p>
                        Store handover from{" "}
                        {formatNotificationDate(
                          notification.createdAt,
                        ).toLowerCase()}{" "}
                        is still awaiting acknowledgement.
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
