import styles from "./MetricCard.module.css";
import MetricCardSkeleton from "./Skeleton/MetricCardSkeleton";

type MetricCardProps = {
  label: string;
  value: string;
  change: string;
  comparison: string;
  positive?: boolean;
  loading: boolean;
};

export default function MetricCard({
  label,
  value,
  change,
  comparison,
  positive = true,
  loading,
}: MetricCardProps) {
  if (loading) {
    return <MetricCardSkeleton />;
  }

  return (
    <div className={styles.metricCard}>
      <p className={styles.label}>{label}</p>

      <h2 className={styles.value}>{value}</h2>

      <p
        className={`${styles.change} ${
          positive ? styles.positive : styles.negative
        }`}
      >
        <span>{positive ? "▲" : "▼"}</span>
        {change}
      </p>

      <p className={styles.comparison}>{comparison}</p>
    </div>
  );
}
