export type DashboardData = {
  date: string;
  sales: number;
  salesTarget: number;
  targetCompletion: number;
  transactions: number;
  visitors: number;
  itemsSold: number;
  apc: number;
  apcTarget: number;
  apcDifference: number;
  ipc: number;
  ipcTarget: number;
  ipcDifference: number;
  conversion: number;
  conversionTarget: number;
  conversionDifference: number;
};

export type YesterdaySummaryData = {
  yesterdayDate: string;
  lastWeekDate: string;

  yesterdaySales: number;
  lastWeekSales: number;
  salesDifference: number;

  yesterdayTransactions: number;
  lastWeekTransactions: number;
  transactionsDifference: number;

  yesterdayConversion: number;
  lastWeekConversion: number;
  conversionDifference: number;

  yesterdayApc: number;
  lastWeekApc: number;
  apcDifference: number;

  yesterdayIpc: number;
  lastWeekIpc: number;
  ipcDifference: number;
};