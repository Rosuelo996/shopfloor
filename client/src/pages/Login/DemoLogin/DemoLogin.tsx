import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./DemoLogin.module.css";

type Props = {
  onDemoLogin: () => void;
  error?: string;
};

export default function DemoLogin({ onDemoLogin, error }: Props) {
  return (
    <>
      <button
        type="button"
        className={styles.demo}
        onClick={onDemoLogin}
      >
        Explore Demo
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {error && <span className={styles.error}>{error}</span>}

      <p className={styles.demoNote}>No account required.</p>
    </>
  );
}