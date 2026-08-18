import { useState } from "react";
import styles from "./LatestHandover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { LatestHandoverData } from "../../../../types/handover";

type Props = {
  handover: LatestHandoverData | null;
  onToggleCompleted: (id: number, completed: boolean) => Promise<void>
};

export default function LatestHandover({ handover, onToggleCompleted }: Props) {
  const [acknowledged, setAcknowledged] = useState(false);


  return (
    <div className={styles.latestHandover}>
      <div className={styles.header}>
        <h3>Latest Handover</h3>
        <span className={styles.priority}>Priority</span>
      </div>

      <div className={styles.content}>
        <div className={styles.items}>
          {handover?.items.map((item) => {

            return (
              <div
                key={item.id}
                className={styles.item}
                onClick={() => onToggleCompleted(item.id, item.completed)}
              >
                <span className={styles.alert}>{item.completed ? "✓" : "!"}</span>

                <p className={item.completed ? styles.completed : ""}>
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>

        <div className={styles.meta}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className={styles.author}>
            <span>
              Written by{" "}
              <strong>
                {handover?.createdBy.firstName}{" "}
                {handover?.createdBy.lastName.charAt(0)}.
              </strong>
            </span>

            <span>Yesterday, 7:54 PM</span>
          </div>
        </div>

        <button
          className={`${styles.acknowledge} ${
            acknowledged ? styles.acknowledged : ""
          }`}
          onClick={() => setAcknowledged(true)}
          disabled={acknowledged}
        >
          <span>✓</span>
          {acknowledged ? "Handover Acknowledged" : "Acknowledge Handover"}
        </button>
      </div>

      <button className={styles.viewAll}>
        View all handovers <span>→</span>
      </button>
    </div>
  );
}
