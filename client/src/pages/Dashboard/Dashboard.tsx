import styles from "./Dashboard.module.css";

import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import YesterdaySummary from "./components/YesterdaySummary/YesterdaySummary";
import LatestHandover from "./components/LatestHandover/LatestHandover";
import TodayTasks from "./components/TodayTasks/TodayTasks";

import { useDashboard } from "./hooks/useDashboard";
import WeeklySales from "./components/WeeklySales/WeeklySales";
import TodayTeam from "./components/TodayTeam/TodayTeam";
import WeeklyNewsletter from "./components/WeeklyNewsletter/WeeklyNewsletter";

export default function Dashboard() {
  const {
    dashboard,
    yesterday,
    handover,
    tasks,
    weeklySales,
    selectedDate,
    shifts,
    newsletter,
    notifications,
    setSelectedDate,
    handleHandoverItemToggle,
    handleHandoverAcknowledgement,
    handleTaskStatusToggle,
  } = useDashboard();

  return (
    <div className={styles.dashboard}>
      <Header date={selectedDate} onDateChange={setSelectedDate} notifications={notifications} />

      <Metrics dashboard={dashboard} />

      <section className={styles.overview}>
        <LatestHandover
          handover={handover}
          onToggleCompleted={handleHandoverItemToggle}
          onHandoverAcknowledge={handleHandoverAcknowledgement}
        />

        <TodayTasks tasks={tasks} onTaskStatusToggle={handleTaskStatusToggle} />

        <YesterdaySummary yesterday={yesterday} />
      </section>

      <section className={styles.bottomGrid}>
        <WeeklySales weeklySales={weeklySales} />
        <TodayTeam shifts={shifts} />
        <WeeklyNewsletter newsletter={newsletter}/>
      </section>
    </div>
  );
}
