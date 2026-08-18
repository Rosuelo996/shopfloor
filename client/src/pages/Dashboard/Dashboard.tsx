import styles from "./Dashboard.module.css";
import Header from "../../components/Header/Header";
import Metrics from "./components/Metrics/Metrics";
import YesterdaySummary from "./components/YesterdaySummary/YesterdaySummary";
import LatestHandover from "./components/LatestHandover/LatestHandover";
import TodayTasks from "./components/TodayTasks/TodayTasks";

import {
  getDashboard,
  getYesterdaySummary,
} from "../../services/dashboardService";
import {
  getLatestHandover,
  updateHandoverItemCompleted,
} from "../../services/handoverService";
import { getTasksByDate, updateTaskStatus } from "../../services/tasksService";

import type {
  DashboardData,
  YesterdaySummaryData,
} from "../../types/dashboard";
import type { LatestHandoverData } from "../../types/handover";
import type { TaskData } from "../../types/tasks";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);
  const [handover, setHandover] = useState<LatestHandoverData | null>(null);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const dashboardData = await getDashboard();
      const yesterdayData = await getYesterdaySummary();
      const handoverData = await getLatestHandover();
      const tasksData = await getTasksByDate();

      setDashboard(dashboardData);
      setYesterday(yesterdayData);
      setHandover(handoverData);
      setTasks(tasksData);
    };

    loadDashboard();
  }, []);

  async function handleHandoverItemToggle(id: number, completed: boolean) {
    const updatedItem = await updateHandoverItemCompleted(id, !completed);

    setHandover((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, completed: updatedItem.completed } : item,
        ),
      };
    });
  }

  async function handleTaskStatusToggle(
    id: number,
    status: "pending" | "completed",
  ) {
    const newStatus = status === "pending" ? "completed" : "pending";
    const updatedTaskStatus = await updateTaskStatus(id, newStatus);

    setTasks((prev) => {
      if (!prev) return prev;

      return prev.map((task) =>
        task.id === id ? { ...task, status: updatedTaskStatus.status } : task,
      );
    });
  }

  return (
    <div className={styles.dashboard}>
      <Header date={dashboard?.date ?? ""} />

      <Metrics dashboard={dashboard} />

      <section className={styles.overview}>
        <LatestHandover
          handover={handover}
          onToggleCompleted={handleHandoverItemToggle}
        />
        <TodayTasks tasks={tasks} onTaskStatusToggle={handleTaskStatusToggle} />
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
