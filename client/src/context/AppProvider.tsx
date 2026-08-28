import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import { getNotifications } from "../services/notificationService";
import type { Notification } from "../types/notification";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [selectedDate, setSelectedDate] = useState("2026-08-31");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const refreshNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };

    loadNotifications();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        notifications,
        refreshNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}