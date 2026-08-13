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
    ((dp.sales - st.sales_target) / st.sales_target) 
    * 100, 1) AS target_difference,
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
    targetDifference: Number(dashboard.target_difference),
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
