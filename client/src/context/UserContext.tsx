import { createContext } from "react";
import type { DemoUserData, CurrentUserData } from "../types/users";

type UserContextType = {
  demoUsers: DemoUserData[];
  currentUser: CurrentUserData | null;
  handleUserSwitch: (userId: number) => Promise<void>;
};

export const UserContext =
  createContext<UserContextType | undefined>(undefined);