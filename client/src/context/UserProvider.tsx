import { useEffect, useState, type ReactNode } from "react";

import { getUsers } from "../services/usersService";
import type { UserData } from "../types/users";
import { UserContext } from "./UserContext";

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();
  
      setUsers(data);
      setCurrentUser(data[0] ?? null);
    }

    loadUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}