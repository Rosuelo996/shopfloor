import styles from "./TodayTasks.module.css";
import type { TaskData } from "../../../../types/tasks";

type Props = {
  tasks: TaskData[] | null;
  onTaskStatusToggle: (
    id: number,
    status: "pending" | "completed",
  ) => Promise<void>;
};

export default function TodayTasks({ tasks, onTaskStatusToggle }: Props) {
  if (tasks === null) {
  return (
    <section className={styles.tasks}>
      <div className={styles.header}>
        <h2>Today's Tasks</h2>
      </div>

      <div className={styles.loading}>
        Loading tasks...
      </div>
    </section>
  );
}
  const openTasks = tasks.filter((task) => task.status === "pending");

  return (
    <section className={styles.tasks}>
      <div className={styles.header}>
        <h2>Today's Tasks</h2>
        <span className={styles.openCount}>{openTasks.length} open</span>
      </div>

      <div className={styles.taskList}>
        {tasks.slice(0, 7).map((task) => (
          <div
            key={task.id}
            className={`${styles.task} ${
              task.status === "completed" ? styles.completed : ""
            }`}
          >
            <button
              className={styles.checkbox}
              aria-label={`Mark ${task.title} as completed`}
              onClick={() => onTaskStatusToggle(task.id, task.status)}
            >
              {task.status === "completed" && "✓"}
            </button>

            <span className={styles.title}>{task.title}</span>

            <span className={styles.time}>{task.startTime.slice(0, 5)}</span>
          </div>
        ))}
      </div>

      <button className={styles.viewAll}>
        View all tasks <span>→</span>
      </button>
    </section>
  );
}
