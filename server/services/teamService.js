import db from "../db/db.js";

export async function fetchShifts(date) {
  const result = await db.query(
    `SELECT
    e.id,
    e.first_name,
    e.last_name,
    e.role,
    s.start_time,
    s.end_time
  FROM shifts s
  INNER JOIN employees e
    ON s.employee_id = e.id
  WHERE s.shift_date = $1`,
    [date],
  );

  const shifts = result.rows

  const formattedShifts = shifts.map((shift) => ({
    id: shift.id,
    firstName: shift.first_name,
    lastName: shift.last_name,
    role: shift.role,
    startTime: shift.start_time,
    endTime: shift.end_time
  }))

  return formattedShifts;
}
