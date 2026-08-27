import styles from "./Dashboard.module.css";

import { useDashboard } from "./hooks/useDashboard";
import { useDashboardTasks } from "./hooks/useDashboardTasks";
import { useDashboardHandover } from "./hooks/useDashboardHandover";

import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import YesterdaySummary from "./components/YesterdaySummary/YesterdaySummary";
import LatestHandover from "./components/LatestHandover/LatestHandover";
import TodayTasks from "./components/TodayTasks/TodayTasks";

import WeeklySales from "./components/WeeklySales/WeeklySales";
import TodayTeam from "./components/TodayTeam/TodayTeam";
import WeeklyNewsletter from "./components/WeeklyNewsletter/WeeklyNewsletter";

export default function Dashboard() {
  const {
    dashboard,
    yesterday,
    weeklySales,
    shifts,
    newsletter,
    loading,
    error,
  } = useDashboard();

  const {
    tasks,
    handleTaskStatusToggle,
  } = useDashboardTasks();

  const {
    handover,
    handleHandoverItemToggle,
    handleHandoverAcknowledgement,
  } = useDashboardHandover();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.dashboard}>
      <Header />

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
        <WeeklyNewsletter newsletter={newsletter} />
      </section>
    </div>
  );
}
