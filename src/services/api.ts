
import { type Task, TaskStatus, type TaskFormData } from '../types/todo';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

class ApiError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
// Environment-based API configuration
const getApiBaseUrl = (): string => {
  // In development, use proxy or direct URL
  if (import.meta.env.DEV) {
    return '/api'; // Use Vite proxy in development
  }

  // In production, use relative path or environment variable
  return import.meta.env.VITE_API_BASE_URL || '/api';
};
const API_BASE_URL = getApiBaseUrl();

// API service class
class TodoApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, 'Network error occurred');
    }
  }

  // Get all todos with optional filtering and pagination
  async getTodos(params?: { status?: TaskStatus; page?: number; limit?: number }): Promise<{
    todos: Task[];
    totalPages: number;
    currentPage: number;
    total: number;
  }> {
    const queryParams = new URLSearchParams();

    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  // Create new todo
  async createTodo(todoData: Omit<Task, 'createdAt' | 'updatedAt'>): Promise<Task> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  }
  async updateTodo(id: string, updates: Partial<TaskFormData>): Promise<Task> {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
  async updateTodoStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.request(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }


  // Delete todo
  async deleteTodo(id: string): Promise<{ message: string }> {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

}


export const todoApiService = new TodoApiService();