import { useState, useEffect } from "react";
import {
  type Task,
  TaskStatus,
  type TaskFormData,
  type PaginationInfo,
} from "../types/todo";
import { todoApiService } from "../services/api";

interface UseTodosReturn {
  todos: Task[];
  loading: boolean;
  error: string | null;
  addTodo: (title: string, description?: string) => void;
  updateTodoStatus: (id: string, status: TaskStatus) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<TaskFormData>) => void;
  refetch: (params?: {
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  clearError: () => void;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchTodos = async (params?: {
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await todoApiService.getTodos(params);

      // Map _id to id for frontend compatibility
      const todosWithId = response.todos.map((todo) => ({
        ...todo,
        id: todo._id,
      }));

      setTodos(todosWithId);
      setPagination({
        page: response.currentPage,
        limit: params?.limit || pagination.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch todos";
      setError(errorMessage);
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };
  const addTodo = async (
    title: string,
    description: string = ""
  ): Promise<void> => {
    try {
      setError(null);
      await todoApiService.createTodo({
        title,
        description,
        status: TaskStatus.NOT_STARTED,
      });
      await fetchTodos(); // Refresh the list
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create todo";
      setError(errorMessage);
      throw err;
    }
  };

  // Load initial mock data
  useEffect(() => {
    fetchTodos();
  }, []);

  const updateTodoStatus = (id: string, status: TaskStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? { ...todo, status, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const updateTodo = (id: string, updates: Partial<TaskFormData>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodoStatus,
    deleteTodo,
    updateTodo,
  };
};
