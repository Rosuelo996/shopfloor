import styles from "./TeamOverview.module.css";
import Coverage from "./Coverage/Coverage";
import TeamToday from "./TeamToday/TeamToday";
import type { DailyShiftsData } from "../../../../types/team";

type Props = {
  dailyShifts: DailyShiftsData[];
  loading: boolean;
};

export default function TeamOverview({ dailyShifts, loading }: Props) {
  return (
    <div className={styles.overview}>

      <Coverage dailyShifts={dailyShifts} loading={loading}/>

      <TeamToday dailyShifts={dailyShifts} loading={loading} />
      
    </div>
  );
}
