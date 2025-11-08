import { useMemo } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckSquare, Sparkles, X } from "lucide-react";
import { TodoProvider, useTodoContext } from "./contexts/TodoContext";
import { ViewProvider, useViewContext } from "./contexts/ViewContext";
import { TodoForm, TodoStats, ListView, KanbanView } from "./components";

import ErrorBoundary from "./components/ErrorBoundary";
import ViewSwitcher from "./components/ViewSwitcher";

const AppContent = () => {
  const { todos, loading, error, stats, pagination, clearError } =
    useTodoContext();
  const { view, filter, setFilter } = useViewContext();

  const filteredTodos = useMemo(() => {
    if (filter === "all") return todos;
    return todos.filter((todo) => todo.status === filter);
  }, [todos, filter]);

  if (loading && todos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-50">
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 py-8 px-4">
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
            <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Todoist
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple and efficient task management app to boost your productivity.
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
          <ViewSwitcher />
          <TodoForm />

          {/* View Content */}
          {view === "list" ? (
            <ListView
              filteredTodos={filteredTodos}
              filter={filter}
              pagination={pagination}
              loading={loading}
              onFilterChange={setFilter}
            />
          ) : (
            <KanbanView loading={loading} />
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
  );
};

function App() {
  return (
    <ErrorBoundary>
      <TodoProvider>
        <ViewProvider>
          <AppContent />
        </ViewProvider>
      </TodoProvider>
    </ErrorBoundary>
  );
}

export default App;
