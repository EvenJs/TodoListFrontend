import { motion } from "framer-motion";
import { useState } from "react";
import { type ExistingTodo, type TodoStatus } from "../types/todo";
import KanbanColumn from "./KanbanColumn";
import TodoForm from "./TodoForm";
import { KANBAN_COLUMNS, TODO_STATUS } from "../constants/todo";

interface KanbanViewProps {
  todos: ExistingTodo[];
  onUpdate: (
    id: string,
    updates: Partial<{ title: string; description: string }>
  ) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onCreateTodo: (title: string, description: string) => void;
  loading?: boolean;
}

const KanbanView = ({
  todos,
  onUpdate,
  onDelete,
  onStatusChange,
  onCreateTodo,
  loading = false,
}: KanbanViewProps) => {
  const [editingTodo, setEditingTodo] = useState<ExistingTodo | null>(null);
  const [quickCreateStatus, setQuickCreateStatus] = useState<TodoStatus | null>(
    null
  );

  // Group todos by status
  const todosByStatus = {
    [TODO_STATUS.NOT_STARTED]: todos.filter(
      (todo) => todo.status === TODO_STATUS.NOT_STARTED
    ),
    [TODO_STATUS.IN_PROGRESS]: todos.filter(
      (todo) => todo.status === TODO_STATUS.IN_PROGRESS
    ),
    [TODO_STATUS.COMPLETED]: todos.filter(
      (todo) => todo.status === TODO_STATUS.COMPLETED
    ),
  };

  const handleEdit = (todo: ExistingTodo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (
    id: string,
    updates: Partial<{ title: string; description: string }>
  ) => {
    onUpdate(id, updates);
    setEditingTodo(null);
  };

  const handleQuickCreate = (status: TodoStatus) => {
    setQuickCreateStatus(status);
  };

  const handleCreateTodo = (title: string, description: string) => {
    onCreateTodo(title, description);
    setQuickCreateStatus(null);
  };

  const handleCancelCreate = () => {
    setQuickCreateStatus(null);
  };

  return (
    <div className="space-y-6">
      {/* Edit Modal */}
      {editingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue={editingTodo.title}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  defaultValue={editingTodo.description}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleUpdate(editingTodo._id, {
                      title: editingTodo.title,
                      description: editingTodo.description || "",
                    })
                  }
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Create Form */}
      {quickCreateStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Add Task to {KANBAN_COLUMNS[quickCreateStatus].title}
              </h3>
              <button
                onClick={handleCancelCreate}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <TodoForm
              onSubmit={handleCreateTodo}
              onCancel={handleCancelCreate}
            />
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-3 text-blue-600">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading Kanban board...</span>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <KanbanColumn
            status={TODO_STATUS.NOT_STARTED}
            todos={todosByStatus[TODO_STATUS.NOT_STARTED]}
            onEdit={handleEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onCreateTodo={handleQuickCreate}
          />

          <KanbanColumn
            status={TODO_STATUS.IN_PROGRESS}
            todos={todosByStatus[TODO_STATUS.IN_PROGRESS]}
            onEdit={handleEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onCreateTodo={handleQuickCreate}
          />

          <KanbanColumn
            status={TODO_STATUS.COMPLETED}
            todos={todosByStatus[TODO_STATUS.COMPLETED]}
            onEdit={handleEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </motion.div>
      )}
    </div>
  );
};

export default KanbanView;
