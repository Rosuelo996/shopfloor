import type { YesterdaySummaryData } from "../../../../types/dashboard";
import styles from "./YesterdaySummary.module.css";

type Props = {
  yesterday: YesterdaySummaryData | null;
};

export default function YesterdaySummary({ yesterday }: Props) {
  const renderDifference = (difference: number) => {
    return (
      <span className={difference >= 0 ? styles.positive : styles.negative}>
        {difference > 0 ? "+" : ""}
        {difference}%
      </span>
    );
  };

  return (
    <div className={styles.yesterdaySummary}>
      <div className={styles.header}>
        <h3>Yesterday Summary</h3>
        <span>vs same day last week</span>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>£</div>
          <span>Sales</span>
        </div>

        <div className={styles.result}>
          <strong>£{yesterday?.yesterdaySales}</strong>
          {renderDifference(yesterday?.salesDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>🛒</div>
          <span>Transactions</span>
        </div>

        <div className={styles.result}>
          <strong>{yesterday?.yesterdayTransactions}</strong>
          {renderDifference(yesterday?.transactionsDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>▥</div>
          <span>Conversion</span>
        </div>

        <div className={styles.result}>
          <strong>{yesterday?.yesterdayConversion}%</strong>
          {renderDifference(yesterday?.conversionDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>◆</div>
          <span>APC</span>
        </div>

        <div className={styles.result}>
          <strong>£{yesterday?.yesterdayApc}</strong>
          {renderDifference(yesterday?.apcDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>♟</div>
          <span>IPC</span>
        </div>

        <div className={styles.result}>
          <strong>{yesterday?.yesterdayIpc}</strong>
          {renderDifference(yesterday?.ipcDifference ?? 0)}
        </div>
      </div>
    </div>
  );
}
