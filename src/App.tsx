import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckSquare,
  Sparkles,
  X,
  List,
  Kanban as KanbanIcon,
} from "lucide-react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoStats from "./components/TodoStats";
import ListView from "./components/ListView";
import KanbanView from "./components/KanbanView";
import type { PaginationParams, TodoFormData, TodoStatus } from "./types/todo";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const {
    todos,
    loading,
    error,
    stats,
    pagination,
    addTodo,
    deleteTodo,
    updateTodo,
    updateTodoStatus,
    refetch,
    changePage,
    clearError,
  } = useTodos();
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<"list" | "kanban">("list");

  const filteredTodos = useMemo(() => {
    if (filter === "all") return todos;
    return todos.filter((todo) => todo.status === filter);
  }, [todos, filter]);

  const handleAddTodo = (title: string, description: string) => {
    addTodo(title, description);
  };

  const handleStatusUpdate = (id: string, status: TodoStatus) => {
    updateTodoStatus(id, status);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = (id: string, updates: Partial<TodoFormData>) => {
    updateTodo(id, updates);
  };

  const handleFilterChange = async (newFilter: string) => {
    setFilter(newFilter);
    const params: PaginationParams = {
      page: 1, // Reset to first page when changing filter
      status: newFilter === "all" ? undefined : (newFilter as TodoStatus),
    };
    await refetch(params);
  };

  const handlePageChange = async (page: number) => {
    await changePage(page);
  };

  if (loading && todos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <CheckSquare className="w-10 h-10 text-blue-600" />
                <Sparkles className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Todoist
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple and efficient task management app to boost your
              productivity.
            </p>
          </motion.header>

          {/* Stats */}
          <TodoStats stats={stats} />

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Todo Form */}
            <TodoForm onSubmit={handleAddTodo} loading={loading} />

            {/* View Switcher */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {view === "list" ? "Task List" : "Kanban Board"}
                </h2>

                {/* View Switcher */}
                <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-md transition-colors ${
                      view === "list"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("kanban")}
                    className={`p-2 rounded-md transition-colors ${
                      view === "kanban"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Kanban View"
                  >
                    <KanbanIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* View Content */}
            {view === "list" ? (
              <ListView
                todos={todos}
                filteredTodos={filteredTodos}
                filter={filter}
                pagination={pagination}
                loading={loading}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onStatusUpdate={handleStatusUpdate}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
              />
            ) : (
              <KanbanView
                todos={todos}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onStatusChange={handleStatusUpdate}
                onCreateTodo={handleAddTodo}
                loading={loading}
              />
            )}
          </motion.main>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600">
              Todoist App - Made with ❤️ by Yuhang Wang
            </p>
          </motion.footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
