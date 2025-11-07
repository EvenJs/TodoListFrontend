export const TaskStatus = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];


export interface Task {
  _id?: string;
  title: string;
  status: TaskStatus;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

export interface StatusConfig {
  label: string;
  color: string;
  icon: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}