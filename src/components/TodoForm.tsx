import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
  loading?: boolean;
}

const TodoForm = ({ onSubmit, loading = false }: TodoFormProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit(formData.title, formData.description);
    setFormData({ title: "", description: "" });
    setIsExpanded(false);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setIsExpanded(false);
  };

  return (
    <div className="mb-8">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="w-full todo-card group hover:bg-white/80 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3 text-gray-500 group-hover:text-primary-600 transition-colors">
              <Plus className="w-6 h-6" />
              <span className="text-lg font-semibold">Add New Task</span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="todo-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Create New Task
              </h3>
              <button onClick={resetForm} className="btn-ghost p-2 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="What needs to be done?"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Add some details (optional)"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!formData.title.trim()}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoForm;
