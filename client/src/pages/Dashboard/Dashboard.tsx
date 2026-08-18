import styles from "./Dashboard.module.css";

import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import YesterdaySummary from "./components/YesterdaySummary/YesterdaySummary";
import LatestHandover from "./components/LatestHandover/LatestHandover";
import TodayTasks from "./components/TodayTasks/TodayTasks";

import { useDashboard } from "./hooks/useDashboard";

export default function Dashboard() {
  const {
    dashboard,
    yesterday,
    handover,
    tasks,
    selectedDate,
    setSelectedDate,  
    handleHandoverItemToggle,
    handleTaskStatusToggle,
  } = useDashboard();


  return (
    <div className={styles.dashboard}>
      <Header date={selectedDate} onDateChange={setSelectedDate}/>
 
      <Metrics dashboard={dashboard} />

      <section className={styles.overview}>
        <LatestHandover
          handover={handover}
          onToggleCompleted={handleHandoverItemToggle}
        />

        <TodayTasks
          tasks={tasks}
          onTaskStatusToggle={handleTaskStatusToggle}
        />

        <YesterdaySummary yesterday={yesterday} />
      </section>

      <section className={styles.bottomGrid}>
        {/* weekly sales chart */}
        {/* today's team */}
        {/* quick actions */}
      </section>
    </div>
  );
}