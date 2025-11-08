import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, MoreVertical } from "lucide-react";
import { type ExistingTodo, type TodoStatus } from "../types/todo";
import { KANBAN_COLUMNS, TODO_STATUS } from "../constants/todo";

interface KanbanCardProps {
  todo: ExistingTodo;
  onEdit: (todo: ExistingTodo) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  isDragging?: boolean;
}

const KanbanCard = ({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
}: KanbanCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case TODO_STATUS.NOT_STARTED:
        return "border-l-amber-500";
      case TODO_STATUS.IN_PROGRESS:
        return "border-l-blue-500";
      case TODO_STATUS.COMPLETED:
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const handleStatusChange = (newStatus: TodoStatus) => {
    onStatusChange(todo._id, newStatus);
    setShowActions(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${getStatusColor(
        todo.status
      )} border-l-4 p-4 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`font-semibold text-gray-900 text-sm leading-tight ${
            todo.status === TODO_STATUS.COMPLETED
              ? "line-through text-gray-500"
              : ""
          }`}
        >
          {todo.title}
        </h3>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>

          {showActions && (
            <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-32">
              <button
                onClick={() => onEdit(todo)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>

              <div className="border-t border-gray-200 my-1"></div>

              <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Move to
              </div>

              {Object.entries(KANBAN_COLUMNS).map(
                ([status, column]) =>
                  status !== todo.status && (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status as TodoStatus)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {column.title}
                    </button>
                  )
              )}

              <div className="border-t border-gray-200 my-1"></div>

              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this task?")
                  ) {
                    onDelete(todo._id);
                  }
                  setShowActions(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {todo.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {todo.description}
        </p>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
        {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
          <span className="text-xs">Updated</span>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}
    </motion.div>
  );
};

export default KanbanCard;
