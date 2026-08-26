import { createContext } from "react";
import type { Notification } from "../types/notification";

type AppContextType = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);