export type DailyShiftsData = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    startTime: string | null;
    endTime: string | null;
}

export type WeeklyShiftsData = {
  weekStart: string;
  weekEnd: string;
  previousWeek: string;
  nextWeek: string;
  weekDays: string[];
  team: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    shifts: {
      date: string;
      startTime: string;
      endTime: string;
    }[];
  }[];
};

export type AvailabilityData = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  employmentType: string;
  availability: {
    id: number;
    day: string;
    isAvailable: boolean;
    reason: string | null;
  }[];
};