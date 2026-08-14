import { useState } from "react";
import styles from "./LatestHandover.module.css";
import type { LatestHandoverData } from "../../../../types/dashboard";

type Props = {
  handover: LatestHandoverData | null;
};

export default function LatestHandover({ handover }: Props) {
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [acknowledged, setAcknowledged] = useState(false);

  const toggleCompleted = (id: number) => {
    setCompletedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={styles.latestHandover}>
      <div className={styles.header}>
        <h3>Latest Handover</h3>
        <span className={styles.priority}>Priority</span>
      </div>

      <div className={styles.content}>
        <div className={styles.items}>
          {handover?.items.map((item) => {
            const completed =
              item.completed || completedItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={styles.item}
                onClick={() => toggleCompleted(item.id)}
              >
                <span className={styles.alert}>
                  {completed ? "✓" : "!"}
                </span>

                <p className={completed ? styles.completed : ""}>
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>

        <div className={styles.meta}>
          <div className={styles.avatar}></div>

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
          {acknowledged
            ? "Handover Acknowledged"
            : "Acknowledge Handover"}
        </button>
      </div>

      <button className={styles.viewAll}>
        View all handovers <span>→</span>
      </button>
    </div>
  );
}