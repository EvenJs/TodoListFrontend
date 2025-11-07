import { useState, useEffect } from "react";
import { initialTodos } from "../data/mockData";
import { type Task, TaskStatus, type TaskFormData } from "../types/todo";

interface UseTodosReturn {
  todos: Task[];
  loading: boolean;
  addTodo: (title: string, description?: string) => void;
  updateTodoStatus: (id: string, status: TaskStatus) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<TaskFormData>) => void;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTodos(initialTodos);
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  const addTodo = (title: string, description: string = "") => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      status: TaskStatus.NOT_STARTED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  };

  const updateTodoStatus = (id, status) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? { ...todo, status, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const updateTodo = (id, updates) => {
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
