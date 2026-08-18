import db from "../db/db.js";

export async function fetchLatestHandover(date) {
  const result = await db.query(`
    SELECT 
      h.id,
      h.created_by,
      h.created_at,
      h.acknowledged,
      u.first_name,
      u.last_name,
      hi.id AS item_id,
      hi.type,
      hi.content,
      hi.priority,
      hi.completed
      FROM handovers h
      INNER JOIN users u
      ON h.created_by = u.id
      INNER JOIN handover_items hi
      ON h.id = hi.handover_id
      WHERE h.created_at::date = $1::date - 1
      AND hi.type = 'follow_up'
      ORDER BY
      CASE hi.priority
      WHEN 'high' THEN 1
      WHEN 'medium' THEN 2
      WHEN 'low' THEN 3
      END
      LIMIT 3
    `,[date])

    if(result.rows.length === 0) {
      return null;
    }

    const firstRow = result.rows[0]

    const formattedHandover = {
      id: firstRow.id,
      createdBy: {
        id: firstRow.created_by,
        firstName: firstRow.first_name,
        lastName: firstRow.last_name
      },
      createdAt: firstRow.created_at,
      acknowledged: firstRow.acknowledged,
      items: result.rows.map((row) => ({
        id: row.item_id,
        content: row.content,
        priority: row.priority,
        completed: row.completed
      }))
    }

    return formattedHandover
}


export async function updateHandoverItemCompleted(id, completed) {
 const result = await db.query(
  `UPDATE handover_items
   SET completed = $1
   WHERE id = $2
   RETURNING *`,
[completed, id]
 )

 return result.rows[0]
}

