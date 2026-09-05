import { createContext } from "react";
import type { Permission } from "../auth/Permissions";
import type { DemoUserData, CurrentUserData } from "../types/users";

type UserContextType = {
  demoUsers: DemoUserData[];
  currentUser: CurrentUserData | null;
  handleUserSwitch: (userId: number) => Promise<void>;
  handleLogout: () => Promise<void>;
  can: (permission: Permission) => boolean;
};

export const UserContext =
  createContext<UserContextType | undefined>(undefined);