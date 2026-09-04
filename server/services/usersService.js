import db from "../db/db.js";

export async function fetchDemoUsers() {
  const result = await db.query(`
    SELECT 
    id, 
    first_name, 
    last_name, 
    role,
    is_demo
    FROM users
    WHERE is_demo = TRUE
    ORDER BY id;
    `);

  const users = result.rows;

  const formattedUsers = users.map((user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    clerkUserId: user.clerk_user_id,
    isDemo: user.is_demo,
  }));

  return formattedUsers;
}

export async function fetchUserByClerkId(clerkUserId) {
  const result = await db.query(
    `
  SELECT 
    id, 
    first_name,
    last_name,
    role,
    clerk_user_id,
    is_demo
  FROM users
  WHERE clerk_user_id = $1;
  `,
    [clerkUserId],
  );

  const user = result.rows[0];

  if (!user) {
    return null;
  }

  const formattedUser = {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    clerkUserId: user.clerk_user_id,
    isDemo: user.is_demo,
  };

  return formattedUser;
}


export async function fetchDemoUserById(userId) {
  const result = await db.query(`
    SELECT id, clerk_user_id
    FROM users
    WHERE id = $1
    AND is_demo = TRUE;
    `, [userId]
  );

  const user = result.rows[0]

  if(!user) {
    return null
  }

  const formattedUser = {
    id: user.id,
    clerkUserId: user.clerk_user_id
  }

  return formattedUser
}


export async function createUser(firstName, lastName, clerkUserId) {
  const result = await db.query(
    `
    INSERT INTO users (
      first_name,
      last_name,
      role,
      clerk_user_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [firstName, lastName, "Sales Assistant", clerkUserId]
  );

  return result.rows[0];
}