import { useEffect, useState } from "react";

import {
  getDashboard,
  getYesterdaySummary,
  getWeeklySales,
} from "../../../services/dashboardService";

import {
  getLatestHandover,
  updateHandoverItemCompleted,
  updateHandoverAcknowledgement,
} from "../../../services/handoverService";

import {
  getTasksByDate,
  updateTaskStatus,
} from "../../../services/tasksService";

import { getShifts } from "../../../services/teamService";

import { getNewsletter } from "../../../services/newsletterService";

import type {
  DashboardData,
  YesterdaySummaryData,
  WeeklySalesData,
} from "../../../types/dashboard";

import type { LatestHandoverData } from "../../../types/handover";
import type { TaskData } from "../../../types/tasks";
import type { ShiftsData } from "../../../types/team";
import type { NewsletterData } from "../../../types/newsletter";
import { useUsers } from "../../../hooks/useUsers";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [yesterday, setYesterday] = useState<YesterdaySummaryData | null>(null);
  const [handover, setHandover] = useState<LatestHandoverData | null>(null);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);
  const [weeklySales, setWeeklySales] = useState<WeeklySalesData[]>([]);
  const [shifts, setShifts] = useState<ShiftsData[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterData | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-08-31");

  const { currentUser } = useUsers();

  useEffect(() => {
    const loadDashboard = async () => {
      const dashboardData = await getDashboard(selectedDate);
      const yesterdayData = await getYesterdaySummary(selectedDate);
      const handoverData = await getLatestHandover(selectedDate);
      const tasksData = await getTasksByDate(selectedDate);
      const weeklySalesData = await getWeeklySales(selectedDate);
      const shiftsData = await getShifts(selectedDate);
      const newsletterData = await getNewsletter(selectedDate);

      setDashboard(dashboardData);
      setYesterday(yesterdayData);
      setHandover(handoverData);
      setTasks(tasksData);
      setWeeklySales(weeklySalesData);
      setShifts(shiftsData);
      setNewsletter(newsletterData);
    };

    loadDashboard();
  }, [selectedDate]);

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

  async function handleHandoverAcknowledgement() {
    if (!handover || !currentUser) return;

    const acknowledgedHandover = await updateHandoverAcknowledgement(
      handover.id,
      currentUser.id,
      !handover.acknowledged,
    );

    setHandover((prev) =>
      prev
        ? {
            ...prev,
            acknowledged: acknowledgedHandover.acknowledged,
          }
        : null,
    );
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

  return {
    dashboard,
    yesterday,
    handover,
    tasks,
    weeklySales,
    selectedDate,
    shifts,
    newsletter,
    setSelectedDate,
    handleHandoverItemToggle,
    handleHandoverAcknowledgement,
    handleTaskStatusToggle,
  };
}
