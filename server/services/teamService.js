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

  const shifts = result.rows;

  const formattedShifts = shifts.map((shift) => ({
    id: shift.id,
    firstName: shift.first_name,
    lastName: shift.last_name,
    role: shift.role,
    startTime: shift.start_time,
    endTime: shift.end_time,
  }));

  return formattedShifts;
}

export async function fetchTeamAvailability() {
  const result = await db.query(
    `
    SELECT
      e.id,
      e.first_name,
      e.last_name,
      e.role,
      e.employment_type,
    JSON_AGG(
    ea ORDER BY
    CASE ea.day_of_week
      WHEN 'monday' THEN 1
      WHEN 'tuesday' THEN 2
      WHEN 'wednesday' THEN 3
      WHEN 'thursday' THEN 4
      WHEN 'friday' THEN 5
      WHEN 'saturday' THEN 6
      WHEN 'sunday' THEN 7
    END
    ) AS availability
    FROM employees e
    JOIN employee_availability ea
      ON e.id = ea.employee_id
    GROUP BY 
      e.id
    ORDER BY
      e.id
  `,
  );

  const availability = result.rows;

  const formattedAvailability = availability.map((employee) => ({
    id: employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    role: employee.role,
    employmentType: employee.employment_type,
    availability: employee.availability.map((day) => ({
      id: day.id,
      day: day.day_of_week,
      isAvailable: day.is_available,
      reason: day.reason,
    })),
  }));

  return formattedAvailability;
}
