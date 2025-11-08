export const TodoStatus = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export type TodoStatus = typeof TodoStatus[keyof typeof TodoStatus];


export interface Todo {
  _id?: string;
  title: string;
  status: TodoStatus;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoFormData {
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