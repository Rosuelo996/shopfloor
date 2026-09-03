export type DemoUserData = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  isDemo: boolean;
};

export type CurrentUserData = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  clerkUserId: string;
  isDemo: boolean;
};
