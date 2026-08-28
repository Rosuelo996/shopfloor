import db from "../db/db.js";

export async function fetchDailyShifts(date) {
  const result = await db.query(
    `SELECT
      e.id,
      e.first_name,
      e.last_name,
      e.role,
      s.start_time,
      s.end_time
    FROM employees e
    LEFT JOIN shifts s
      ON e.id = s.employee_id
      AND s.shift_date = $1
    ORDER BY e.id`,
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

export async function fetchWeeklyShifts(date) {
  const weekResult = await db.query(
    `SELECT
      TO_CHAR(DATE_TRUNC('week', $1::date), 'YYYY-MM-DD') AS week_start,
      TO_CHAR(
        DATE_TRUNC('week', $1::date) + INTERVAL '6 days',
        'YYYY-MM-DD'
      ) AS week_end,
      TO_CHAR(
        DATE_TRUNC('week', $1::date) - INTERVAL '7 days',
        'YYYY-MM-DD'
      ) AS previous_week,
      TO_CHAR(
        DATE_TRUNC('week', $1::date) + INTERVAL '7 days',
        'YYYY-MM-DD'
      ) AS next_week,
      ARRAY(
        SELECT TO_CHAR(day, 'YYYY-MM-DD')
        FROM GENERATE_SERIES(
          DATE_TRUNC('week', $1::date),
          DATE_TRUNC('week', $1::date) + INTERVAL '6 days',
          INTERVAL '1 day'
        ) AS day
      ) AS week_days;`,
    [date],
  );

  const shiftsResult = await db.query(
    `SELECT
      e.id,
      e.first_name,
      e.last_name,
      e.role,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'date', TO_CHAR(s.shift_date, 'YYYY-MM-DD'),
          'start_time', s.start_time,
          'end_time', s.end_time
        )
        ORDER BY s.shift_date
      ) AS shifts
    FROM shifts s
    INNER JOIN employees e
      ON s.employee_id = e.id
    WHERE
      s.shift_date >= DATE_TRUNC('week', $1::date)
      AND
      s.shift_date <= DATE_TRUNC('week', $1::date) + INTERVAL '6 days'
    GROUP BY e.id
    ORDER BY e.id;`,
    [date],
  );

  const week = weekResult.rows[0];

  const team = shiftsResult.rows.map((employee) => ({
    id: employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    role: employee.role,
    shifts: employee.shifts.map((shift) => ({
      date: shift.date,
      startTime: shift.start_time,
      endTime: shift.end_time,
    })),
  }));

  return {
    weekStart: week.week_start,
    weekEnd: week.week_end,
    previousWeek: week.previous_week,
    nextWeek: week.next_week,
    weekDays: week.week_days,
    team,
  };
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
