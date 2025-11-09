export type TodoStatus = "not_started" | "in_progress" | "completed";

export interface NewTodo {
  title: string;
  status: TodoStatus;
  description: string;
}

export interface ExistingTodo extends NewTodo {
  _id: string;
  createdAt: string;
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

export interface TodoStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  progress: number;
}

export interface TodosResponse {
  todos: ExistingTodo[];
  totalPages: number;
  currentPage: number;
  total: number;
  stats: TodoStats;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  status?: TodoStatus;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface KanbanColumn {
  id: TodoStatus;
  title: string;
  color: string;
  todos: ExistingTodo[];
}
