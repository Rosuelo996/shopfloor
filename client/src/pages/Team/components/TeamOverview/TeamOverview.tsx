import Coverage from "./Coverage/Coverage";
import styles from "./TeamOverview.module.css";
import TeamToday from "./TeamToday/TeamToday";

export default function TeamOverview() {
  return (
    <div className={styles.overview}>

      <Coverage />

      <TeamToday />

    </div>
  );
}