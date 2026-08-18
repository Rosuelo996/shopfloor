import db from "../db/db.js";

export async function fetchTasksByDate(date) {
  const result = await db.query(
    `SELECT 
    id,
    task_template_id,
    task_date,
    title,
    start_time,
    expected_duration_minutes,
    status,
    completed_at
    FROM daily_tasks
    WHERE task_date = $1
    ORDER BY start_time ASC
    `,
    [date],
  );

  const tasksByDate = result.rows;

  const formattedTasksByDate = tasksByDate.map((task) => ({
    id: task.id,
    taskTemplateId: task.task_template_id,
    taskDate: task.task_date,
    title: task.title,
    startTime: task.start_time,
    expectedDurationMinutes: task.expected_duration_minutes,
    status: task.status,
    completedAt: task.completed_at,
  }));

  return formattedTasksByDate;
}

export async function updateTaskStatusById(id, status) {
  const result = await db.query (
    `UPDATE daily_tasks
     SET 
     status = $1,
     completed_at = 
     CASE
     WHEN $1::varchar = 'completed'
     THEN NOW()
     ELSE NULL
     END
     WHERE id = $2
    RETURNING *`,
     [status, id]
  )
  return result.rows[0]
}
