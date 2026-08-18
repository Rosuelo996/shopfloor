export type LatestHandoverData = {
  id: number;

  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };

  createdAt: string;
  acknowledged: boolean;

  items: {
    id: number;
    content: string;
    priority: "high" | "medium" | "low";
    completed: boolean;
  }[];
};

