import styles from "./DailyTarget.module.css";

export default function DailyTarget() {
  return (
    <div className={styles.dailyTarget}>
      <div className={styles.header}>
        <p>Today's Sales</p>
        <button>Edit Target</button>
      </div>

      <div className={styles.sales}>
        <h2>£3,840</h2>
        <span>/ £5,000</span>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
        <span>77%</span>
      </div>

      <div className={styles.details}>
        <div>
          <p>Target Remaining</p>
          <strong>£1,160</strong>
        </div>

        <div>
          <p>Projected (EOD)</p>
          <strong>£5,120</strong>
        </div>
      </div>
    </div>
  );
}

