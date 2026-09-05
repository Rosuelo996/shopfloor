import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";
import { useApp } from "../../../hooks/useApp";
import { useUsers } from "../../../hooks/useUsers";

import {
  getDailyShifts,
  getWeeklyShifts,
  getAvailability,
} from "../../../services/teamService";

import type {
  DailyShiftsData,
  WeeklyShiftsData,
  AvailabilityData,
} from "../../../types/team";

export function useTeam() {
  const { selectedDate } = useApp();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { currentUser } = useUsers();

  const [dailyShifts, setDailyShifts] = useState<DailyShiftsData[]>([]);
  const [weeklyShifts, setWeeklyShifts] = useState<WeeklyShiftsData | null>(
    null,
  );
  const [teamAvailability, setTeamAvailability] = useState<AvailabilityData[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !currentUser) return;

    const loadTeam = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getToken();

        if (!token) {
          throw new Error("Authentication token unavailable");
        }

        const availabilityPromise =
          currentUser.employeeId != null
            ? getAvailability(token)
            : Promise.resolve<AvailabilityData[]>([]);

        const [dailyShiftsData, weeklyShiftsData, availabilityData] =
          await Promise.all([
            getDailyShifts(selectedDate),
            getWeeklyShifts(selectedDate),
            availabilityPromise,
          ]);

        setDailyShifts(dailyShiftsData);
        setWeeklyShifts(weeklyShiftsData);
        setTeamAvailability(availabilityData);
      } catch (error) {
        console.error("Failed to load team data:", error);
        setError("Unable to load team data.");
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, [
    selectedDate,
    isLoaded,
    isSignedIn,
    getToken,
    currentUser,
  ]);

  return {
    dailyShifts,
    weeklyShifts,
    teamAvailability,
    loading,
    error,
  };
}