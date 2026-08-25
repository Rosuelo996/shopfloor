export type TaskNotification = {
  taskId: number;
  type: "task";
  title: string;
  startTime: string;
};

export type FollowUpNotification = {
  followUpId: number;
  type: "follow_up";
  content: string;
  createdAt: string;
};

export type AcknowledgeNotification = {
  handoverId: number;
  type: "acknowledgement";
  createdAt: string;
};

export type Notification =
  | TaskNotification
  | FollowUpNotification
  | AcknowledgeNotification;
