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
import { useUsers } from "../../hooks/useUsers";

export default function Dashboard() {
  const {
    dashboard,
    yesterday,
    weeklySales,
    dailyShifts,
    newsletter,
    loading: dashboardLoading,
    error,
  } = useDashboard();

  const {
    tasks,
    handleTaskStatusToggle,
    loading: tasksLoading,
  } = useDashboardTasks();

  const {
    handover,
    handleHandoverItemToggle,
    handleHandoverAcknowledgement,
    loading: handoverLoading,
  } = useDashboardHandover();

  const { can } = useUsers();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.dashboard}>
      <Header />

      <Metrics dashboard={dashboard} loading={dashboardLoading} />

      <section className={styles.overview}>
        {can("handover.view") && (
        <LatestHandover
          handover={handover}
          onToggleCompleted={handleHandoverItemToggle}
          onHandoverAcknowledge={handleHandoverAcknowledgement}
          loading={handoverLoading}
        />
        )}

        {can("tasks.view") && (
        <TodayTasks
          tasks={tasks}
          onTaskStatusToggle={handleTaskStatusToggle}
          loading={tasksLoading}
        />
        )}

        <YesterdaySummary yesterday={yesterday} loading={dashboardLoading} />
      </section>

      <section className={styles.bottomGrid}>
        {can("weeklySales.view") && (
          <WeeklySales weeklySales={weeklySales} loading={dashboardLoading} />
        )}
        <TodayTeam dailyShifts={dailyShifts} loading={dashboardLoading} />
        <WeeklyNewsletter newsletter={newsletter} loading={dashboardLoading} />
      </section>
    </div>
  );
}
