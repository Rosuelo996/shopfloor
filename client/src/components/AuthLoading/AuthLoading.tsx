import styles from "./AuthLoading.module.css";

export default function AuthLoading() {
  return (
    <main className={styles.loading}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <div className={styles.logo}>S</div>
          <span>ShopFloor</span>
        </div>

        <div className={styles.status}>
          <div className={styles.spinner} />
          <p>Switching workspace...</p>
        </div>
      </div>
    </main>
  );
}