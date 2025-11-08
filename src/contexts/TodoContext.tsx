import { createContext, useContext, type ReactNode } from "react";
import {
  type ExistingTodo,
  type TodoStatus,
  type TodoFormData,
  type PaginationInfo,
  type PaginationParams,
} from "../types/todo";

import { useTodos } from "../hooks/useTodos";

interface TodoContextType {
  todos: ExistingTodo[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    progress: number;
  };
  pagination: PaginationInfo;
  addTodo: (title: string, description?: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<TodoFormData>) => Promise<void>;
  updateTodoStatus: (id: string, status: TodoStatus) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refetch: (params?: PaginationParams) => Promise<void>;
  changePage: (page: number) => Promise<void>;
  clearError: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const todoData = useTodos();

  return (
    <TodoContext.Provider value={todoData}>{children}</TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
