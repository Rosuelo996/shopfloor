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

  useEffect(() => {
    const loadTeam = async () => {
      const [dailyShiftsData, weeklyShiftsData, availabilityData] =
        await Promise.all([
          getDailyShifts(selectedDate),
          getWeeklyShifts(selectedDate),
          getAvailability(),
        ]);

      setDailyShifts(dailyShiftsData);
      setWeeklyShifts(weeklyShiftsData);
      setTeamAvailability(availabilityData);
    };

    loadTeam();
  }, [selectedDate]);

  return {
    dailyShifts,
    weeklyShifts,
    teamAvailability,
  };
}
