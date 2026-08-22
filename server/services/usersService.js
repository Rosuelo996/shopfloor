import db from "../db/db.js";

export async function fetchUsers() {
  const result = await db.query(`
    SELECT id, first_name, last_name, role
    FROM users
    ORDER BY id;
    `);

    const users = result.rows
    
    const formattedUsers = users.map((user) => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
    }))

    return formattedUsers
}
