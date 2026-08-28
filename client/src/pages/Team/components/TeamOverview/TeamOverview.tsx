import styles from "./TeamOverview.module.css";
import Coverage from "./Coverage/Coverage";
import TeamToday from "./TeamToday/TeamToday";
import type { DailyShiftsData } from "../../../../types/team";

type Props = {
  dailyShifts: DailyShiftsData[];
};

export default function TeamOverview({ dailyShifts }: Props) {
  return (
    <div className={styles.overview}>

      <Coverage dailyShifts={dailyShifts} />

      <TeamToday dailyShifts={dailyShifts} />
      
    </div>
  );
}
