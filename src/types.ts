export const TASK_STATUS = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];


export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}