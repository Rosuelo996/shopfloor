import { createContext } from "react";
import type { UserData } from "../types/users";

type UserContextType = {
  users: UserData[];
  currentUser: UserData | null;
  setCurrentUser: (user: UserData) => void;
};

export const UserContext =
  createContext<UserContextType | undefined>(undefined);