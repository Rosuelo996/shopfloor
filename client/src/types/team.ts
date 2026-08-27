export type ShiftsData = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    startTime: string;
    endTime: string;
}


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