import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./DemoLogin.module.css";

type Props = {
  onDemoLogin: () => void;
  error?: string;
  loading: boolean;
};

export default function DemoLogin({ onDemoLogin, error, loading }: Props) {
  return (
    <>
      <button
        type="button"
        className={styles.demo}
        onClick={onDemoLogin}
        disabled={loading}
      >
        {loading ? (
          <span className={styles.spinner} aria-label="Loading demo" />
        ) : (
          <>
            Explore Demo
            <FontAwesomeIcon icon={faArrowRight} />
          </>
        )}
      </button>

      {error && <span className={styles.error}>{error}</span>}

      <p className={styles.demoNote}>No account required.</p>
    </>
  );
}
