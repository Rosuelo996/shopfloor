import db from "../db/db.js";

export async function fetchNewsletter(date) {
  const result = await db.query(
    `
      SELECT
        n.id,
        n.week_start,
        EXTRACT(WEEK FROM n.week_start)::int AS week_number,
        EXTRACT(YEAR FROM n.week_start)::int AS year,
        n.published_at,
        ni.id AS item_id,
        ni.category,
        ni.title,
        ni.content,
        ni.priority,
        ni.display_order
      FROM newsletters n
      JOIN newsletter_items ni
        ON ni.newsletter_id = n.id
      WHERE $1::date >= n.week_start
        AND $1::date < n.week_start + INTERVAL '7 days'
      ORDER BY ni.priority DESC, ni.display_order
    `,
    [date],
  );

  const newsletters = result.rows;

  if (newsletters.length === 0) {
    return null;
  }

  const formattedNewsletter = {
    id: newsletters[0].id,
    weekStart: newsletters[0].week_start,
    weekNumber: newsletters[0].week_number,
    year: newsletters[0].year,
    publishedAt: newsletters[0].published_at,

    items: newsletters.map((newsletter) => ({
      id: newsletter.item_id,
      category: newsletter.category,
      title: newsletter.title,
      content: newsletter.content,
      priority: newsletter.priority,
      displayOrder: newsletter.display_order,
    })),
  };

  return formattedNewsletter;
}