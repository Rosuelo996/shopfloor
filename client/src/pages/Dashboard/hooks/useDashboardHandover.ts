import { useEffect, useState } from "react";

import {
  getLatestHandover,
  updateHandoverItemCompleted,
  updateHandoverAcknowledgement,
} from "../../../services/handoverService";

import type { LatestHandoverData } from "../../../types/handover";

import { useUsers } from "../../../hooks/useUsers";
import { useApp } from "../../../hooks/useApp";

export function useDashboardHandover() {
  const [handover, setHandover] = useState<LatestHandoverData | null>(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useUsers();
  const { selectedDate, refreshNotifications } = useApp();

  useEffect(() => {
    const loadHandover = async () => {
      try {
        setLoading(true);

        const handoverData = await getLatestHandover(selectedDate);

        setHandover(handoverData);
      } finally {
        setLoading(false);
      }
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

    await refreshNotifications();
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

    await refreshNotifications();
  }

  return {
    handover,
    loading,
    handleHandoverItemToggle,
    handleHandoverAcknowledgement,
  };
}