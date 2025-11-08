import { useState, useEffect } from "react";
import {
  type ExistingTodo,
  type TodoStatus,
  type TodoFormData,
  type PaginationInfo,
  type PaginationParams,
  type TodoStats,
} from "../types/todo";
import { TODO_STATUS } from "../constants/todo";
import { todoApiService } from "../services/api";

interface UseTodos {
  todos: ExistingTodo[];
  loading: boolean;
  error: string | null;
  stats: TodoStats;
  pagination: PaginationInfo;
  addTodo: (title: string, description?: string) => Promise<void>;
  updateTodoStatus: (id: string, status: TodoStatus) => Promise<void>;
  updateTodo: (id: string, updates: Partial<TodoFormData>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refetch: (params?: {
    status?: TodoStatus;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  changePage: (page: number) => Promise<void>;
  clearError: () => void;
}

export const useTodos = (): UseTodos => {
  const [todos, setTodos] = useState<ExistingTodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<TodoStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    progress: 0,
  });

  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [currentParams, setCurrentParams] = useState<PaginationParams>({
    page: 1,
    limit: 10,
  });

  const fetchTodos = async (params?: PaginationParams) => {
    try {
      setLoading(true);
      setError(null);

      const fetchParams = { ...currentParams, ...params };
      setCurrentParams(fetchParams);

      const response = await todoApiService.getTodos(fetchParams);

      // Map _id to id for frontend compatibility
      const todosWithId = response.todos.map((todo) => ({
        ...todo,
        id: todo._id,
      }));

      setTodos(todosWithId);
      setStats(response.stats);
      setPagination({
        page: response.currentPage,
        limit: fetchParams.limit || pagination.limit,
        total: response.total,
        totalPages: response.totalPages,
        hasNext: response.currentPage < response.totalPages,
        hasPrev: response.currentPage > 1,
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
  const changePage = async (page: number) => {
    await fetchTodos({ ...currentParams, page });
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
        status: TODO_STATUS.NOT_STARTED,
      });
      await fetchTodos(); // Refresh the list
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create todo";
      setError(errorMessage);
      throw err;
    }
  };

  const updateTodo = async (
    id: string,
    todoData: Partial<TodoFormData>
  ): Promise<void> => {
    try {
      await todoApiService.updateTodo(id, todoData);
      await fetchTodos(); // Refresh the list
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      throw new Error(errorMessage);
    }
  };

  const updateTodoStatus = async (
    id: string,
    status: TodoStatus
  ): Promise<void> => {
    try {
      setError(null);
      const updatedTodo = await todoApiService.updateTodoStatus(id, status);

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id
            ? { ...updatedTodo.todo, id: updatedTodo.todo._id }
            : todo
        )
      );
      setStats(updatedTodo.stats);
    } catch (err) {
      setError("Failed to update todo");
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApiService.deleteTodo(id);
      await fetchTodos(); // Refresh the list
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete todo";
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    stats,
    refetch: fetchTodos,
    addTodo,
    deleteTodo,
    updateTodoStatus,
    updateTodo,
    changePage,
    error,
    pagination,
    clearError: () => setError(null),
  };
};
