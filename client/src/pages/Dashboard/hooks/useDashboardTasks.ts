import { useEffect, useState } from "react";

import {
  getTasksByDate,
  updateTaskStatus,
} from "../../../services/tasksService";

import { getNotifications } from "../../../services/notificationService";

import type { TaskData } from "../../../types/tasks";

import { useApp } from "../../../hooks/useApp";

export function useDashboardTasks() {
  const [tasks, setTasks] = useState<TaskData[] | null>(null);

  const { selectedDate, setNotifications } = useApp();

  useEffect(() => {
    const loadTasks = async () => {
      const tasksData = await getTasksByDate(selectedDate);

      setTasks(tasksData);
    };

    loadTasks();
  }, [selectedDate]);

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

    const notificationData = await getNotifications();
    setNotifications(notificationData);
  }

  return {
    tasks,
    handleTaskStatusToggle,
  };
}