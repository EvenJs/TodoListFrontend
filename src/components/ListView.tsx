import { motion, AnimatePresence } from "framer-motion";
import {
  type ExistingTodo,
  type TodoFormData,
  type TodoStatus,
  type PaginationInfo,
} from "../types/todo";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import Pagination from "./Pagination";

interface ListViewProps {
  todos: ExistingTodo[];
  filteredTodos: ExistingTodo[];
  filter: string;
  pagination: PaginationInfo;
  loading: boolean;
  onUpdate: (id: string, updates: Partial<TodoFormData>) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: TodoStatus) => void;
  onFilterChange: (filter: string) => void;
  onPageChange: (page: number) => void;
}

const ListView = ({
  todos,
  filteredTodos,
  filter,
  pagination,
  loading,
  onUpdate,
  onDelete,
  onStatusUpdate,
  onFilterChange,
  onPageChange,
}: ListViewProps) => {
  return (
    <>
      {/* Filters */}
      {todos.length > 0 && (
        <TodoFilter
          filter={filter}
          onFilterChange={onFilterChange}
          loading={loading}
        />
      )}

      {/* Todo List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onStatusUpdate={onStatusUpdate}
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
          onPageChange={onPageChange}
          loading={loading}
        />
      )}
    </>
  );
};

export default ListView;
