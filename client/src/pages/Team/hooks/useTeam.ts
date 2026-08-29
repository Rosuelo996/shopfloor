import { useState, useEffect } from "react";
import { useApp } from "../../../hooks/useApp";

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
    const loadTeam = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dailyShiftsData, weeklyShiftsData, availabilityData] =
          await Promise.all([
            getDailyShifts(selectedDate),
            getWeeklyShifts(selectedDate),
            getAvailability(),
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
  }, [selectedDate]);

  return {
    dailyShifts,
    weeklyShifts,
    teamAvailability,
    loading,
    error,
  };
}