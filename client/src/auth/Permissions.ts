export type Permission =
  | "weeklySales.view"
  | "handover.view"
  | "tasks.view";

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  "store manager": [
    "weeklySales.view",
    "handover.view",
    "tasks.view",
  ],

  "assistant manager": [
    "weeklySales.view",
    "handover.view",
    "tasks.view",
  ],

  "supervisor": [
    "handover.view",
    "tasks.view",
  ],
};