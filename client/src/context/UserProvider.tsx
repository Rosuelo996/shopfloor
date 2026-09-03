import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import { useAuth, useClerk, useSignIn } from "@clerk/react";

import { switchDemoUser } from "../services/authService";
import { getDemoUsers, getCurrentUser } from "../services/usersService";
import type { DemoUserData, CurrentUserData } from "../types/users";

export function UserProvider({ children }: { children: ReactNode }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();
  const { signIn } = useSignIn();

  const [demoUsers, setDemoUsers] = useState<DemoUserData[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUserData | null>(null);

  useEffect(() => {
    async function loadDemoUsers() {
      const data = await getDemoUsers();

      setDemoUsers(data);
    }

    loadDemoUsers();
  }, []);

  useEffect(() => {
    async function loadCurrentUser() {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn) {
        setCurrentUser(null);
        return;
      }

      const token = await getToken();

      if (!token) {
        return;
      }

      const user = await getCurrentUser(token);

      setCurrentUser(user);
    }

    loadCurrentUser();
  }, [getToken, isLoaded, isSignedIn]);

  async function handleUserSwitch(userId: number) {
    const token = await getToken();

    if (!token) {
      return;
    }

    const demoSignInToken = await switchDemoUser(userId, token);

    await clerk.signOut({
      redirectUrl: window.location.pathname,
    });
    const { error } = await signIn.ticket({
      ticket: demoSignInToken,
    });

    if (error) {
      throw error;
    }

    if (signIn.status !== "complete") {
      throw new Error("Demo user switch could not be completed");
    }

    const { error: finalizeError } = await signIn.finalize();

    if (finalizeError) {
      throw finalizeError;
    }
  }

  return (
    <UserContext.Provider value={{ demoUsers, currentUser, handleUserSwitch }}>
      {children}
    </UserContext.Provider>
  );
}
