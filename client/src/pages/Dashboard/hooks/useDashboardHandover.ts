import { useEffect, useState } from "react";

import {
  getLatestHandover,
  updateHandoverItemCompleted,
  updateHandoverAcknowledgement,
} from "../../../services/handoverService";

import { getNotifications } from "../../../services/notificationService";

import type { LatestHandoverData } from "../../../types/handover";

import { useUsers } from "../../../hooks/useUsers";
import { useApp } from "../../../hooks/useApp";

export function useDashboardHandover() {
  const [handover, setHandover] = useState<LatestHandoverData | null>(null);

  const { currentUser } = useUsers();
  const { selectedDate, setNotifications } = useApp();

  useEffect(() => {
    const loadHandover = async () => {
      const handoverData = await getLatestHandover(selectedDate);

      setHandover(handoverData);
    };

    loadHandover();
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

    const notificationData = await getNotifications();
    setNotifications(notificationData);
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

    const notificationData = await getNotifications();
    setNotifications(notificationData);
  }

  return {
    handover,
    handleHandoverItemToggle,
    handleHandoverAcknowledgement,
  };
}