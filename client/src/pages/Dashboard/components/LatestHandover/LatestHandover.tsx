import styles from "./LatestHandover.module.css";
import type { LatestHandoverData } from "../../../../types/handover";
import LatestHandoverSkeleton from "./Skeleton/LatestHandoverSkeleton";

type Props = {
  handover: LatestHandoverData | null;
  onToggleCompleted: (id: number, completed: boolean) => Promise<void>;
  onHandoverAcknowledge: () => Promise<void>;
  loading: boolean;
};

export default function LatestHandover({
  handover,
  onToggleCompleted,
  onHandoverAcknowledge,
  loading
}: Props) {

  if (loading) {
  return <LatestHandoverSkeleton />;
}

  return (
    <div className={styles.latestHandover}>
      <div className={styles.header}>
        <h2>Handover</h2>
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
                <span className={styles.alert}>
                  {item.completed ? "✓" : "!"}
                </span>

                <p className={item.completed ? styles.completed : ""}>
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>

        <div className={styles.meta}>
          <div className={styles.avatar}>
            <span>
              {handover?.createdBy.firstName[0]}
              {handover?.createdBy.lastName[0]}
            </span>
          </div>

          <div className={styles.author}>
            <span>
              Written by{" "}
              <strong>
                {handover?.createdBy.firstName}{" "}
                {handover?.createdBy.lastName.charAt(0)}.
              </strong>
            </span>

            <span>
              Yesterday,{" "}
              {handover &&
                new Date(handover.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </span>
          </div>
        </div>

        <button
          className={`${styles.acknowledge} ${
            handover?.acknowledged ? styles.acknowledged : ""
          }`}
          onClick={onHandoverAcknowledge}
        >
          <span>✓</span>
          {handover?.acknowledged ? "Handover Acknowledged" : "Acknowledge Handover"}
        </button>
      </div>

      <button className={`${styles.viewAll} ${styles.notAllowed}`}>
        View all handovers <span>→</span>
      </button>
    </div>
  );
}
