import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckSquare, Sparkles, X } from "lucide-react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoStats from "./components/TodoStats";
import TodoFilter from "./components/TodoFilter";
import type { PaginationParams, TodoFormData, TodoStatus } from "./types/todo";
import ErrorBoundary from "./components/ErrorBoundary";
import Pagination from "./components/Pagination";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
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
                <CheckSquare className="w-10 h-10 text-primary-600" />
                <Sparkles className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">
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

            {/* Filters */}
            <TodoFilter
              filter={filter}
              onFilterChange={handleFilterChange}
              loading={loading}
            />

            {/* Todo List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {filteredTodos.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {filter === "all" ? "No tasks yet!" : "No tasks found"}
                  </h3>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    {filter === "all"
                      ? "Get started by creating your first task above!"
                      : "No tasks match your current filter. Try changing the filter or create a new task."}
                  </p>
                </motion.div>
              )}
            </div>
            {/* Pagination */}
            {!loading && pagination.total > 0 && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                // onLimitChange={handleLimitChange}
                loading={loading}
              />
            )}
          </motion.main>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pt-8 border-t border-white/20"
          >
            Footer for Todoist App - Made by Yuhang Wang
          </motion.footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
