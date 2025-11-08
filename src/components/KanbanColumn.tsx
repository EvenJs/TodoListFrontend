import { motion } from "framer-motion";
import { type ExistingTodo, type TodoStatus } from "../types/todo";
import KanbanCard from "./KanbanCard";
import { KANBAN_COLUMNS, TODO_STATUS } from "../constants/todo";

interface KanbanColumnProps {
  status: TodoStatus;
  todos: ExistingTodo[];
  onEdit: (todo: ExistingTodo) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onCreateTodo?: (status: TodoStatus) => void;
}

const KanbanColumn = ({
  status,
  todos,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateTodo,
}: KanbanColumnProps) => {
  const columnConfig = KANBAN_COLUMNS[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 min-w-80 bg-gray-50 rounded-xl border border-gray-200"
    >
      {/* Column Header */}
      <div
        className={`p-4 border-b ${columnConfig.borderColor} ${columnConfig.bgColor} rounded-t-xl`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${columnConfig.color}`} />
            <h3 className="font-semibold text-gray-900">
              {columnConfig.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Column Content */}
      <div className="p-3 space-y-3 min-h-96 max-h-[calc(100vh-300px)] overflow-y-auto">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">📝</div>
            <p className="text-sm">No tasks</p>
            {onCreateTodo && status !== TODO_STATUS.COMPLETED && (
              <button
                onClick={() => onCreateTodo(status)}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline"
              >
                Add a task
              </button>
            )}
          </div>
        ) : (
          todos.map((todo) => (
            <KanbanCard
              key={todo._id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default KanbanColumn;
