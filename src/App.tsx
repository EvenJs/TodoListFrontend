import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Sparkles } from "lucide-react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoStats from "./components/TodoStats";
import TodoFilter from "./components/TodoFilter";
import type { TaskFormData, TaskStatus } from "./types/todo";

function App() {
  const {
    todos,
    loading,
    addTodo,
    deleteTodo,
    updateTodo,
    updateTodoStatus,
    refetch,
  } = useTodos();
  const [filter, setFilter] = useState<string>("all");

  const filteredTodos = useMemo(() => {
    if (filter === "all") return todos;
    return todos.filter((todo) => todo.status === filter);
  }, [todos, filter]);

  const handleAddTodo = (title: string, description: string) => {
    addTodo(title, description);
  };

  const handleStatusUpdate = (id: string, status: TaskStatus) => {
    updateTodoStatus(id, status);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = (id: string, updates: Partial<TaskFormData>) => {
    updateTodo(id, updates);
  };

  const handleFilterChange = async (newFilter: string) => {
    setFilter(newFilter);
    const params =
      newFilter === "all" ? {} : { status: newFilter as TaskStatus };
    await refetch(params);
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            Simple and efficient task management app to boost your productivity.
          </p>
        </motion.header>

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Todo Form */}
          <TodoForm onSubmit={handleAddTodo} />

          {/* Filters */}

          <TodoFilter filter={filter} onFilterChange={handleFilterChange} />

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
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-white/20"
        >
          Footer for Todoist App - Made with ❤️ by Yuhang Wang
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
