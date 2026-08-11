import styles from "./Dashboard.module.css"
import Header from "../../components/Header/Header"

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Header />

      <section className={styles.metrics}>
        {/* today's sales */}
        {/* conversion */}
        {/* ATV */}
        {/* UPT */}
        {/* transactions */}
      </section>

      <section className={styles.overview}>
        {/* latest handover */}
        {/* today's tasks */}
        {/* yesterday summary */}
      </section>

      <section className={styles.bottomGrid}>
        {/* weekly sales chart */}
        {/* today's team */}
        {/* quick actions */}
      </section>
    </div>
  );
}