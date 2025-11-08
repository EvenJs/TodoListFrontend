import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Check, Clock, Play, Save, X } from "lucide-react";
import { STATUS_CONFIG, TODO_STATUS } from "../constants/todo";
import {
  type ExistingTodo,
  type TodoStatus,
  type TodoFormData,
} from "../types/todo";

interface TodoItemProps {
  todo: ExistingTodo;
  onUpdate: (id: string, updates: Partial<TodoFormData>) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: TodoStatus) => void;
}

const TodoItem = ({
  todo,
  onUpdate,
  onDelete,
  onStatusUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || "",
  });

  const statusConfig = STATUS_CONFIG[todo.status];

  const handleSave = () => {
    onUpdate(todo._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || "",
    });
    setIsEditing(false);
  };

  const handleStatusUpdate = async () => {
    if (isUpdatingStatus) return; // Prevent multiple clicks

    const nextStatus = getNextStatus(todo.status);
    console.log("🔄 Updating status:", {
      current: todo.status,
      next: nextStatus,
      todoId: todo._id,
    });

    setIsUpdatingStatus(true);
    try {
      await onStatusUpdate(todo._id, nextStatus);
      console.log("✅ Status update successful");
    } catch (error) {
      console.error("❌ Status update failed:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case TODO_STATUS.NOT_STARTED:
        return <Clock className="w-3 h-3" />;
      case TODO_STATUS.IN_PROGRESS:
        return <Play className="w-3 h-3" />;
      case TODO_STATUS.COMPLETED:
        return <Check className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getNextStatus = (currentStatus: TodoStatus): TodoStatus => {
    switch (currentStatus) {
      case TODO_STATUS.NOT_STARTED:
        return TODO_STATUS.IN_PROGRESS;
      case TODO_STATUS.IN_PROGRESS:
        return TODO_STATUS.COMPLETED;
      case TODO_STATUS.COMPLETED:
        return TODO_STATUS.NOT_STARTED;
      default:
        return TODO_STATUS.NOT_STARTED;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`todo-card ${
        todo.status === TODO_STATUS.COMPLETED ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="input-field text-lg font-semibold"
                placeholder="Task title"
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="input-field resize-none"
                rows={2}
                placeholder="Description (optional)"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn btn-success text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-ghost text-sm flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3 mb-3">
                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdatingStatus}
                  className={`shrink-0 w-6 h-6 rounded-full border-2 mt-1 transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                    todo.status === TODO_STATUS.COMPLETED
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-blue-500"
                  } ${isUpdatingStatus ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isUpdatingStatus ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : todo.status === TODO_STATUS.COMPLETED ? (
                    <Check className="w-3 h-3" />
                  ) : null}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-semibold text-gray-900 wrap-break-word ${
                      todo.status === TODO_STATUS.COMPLETED
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {todo.title}
                  </h3>

                  {todo.description && (
                    <p className="text-gray-600 mt-2 wrap-break-word">
                      {todo.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`status-badge ${statusConfig.color}`}>
                  {getStatusIcon(todo.status)}
                  {statusConfig.label}
                </span>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span>
                    Created: {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                  {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
                    <span>
                      • Updated: {new Date(todo.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)}
              className="btn-ghost p-2 rounded-lg text-gray-500 hover:text-blue-600"
              title="Edit task"
            >
              <Edit3 className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  onDelete(todo._id);
                }
              }}
              className="btn-ghost p-2 rounded-lg text-gray-500 hover:text-red-600"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
