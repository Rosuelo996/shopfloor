import { useState, useEffect } from "react";
import { useApp } from "../../../hooks/useApp";

import {
  getWeeklyShifts,
  getAvailability,
} from "../../../services/teamService";
import type { AvailabilityData, WeeklyShiftsData } from "../../../types/team";

export function useTeam() {
  const { selectedDate } = useApp();
  const [teamAvailability, setTeamAvailability] = useState<AvailabilityData[]>(
    [],
  );
  const [weeklyShifts, setWeeklyShifts] = useState<WeeklyShiftsData | null>(null);

  useEffect(() => {
    const loadTeam = async () => {
      const weeklyShiftsData = await getWeeklyShifts(selectedDate);
      const availabilityData = await getAvailability();

      setWeeklyShifts(weeklyShiftsData);
      setTeamAvailability(availabilityData);
    };

    loadTeam();
  }, [selectedDate]);

  return {
    weeklyShifts,
    teamAvailability,
  };
}
