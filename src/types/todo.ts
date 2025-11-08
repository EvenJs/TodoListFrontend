export type TodoStatus = 'not_started' | 'in_progress' | 'completed';


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

export interface TodoStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  progress: number;
}

export interface TodosResponse {
  todos: Todo[];
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