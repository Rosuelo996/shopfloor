import { useEffect, useState } from "react";

import {
  getDashboard,
  getYesterdaySummary,
} from "../../../services/dashboardService";

import {
  getLatestHandover,
  updateHandoverItemCompleted,
} from "../../../services/handoverService";

import {
  getTasksByDate,
  updateTaskStatus,
} from "../../../services/tasksService";

import type {
  DashboardData,
  YesterdaySummaryData,
} from "../../../types/dashboard";

import type { LatestHandoverData } from "../../../types/handover";
import type { TaskData } from "../../../types/tasks";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);
  const [handover, setHandover] = useState<LatestHandoverData | null>(null);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-08-31");

  useEffect(() => {
    const loadDashboard = async () => {
      const dashboardData = await getDashboard(selectedDate);
      const yesterdayData = await getYesterdaySummary(selectedDate);
      const handoverData = await getLatestHandover(selectedDate);
      const tasksData = await getTasksByDate(selectedDate);

      setDashboard(dashboardData);
      setYesterday(yesterdayData);
      setHandover(handoverData);
      setTasks(tasksData);
    };

    loadDashboard();
  }, [selectedDate]);

  async function handleHandoverItemToggle(
    id: number,
    completed: boolean,
  ) {
    const updatedItem = await updateHandoverItemCompleted(id, !completed);

    setHandover((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id
            ? { ...item, completed: updatedItem.completed }
            : item,
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
        task.id === id
          ? { ...task, status: updatedTaskStatus.status }
          : task,
      );
    });
  }

  return {
    dashboard,
    yesterday,
    handover,
    tasks,
    selectedDate,
    setSelectedDate,
    handleHandoverItemToggle,
    handleTaskStatusToggle,
  };
}