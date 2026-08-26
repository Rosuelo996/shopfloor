import { useState } from "react";
import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { Notification } from "../types/notification";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [selectedDate, setSelectedDate] = useState("2026-08-31");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}