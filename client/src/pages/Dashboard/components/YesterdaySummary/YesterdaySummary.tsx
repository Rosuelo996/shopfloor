import type { YesterdaySummaryData } from "../../../../types/dashboard";
import styles from "./YesterdaySummary.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSterlingSign,
  faReceipt,
  faPercent,
  faMoneyBillTrendUp,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import YesterdaySummarySkeleton from "./YesterdaySummarySkeleton";

type Props = {
  yesterday: YesterdaySummaryData | null;
  loading: boolean;
};

export default function YesterdaySummary({ yesterday, loading }: Props) {
  if (loading) {
  return <YesterdaySummarySkeleton />;
}

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
        <h2>Yesterday Summary</h2>
        <span>vs same day last week</span>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faSterlingSign} />
          </div>
          <span>Sales</span>
        </div>

        <div className={styles.result}>
          <strong>£{yesterday?.yesterdaySales.toLocaleString("en-GB")}</strong>
          {renderDifference(yesterday?.salesDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faReceipt} />
          </div>
          <span>Transactions</span>
        </div>

        <div className={styles.result}>
          <strong>{yesterday?.yesterdayTransactions}</strong>
          {renderDifference(yesterday?.transactionsDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faPercent} />
          </div>
          <span>Conversion</span>
        </div>

        <div className={styles.result}>
          <strong>{yesterday?.yesterdayConversion}%</strong>
          {renderDifference(yesterday?.conversionDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faMoneyBillTrendUp} />
          </div>
          <span>APC</span>
        </div>

        <div className={styles.result}>
          <strong>£{yesterday?.yesterdayApc}</strong>
          {renderDifference(yesterday?.apcDifference ?? 0)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
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