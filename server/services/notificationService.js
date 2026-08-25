import db from "../db/db.js";
import { DEMO_DATE, DEMO_TIME } from "../config/demoClock.js";

export async function fetchNotifications() {
  const taskNotifications = db.query(
    `
    SELECT 
    dt.id, dt.title, dt.start_time
    FROM daily_tasks dt
    WHERE status = 'pending'
    AND (
    dt.task_date < $1::date
    OR (
    dt.task_date = $1::date
    AND dt.start_time + (dt.expected_duration_minutes * INTERVAL '1 minute') < $2::time
    )
    );
    `,
    [DEMO_DATE, DEMO_TIME],
  );

  const handoverNotifications = db.query(
    `
    SELECT
    hi.id,
    hi.content,
    h.created_at
    FROM handover_items hi
    INNER JOIN handovers h
    ON hi.handover_id = h.id
    WHERE 
    hi.type = 'follow_up'
    AND hi.priority = 'high' 
    AND hi.completed = false;
    `,
  );

  const acknowledgeNotifications = db.query(
    `
    SELECT
    h.id,
    h.created_at
    FROM handovers h
    WHERE h.acknowledged = false
    AND h.created_at::date >= $1::date - 7
    AND h.created_at::date < $1::date;
    `,
    [DEMO_DATE],
  );

  const [taskResult, handoverResult, acknowledgeResult] = await Promise.all([
    taskNotifications,
    handoverNotifications,
    acknowledgeNotifications,
  ]);

  const tasks = taskResult.rows;
  const handovers = handoverResult.rows;
  const acknowledgements = acknowledgeResult.rows;

  const formattedTaskNotifications = tasks.map((task) => ({
    taskId: task.id,
    type: "task",
    title: task.title,
    startTime: task.start_time,
  }));

  const formattedHandoverNotifications = handovers.map((handover) => ({
    followUpId: handover.id,
    type: "follow_up",
    content: handover.content,
    createdAt: handover.created_at,
  }));

  const formattedAcknowledgeNotifications = acknowledgements.map(
    (handover) => ({
      handoverId: handover.id,
      type: "acknowledgement",
      createdAt: handover.created_at,
    }),
  );

  return [
    ...formattedTaskNotifications,
    ...formattedHandoverNotifications,
    ...formattedAcknowledgeNotifications,
  ];
}
