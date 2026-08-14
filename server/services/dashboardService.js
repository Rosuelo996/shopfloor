import db from "../db/db.js";

export async function getDashboardData(date) {
  const result = await db.query(
    `
    SELECT 
    TO_CHAR(dp.date, 'YYYY-MM-DD') AS date,
    dp.sales,
    dp.transactions,
    dp.visitors,
    dp.items_sold,
    ROUND(dp.sales / dp.transactions) AS apc,
    ROUND(dp.items_sold / dp.transactions, 1) AS ipc,
    st.sales_target,
    ROUND(
    (dp.sales / st.sales_target) 
    * 100, 1) AS target_completion,
    ROUND(
    (dp.transactions::NUMERIC / dp.visitors) 
    * 100, 1) AS conversion,
    ROUND(
    (((dp.transactions::NUMERIC / dp.visitors) * 100)
    / kt.conversion_target * 100) -100, 1) AS conversion_difference,
    kt.apc_target,
    kt.ipc_target,
    kt.conversion_target,
    ROUND(
    (((dp.sales / dp.transactions)/ kt.apc_target)
    * 100) - 100,1) AS apc_difference,
    ROUND(
    (((dp.items_sold::NUMERIC / dp.transactions)/ kt.ipc_target)
    * 100) -100,1) AS ipc_difference
    FROM daily_performance dp
    JOIN sales_targets st
    ON st.day_of_week = TRIM(TO_CHAR(dp.date, 'Day'))
    CROSS JOIN kpi_targets kt
    WHERE dp.date = $1
    ORDER BY dp.date DESC
    LIMIT 1
   `,
    [date],
  );

  const dashboard = result.rows[0];

  const formattedDashboard = {
    date: dashboard.date,
    sales: Number(dashboard.sales),
    salesTarget: Number(dashboard.sales_target),
    targetCompletion: Number(dashboard.target_completion),
    transactions: dashboard.transactions,
    visitors: dashboard.visitors,
    itemsSold: dashboard.items_sold,
    apc: Number(dashboard.apc),
    apcTarget: dashboard.apc_target,
    apcDifference: Number(dashboard.apc_difference),
    ipc: Number(dashboard.ipc),
    ipcTarget: Number(dashboard.ipc_target),
    ipcDifference: Number(dashboard.ipc_difference),
    conversion: Number(dashboard.conversion),
    conversionTarget: Number(dashboard.conversion_target),
    conversionDifference: Number(dashboard.conversion_difference),
  };

  return formattedDashboard;
}

export async function getYesterdaySummary(date) {
  const result = await db.query(
`WITH comparison AS (
  SELECT
    TO_CHAR(yesterday.date, 'YYYY-MM-DD') AS yesterday_date,
    TO_CHAR(last_week.date, 'YYYY-MM-DD') AS last_week_date,
	
    yesterday.sales AS yesterday_sales,
    last_week.sales AS last_week_sales,
	
    yesterday.transactions AS yesterday_transactions,
    last_week.transactions AS last_week_transactions,

    ROUND((yesterday.transactions::NUMERIC / yesterday.visitors) * 100,1) 
	  AS yesterday_conversion,
    ROUND((last_week.transactions::NUMERIC / last_week.visitors) * 100,1) 
	  AS last_week_conversion,

    ROUND(yesterday.sales / yesterday.transactions)
    AS yesterday_apc,
    ROUND(last_week.sales / last_week.transactions)
    AS last_week_apc,

    ROUND(yesterday.items_sold::NUMERIC / yesterday.transactions,1) 
	  AS yesterday_ipc,
    ROUND(last_week.items_sold::NUMERIC / last_week.transactions,1) 
	  AS last_week_ipc

  FROM daily_performance yesterday

  JOIN daily_performance last_week
    ON last_week.date = yesterday.date - 7

  WHERE yesterday.date = $1::date - 1
)

SELECT
  yesterday_date,
  last_week_date,

  yesterday_sales,
  last_week_sales,
  ROUND((yesterday_sales / last_week_sales * 100)- 100,1)
  AS sales_difference,

  yesterday_transactions,
  last_week_transactions,
  ROUND((yesterday_transactions::NUMERIC / last_week_transactions * 100)-100,1)
  AS transactions_difference,

  yesterday_conversion,
  last_week_conversion,
  ROUND((yesterday_conversion / last_week_conversion * 100)-100,1)
  AS conversion_difference,

  yesterday_apc,
  last_week_apc,
  ROUND((yesterday_apc / last_week_apc * 100)-100,1)
  AS apc_difference,

  yesterday_ipc,
  last_week_ipc,
  ROUND((yesterday_ipc / last_week_ipc * 100)-100,1)
  AS ipc_difference

  FROM comparison; `,
  [date]
  );

  const yesterday = result.rows[0];

  const formattedYesterday = {
  yesterdayDate: yesterday.yesterday_date,
  lastWeekDate: yesterday.last_week_date,

  yesterdaySales: Number(yesterday.yesterday_sales),
  lastWeekSales: Number(yesterday.last_week_sales),
  salesDifference: Number(yesterday.sales_difference),

  yesterdayTransactions: yesterday.yesterday_transactions,
  lastWeekTransactions: yesterday.last_week_transactions,
  transactionsDifference: Number(yesterday.transactions_difference),

  yesterdayConversion: Number(yesterday.yesterday_conversion),
  lastWeekConversion: Number(yesterday.last_week_conversion),
  conversionDifference: Number(yesterday.conversion_difference),

  yesterdayApc: Number(yesterday.yesterday_apc),
  lastWeekApc: Number(yesterday.last_week_apc),
  apcDifference: Number(yesterday.apc_difference),

  yesterdayIpc: Number(yesterday.yesterday_ipc),
  lastWeekIpc: Number(yesterday.last_week_ipc),
  ipcDifference: Number(yesterday.ipc_difference),
};

return formattedYesterday;

}

 
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